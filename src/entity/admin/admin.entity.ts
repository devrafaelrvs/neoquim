import { z } from 'zod';

import { ADMIN_MESSAGES } from '@/entity/admin/constants/admin-messages.constants';

export const loginSchema = z.object({
  usuario: z.string().trim().min(1, ADMIN_MESSAGES.usuarioObrigatorio),
  senha: z.string().min(1, ADMIN_MESSAGES.senhaObrigatoria),
});

export type LoginInput = z.infer<typeof loginSchema>;

export interface AdminLoginState {
  status: 'idle' | 'error';
  /**
   * Sempre genérica: dizer "usuário não existe" ou "senha errada" entrega meio
   * caminho a quem está tentando adivinhar.
   */
  message?: string;
  /** Aviso de quantas tentativas sobram. Não vaza nada: é a contagem de quem digitou. */
  tentativasRestantes?: number;
}

/** Estado do contador de erros de login, lido do cookie assinado. */
export interface AdminLockout {
  bloqueado: boolean;
  tentativas: number;
  /** Milissegundos até a rota liberar. Zero quando não há bloqueio. */
  liberaEmMs: number;
  tentativasRestantes: number;
}

export const ADMIN_LOGIN_INITIAL_STATE: AdminLoginState = { status: 'idle' };
