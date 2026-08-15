import { z } from 'zod';

/** Assuntos oferecidos no select, alinhados ao CEC-8.5. */
export const DENUNCIA_ASSUNTOS = [
  'assedio-moral',
  'assedio-sexual',
  'discriminacao',
  'fraude-ou-corrupcao',
  'conflito-de-interesses',
  'sigilo-de-informacoes',
  'meio-ambiente-e-seguranca',
  'outro',
] as const;

export type DenunciaAssunto = (typeof DENUNCIA_ASSUNTOS)[number];

/**
 * Schema da denúncia.
 *
 * Só `assunto` e `relato` são obrigatórios: o canal é **anônimo por padrão**.
 * Nome e contato existem porque o próprio texto do canal diz que quem quiser
 * acompanhar a apuração pode deixar um retorno — mas exigir qualquer um dos
 * dois quebraria o anonimato, então ambos são opcionais.
 *
 * Campo opcional aceita string vazia: o formulário sempre envia a chave, mesmo
 * em branco, e `''` precisa passar na validação em vez de virar erro.
 */
export const denunciaSchema = z.object({
  assunto: z.enum(DENUNCIA_ASSUNTOS, {
    error: 'Selecione o assunto da denúncia.',
  }),

  relato: z
    .string()
    .trim()
    .min(30, 'Descreva o ocorrido em pelo menos 30 caracteres.')
    .max(5000, 'Relato muito longo.'),

  nome: z.string().trim().max(120, 'Nome muito longo.').optional(),

  contato: z
    .string()
    .trim()
    .max(160, 'Contato muito longo.')
    .optional(),

  /** Honeypot: invisível ao usuário, preenchido só por bot. */
  website: z.string().max(0).optional().or(z.literal('')),
});

export type DenunciaInput = z.infer<typeof denunciaSchema>;

export type DenunciaFieldErrors = Partial<Record<keyof DenunciaInput, string>>;

export interface DenunciaFormState {
  status: 'idle' | 'success' | 'error';
  message?: string;
  errors?: DenunciaFieldErrors;
  /**
   * Valores digitados, devolvidos para não perder o preenchimento no erro.
   *
   * `relato` fica de fora de propósito: no sucesso o estado é descartado, e em
   * erro devolver o relato inteiro para o cliente é dado sensível trafegando à
   * toa. O formulário mantém o que o usuário digitou pelo próprio DOM.
   */
  values?: Pick<Partial<Record<keyof DenunciaInput, string>>, 'assunto' | 'nome' | 'contato'>;
}

export const DENUNCIA_INITIAL_STATE: DenunciaFormState = { status: 'idle' };
