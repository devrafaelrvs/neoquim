'use server';

import { revalidatePath } from 'next/cache';

import { loginSchema, type AdminLoginState } from '@/entity/admin/admin.entity';
import { ADMIN_MESSAGES } from '@/entity/admin/constants/admin-messages.constants';
import { ADMIN_PATH } from '@/entity/admin/constants/auth.constants';
import {
  clearLoginAttempts,
  getLoginLockout,
  registerFailedLogin,
  startAdminSession,
  verifyCredentials,
} from '@/entity/admin/services/auth.service';

/** Erro de login: conta a tentativa e devolve sempre a mesma mensagem. */
async function recusar(): Promise<AdminLoginState> {
  const lockout = await registerFailedLogin();

  // Estourou o limite: a página passa a renderizar o aviso de bloqueio no
  // lugar do formulário, então não há mensagem de campo a devolver.
  if (lockout.bloqueado) {
    revalidatePath(ADMIN_PATH);
    return { status: 'error' };
  }

  return {
    status: 'error',
    message: ADMIN_MESSAGES.credenciaisInvalidas,
    tentativasRestantes: lockout.tentativasRestantes,
  };
}

export async function login(
  _prevState: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  // Bloqueio vale mesmo com a senha certa — senão o limite não limitaria nada.
  if ((await getLoginLockout()).bloqueado) {
    revalidatePath(ADMIN_PATH);
    return { status: 'error' };
  }

  const parsed = loginSchema.safeParse({
    usuario: String(formData.get('usuario') ?? ''),
    senha: String(formData.get('senha') ?? ''),
  });

  // Campo vazio e credencial errada dão a mesma resposta — não há o que
  // diferenciar para quem está do lado de fora.
  if (!parsed.success) return recusar();

  try {
    if (!verifyCredentials(parsed.data.usuario, parsed.data.senha)) {
      return recusar();
    }

    await clearLoginAttempts();
    await startAdminSession();
  } catch (erro) {
    console.error('[admin] falha no login:', erro);
    return { status: 'error', message: ADMIN_MESSAGES.erroGenerico };
  }

  revalidatePath(ADMIN_PATH);

  return { status: 'idle' };
}
