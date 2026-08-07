import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

import type { AdminLockout } from '@/entity/admin/admin.entity';
import {
  ADMIN_ATTEMPTS_COOKIE,
  ADMIN_ATTEMPTS_WINDOW_SECONDS,
  ADMIN_LOCKOUT_SECONDS,
  ADMIN_MAX_ATTEMPTS,
  ADMIN_PATH,
  ADMIN_SECRET_MIN_LENGTH,
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
} from '@/entity/admin/constants/auth.constants';

function segredo(): string {
  const valor = process.env.ADMIN_SESSION_SECRET;

  if (!valor || valor.length < ADMIN_SECRET_MIN_LENGTH) {
    throw new Error(
      `ADMIN_SESSION_SECRET ausente ou com menos de ${ADMIN_SECRET_MIN_LENGTH} caracteres.`,
    );
  }

  return valor;
}

function assinar(payload: string): string {
  return createHmac('sha256', segredo()).update(payload).digest('base64url');
}

/** Confere se o payload saiu deste servidor. Nunca lança — cookie inválido é só `false`. */
function assinaturaConfere(payload: string, assinatura: string): boolean {
  let esperada: string;

  try {
    esperada = assinar(payload);
  } catch (erro) {
    console.error('[admin] não foi possível validar a assinatura:', erro);
    return false;
  }

  const recebida = Buffer.from(assinatura);
  const calculada = Buffer.from(esperada);

  if (recebida.length !== calculada.length) return false;

  return timingSafeEqual(recebida, calculada);
}

/**
 * Comparação de tempo constante. O `sha256` antes serve para normalizar o
 * tamanho — `timingSafeEqual` lança quando os buffers têm comprimentos
 * diferentes, e isso por si só já vazaria o tamanho da senha.
 */
function iguais(a: string, b: string): boolean {
  return timingSafeEqual(
    createHash('sha256').update(a).digest(),
    createHash('sha256').update(b).digest(),
  );
}

/** Confere as credenciais contra o `.env`. Não cria sessão. */
export function verifyCredentials(usuario: string, senha: string): boolean {
  const usuarioEsperado = process.env.ADMIN_USER;
  const senhaEsperada = process.env.ADMIN_PASSWORD;

  if (!usuarioEsperado || !senhaEsperada) {
    console.error(
      '[admin] ADMIN_USER ou ADMIN_PASSWORD não configurados — acesso negado.',
    );
    return false;
  }

  // Os dois são sempre comparados, para o tempo de resposta não revelar
  // qual dos campos errou.
  const usuarioOk = iguais(usuario, usuarioEsperado);
  const senhaOk = iguais(senha, senhaEsperada);

  return usuarioOk && senhaOk;
}

/**
 * Grava o cookie de sessão. O valor é só um prazo de validade assinado — não
 * há nada a guardar além de "esta pessoa passou pelo login".
 */
export async function startAdminSession(): Promise<void> {
  const expiraEm = String(Date.now() + ADMIN_SESSION_MAX_AGE_SECONDS * 1000);
  const jar = await cookies();

  jar.set(ADMIN_SESSION_COOKIE, `${expiraEm}.${assinar(expiraEm)}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    // Restrito à área restrita: nenhuma outra rota do site recebe este cookie.
    path: ADMIN_PATH,
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  });
}

export async function endAdminSession(): Promise<void> {
  const jar = await cookies();
  jar.delete({ name: ADMIN_SESSION_COOKIE, path: ADMIN_PATH });
}

/**
 * Verdadeiro só com cookie assinado por este servidor e dentro do prazo.
 *
 * Precisa ser chamado **dentro de cada Server Action** que muda alguma coisa,
 * não apenas na renderização da página: Server Action é endpoint público, e
 * esconder o formulário não protege a ação por trás dele.
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) return false;

  const [expiraEm, assinatura] = token.split('.');

  if (!expiraEm || !assinatura) return false;
  if (!assinaturaConfere(expiraEm, assinatura)) return false;

  return Number(expiraEm) > Date.now();
}

const SEM_TENTATIVAS: AdminLockout = {
  bloqueado: false,
  tentativas: 0,
  liberaEmMs: 0,
  tentativasRestantes: ADMIN_MAX_ATTEMPTS,
};

function montarLockout(tentativas: number, bloqueadoAte: number): AdminLockout {
  const restante = bloqueadoAte - Date.now();

  // Bloqueio vencido zera a contagem: quem esperou ganha as 5 tentativas de volta.
  if (bloqueadoAte > 0 && restante <= 0) return SEM_TENTATIVAS;

  return {
    bloqueado: restante > 0,
    tentativas,
    liberaEmMs: restante > 0 ? restante : 0,
    tentativasRestantes: Math.max(0, ADMIN_MAX_ATTEMPTS - tentativas),
  };
}

/**
 * Situação atual do contador de erros de login.
 *
 * Cookie ausente, adulterado ou malformado conta como zero tentativas — não há
 * como distinguir "apagou o cookie" de "primeiro acesso". Por isso o contador
 * atrasa quem insiste na senha, mas não substitui um limite por IP.
 */
export async function getLoginLockout(): Promise<AdminLockout> {
  const bruto = (await cookies()).get(ADMIN_ATTEMPTS_COOKIE)?.value;

  if (!bruto) return SEM_TENTATIVAS;

  const [tentativas, bloqueadoAte, assinatura] = bruto.split('.');

  if (!tentativas || !bloqueadoAte || !assinatura) return SEM_TENTATIVAS;
  if (!assinaturaConfere(`${tentativas}.${bloqueadoAte}`, assinatura)) {
    return SEM_TENTATIVAS;
  }

  const contagem = Number(tentativas);
  const ate = Number(bloqueadoAte);

  if (!Number.isInteger(contagem) || contagem < 0) return SEM_TENTATIVAS;
  if (!Number.isFinite(ate) || ate < 0) return SEM_TENTATIVAS;

  return montarLockout(contagem, ate);
}

/**
 * Soma uma tentativa errada e, ao chegar no limite, tranca a rota.
 *
 * Devolve o estado já atualizado para a action montar a resposta sem reler o
 * cookie que ela própria acabou de gravar.
 */
export async function registerFailedLogin(): Promise<AdminLockout> {
  const atual = await getLoginLockout();

  // Já bloqueado: a tentativa nem chega a ser contada.
  if (atual.bloqueado) return atual;

  const tentativas = atual.tentativas + 1;
  const bloqueadoAte =
    tentativas >= ADMIN_MAX_ATTEMPTS
      ? Date.now() + ADMIN_LOCKOUT_SECONDS * 1000
      : 0;

  const payload = `${tentativas}.${bloqueadoAte}`;
  const jar = await cookies();

  jar.set(ADMIN_ATTEMPTS_COOKIE, `${payload}.${assinar(payload)}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: ADMIN_PATH,
    maxAge: Math.max(ADMIN_ATTEMPTS_WINDOW_SECONDS, ADMIN_LOCKOUT_SECONDS),
  });

  return montarLockout(tentativas, bloqueadoAte);
}

/** Login correto limpa o histórico de erros. */
export async function clearLoginAttempts(): Promise<void> {
  const jar = await cookies();
  jar.delete({ name: ADMIN_ATTEMPTS_COOKIE, path: ADMIN_PATH });
}
