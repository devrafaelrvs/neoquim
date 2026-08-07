/**
 * Textos do login. Separados de `auth.constants.ts` de propósito: este arquivo
 * é importado pelo formulário (componente de cliente) e vai para o bundle
 * público — o caminho da rota e o nome do cookie não podem vir junto.
 */
export const ADMIN_MESSAGES = {
  usuarioObrigatorio: 'Informe o usuário.',
  senhaObrigatoria: 'Informe a senha.',
  credenciaisInvalidas: 'Usuário ou senha inválidos.',
  erroGenerico: 'Não foi possível entrar. Tente novamente.',
  tentativasRestantes: (restantes: number) =>
    restantes === 1
      ? 'Resta 1 tentativa antes do bloqueio.'
      : `Restam ${restantes} tentativas antes do bloqueio.`,
} as const;

export const ADMIN_LOCKOUT = {
  titulo: 'Acesso bloqueado',
  descricao: (tentativas: number) =>
    `Foram ${tentativas} tentativas de acesso sem sucesso.`,
  liberaEm: (tempo: string) => `Tente novamente em ${tempo}.`,
  ajuda:
    'Se você é da administração da Neoquim e perdeu a senha, procure o responsável pelo site.',
} as const;

export const ADMIN_LABELS = {
  usuario: 'Usuário',
  senha: 'Senha',
  entrar: 'Entrar',
  entrando: 'Entrando…',
  sair: 'Sair',
} as const;
