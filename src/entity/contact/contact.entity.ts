import { z } from 'zod';

import { PRODUCT_SLUGS } from '@/entity/product/product.entity';

export const contactSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, 'Informe seu nome.')
    .max(120, 'Nome muito longo.'),

  empresa: z
    .string()
    .trim()
    .min(2, 'Informe o nome da empresa.')
    .max(120, 'Nome da empresa muito longo.'),

  email: z.email('Informe um e-mail válido.').max(160),

  telefone: z
    .string()
    .trim()
    .min(1, 'Informe um telefone.')
    .refine(
      (v) => {
        const digits = v.replace(/\D/g, '');
        return digits.length === 10 || digits.length === 11;
      },
      { message: 'Telefone deve ter DDD + número (10 ou 11 dígitos).' },
    ),

  produtoInteresse: z.enum(PRODUCT_SLUGS, {
    error: 'Selecione um produto de interesse.',
  }),

  mensagem: z
    .string()
    .trim()
    .min(10, 'Descreva sua necessidade em pelo menos 10 caracteres.')
    .max(3000, 'Mensagem muito longa.'),

  /** Honeypot: invisível ao usuário, preenchido só por bot. */
  website: z.string().max(0).optional().or(z.literal('')),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactFieldErrors = Partial<
  Record<keyof ContactInput, string>
>;

export interface ContactFormState {
  status: 'idle' | 'success' | 'error';
  message?: string;
  errors?: ContactFieldErrors;
  /** Valores digitados, devolvidos para não perder o preenchimento no erro. */
  values?: Partial<Record<keyof ContactInput, string>>;
}

export const CONTACT_INITIAL_STATE: ContactFormState = { status: 'idle' };
