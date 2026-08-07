/**
 * Caminho da área restrita.
 *
 * Fica aqui, e **não** em `constants/routes.constants.ts`, porque `ROUTES` é
 * importado por componentes de cliente (`NavLinks`) e acabaria no bundle
 * público. A proteção real é o login — mas não há motivo para anunciar a rota.
 *
 * Pelo mesmo motivo a rota não entra no `robots.txt`: aquele arquivo é público
 * e listar o caminho lá o divulgaria. O bloqueio de indexação vem do
 * `robots: { index: false }` no metadata da página.
 */
export const ADMIN_PATH = '/admin-fileconfig-neoquim';

export const ADMIN_SESSION_COOKIE = 'neoquim_admin_session';

export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 2;

/** Tamanho mínimo do `ADMIN_SESSION_SECRET` para a assinatura valer alguma coisa. */
export const ADMIN_SECRET_MIN_LENGTH = 32;

/**
 * Cookie do contador de tentativas de login.
 *
 * Assinado com o mesmo segredo da sessão: ninguém consegue **forjar** uma
 * contagem baixa. Mas o cookie vive no navegador de quem tenta entrar, então
 * apagá-lo zera o contador — isto trava tentativa manual e script ingênuo, não
 * um ataque distribuído. Bloqueio de verdade exige limite por IP com infra
 * (ver §12 do CLAUDE.md).
 */
export const ADMIN_ATTEMPTS_COOKIE = 'neoquim_admin_attempts';

/** Erros seguidos até a rota travar. */
export const ADMIN_MAX_ATTEMPTS = 5;

/** Quanto tempo a rota fica bloqueada depois de estourar o limite. */
export const ADMIN_LOCKOUT_SECONDS = 15 * 60;

/**
 * Janela do contador. Sem novo erro dentro dela, o cookie expira sozinho e a
 * contagem volta a zero — quem só digitou errado uma vez não fica marcado.
 */
export const ADMIN_ATTEMPTS_WINDOW_SECONDS = 30 * 60;
