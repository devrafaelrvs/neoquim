'use server';

import {
  contactSchema,
  type ContactFieldErrors,
  type ContactFormState,
  type ContactInput,
} from '@/entity/contact/contact.entity';
import { CONTACT_FORM } from '@/entity/contact/constants/contact.constants';
import { sendContactEmail } from '@/entity/contact/services/email.service';

const CAMPOS = [
  'nome',
  'empresa',
  'email',
  'telefone',
  'produtoInteresse',
  'mensagem',
] as const;

function lerValores(formData: FormData) {
  return Object.fromEntries(
    CAMPOS.map((campo) => [campo, String(formData.get(campo) ?? '')]),
  ) as Record<(typeof CAMPOS)[number], string>;
}

/**
 * Server Action do formulário de contato.
 *
 * Esta é a validação que vale — a do cliente existe só para UX.
 */
export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values = lerValores(formData);

  // Honeypot: bot preencheu o campo invisível. Responde como sucesso e não envia.
  if (String(formData.get('website') ?? '').length > 0) {
    return { status: 'success', message: CONTACT_FORM.sucesso };
  }

  const parsed = contactSchema.safeParse({ ...values, website: '' });

  if (!parsed.success) {
    const errors: ContactFieldErrors = {};

    for (const issue of parsed.error.issues) {
      const campo = issue.path[0] as keyof ContactInput | undefined;
      if (campo && !errors[campo]) errors[campo] = issue.message;
    }

    return {
      status: 'error',
      message: CONTACT_FORM.erroValidacao,
      errors,
      values,
    };
  }

  try {
    await sendContactEmail(parsed.data);
  } catch (erro) {
    // Detalhe técnico fica no log do servidor, nunca na tela do usuário.
    console.error('[contato] falha ao enviar e-mail:', erro);

    return {
      status: 'error',
      message: CONTACT_FORM.erroGenerico,
      values,
    };
  }

  return { status: 'success', message: CONTACT_FORM.sucesso };
}
