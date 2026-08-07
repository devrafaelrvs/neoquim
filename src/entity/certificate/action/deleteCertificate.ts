'use server';

import { revalidatePath } from 'next/cache';

import { ROUTES } from '@/constants/routes.constants';
import { ADMIN_PATH } from '@/entity/admin/constants/auth.constants';
import { isAdminAuthenticated } from '@/entity/admin/services/auth.service';
import type { CertificateFormState } from '@/entity/certificate/certificate.entity';
import { CERTIFICATE_MESSAGES } from '@/entity/certificate/constants/certificate.constants';
import { removeCertificate } from '@/entity/certificate/services/certificate.service';

export async function deleteCertificate(
  _prevState: CertificateFormState,
): Promise<CertificateFormState> {
  if (!(await isAdminAuthenticated())) {
    return { status: 'error', message: CERTIFICATE_MESSAGES.naoAutorizado };
  }

  try {
    await removeCertificate();
  } catch (erro) {
    console.error('[certificado] falha ao remover:', erro);
    return { status: 'error', message: CERTIFICATE_MESSAGES.erroGenerico };
  }

  revalidatePath(ROUTES.home);
  revalidatePath(ADMIN_PATH);

  return { status: 'success', message: CERTIFICATE_MESSAGES.removido };
}
