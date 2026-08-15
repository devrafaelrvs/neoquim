'use server';

import { DENUNCIA_FORM } from '@/entity/denuncia/constants/denuncia.constants';
import {
  denunciaSchema,
  type DenunciaFieldErrors,
  type DenunciaFormState,
  type DenunciaInput,
} from '@/entity/denuncia/denuncia.entity';
import { sendDenunciaEmail } from '@/entity/denuncia/services/denuncia-email.service';

/**
 * Server Action do canal de denúncias.
 *
 * Esta é a validação que vale — a do cliente existe só para UX.
 */
export async function sendDenuncia(
  _prevState: DenunciaFormState,
  formData: FormData,
): Promise<DenunciaFormState> {
  const assunto = String(formData.get('assunto') ?? '');
  const nome = String(formData.get('nome') ?? '');
  const contato = String(formData.get('contato') ?? '');

  // Devolvido no erro para o usuário não redigitar. O relato fica de fora.
  const values = { assunto, nome, contato };

  // Honeypot: bot preencheu o campo invisível. Responde como sucesso e não envia.
  if (String(formData.get('website') ?? '').length > 0) {
    return { status: 'success', message: DENUNCIA_FORM.sucesso };
  }

  const parsed = denunciaSchema.safeParse({
    assunto,
    relato: String(formData.get('relato') ?? ''),
    nome,
    contato,
    website: '',
  });

  if (!parsed.success) {
    const errors: DenunciaFieldErrors = {};

    for (const issue of parsed.error.issues) {
      const campo = issue.path[0] as keyof DenunciaInput | undefined;
      if (campo && !errors[campo]) errors[campo] = issue.message;
    }

    return {
      status: 'error',
      message: DENUNCIA_FORM.erroValidacao,
      errors,
      values,
    };
  }

  try {
    await sendDenunciaEmail(parsed.data);
  } catch (erro) {
    // Só a falha técnica vai para o log — nunca o conteúdo da denúncia.
    console.error('[denuncia] falha ao enviar e-mail:', erro);

    return {
      status: 'error',
      message: DENUNCIA_FORM.erroGenerico,
      values,
    };
  }

  return { status: 'success', message: DENUNCIA_FORM.sucesso };
}
