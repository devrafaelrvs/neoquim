'use server';

import { revalidatePath } from 'next/cache';

import { ROUTES } from '@/constants/routes.constants';
import { ADMIN_PATH } from '@/entity/admin/constants/auth.constants';
import { isAdminAuthenticated } from '@/entity/admin/services/auth.service';
import {
  certificateFileSchema,
  type CertificateFormState,
} from '@/entity/certificate/certificate.entity';
import { CERTIFICATE_MESSAGES } from '@/entity/certificate/constants/certificate.constants';
import { putCertificate } from '@/entity/certificate/services/certificate.service';

/**
 * Publica o certificado que aparece no botão de download da home.
 *
 * A checagem de sessão aqui não é redundante com a da página: Server Action é
 * um endpoint HTTP público, alcançável sem passar pela tela do formulário.
 */
export async function uploadCertificate(
  _prevState: CertificateFormState,
  formData: FormData,
): Promise<CertificateFormState> {
  if (!(await isAdminAuthenticated())) {
    return { status: 'error', message: CERTIFICATE_MESSAGES.naoAutorizado };
  }

  const parsed = certificateFileSchema.safeParse(formData.get('arquivo'));

  if (!parsed.success) {
    return {
      status: 'error',
      message: CERTIFICATE_MESSAGES.erroValidacao,
      error: parsed.error.issues[0]?.message,
    };
  }

  try {
    await putCertificate(parsed.data);
  } catch (erro) {
    // Detalhe técnico fica no log do servidor, nunca na tela.
    console.error('[certificado] falha ao publicar:', erro);
    return { status: 'error', message: CERTIFICATE_MESSAGES.erroGenerico };
  }

  // A home é estática: sem isto o botão de download só apareceria no próximo build.
  revalidatePath(ROUTES.home);
  revalidatePath(ADMIN_PATH);

  return { status: 'success', message: CERTIFICATE_MESSAGES.enviado };
}
