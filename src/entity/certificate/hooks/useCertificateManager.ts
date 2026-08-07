'use client';

import { useActionState } from 'react';

import { deleteCertificate } from '@/entity/certificate/action/deleteCertificate';
import { uploadCertificate } from '@/entity/certificate/action/uploadCertificate';
import {
  CERTIFICATE_INITIAL_STATE,
  type CertificateFormState,
} from '@/entity/certificate/certificate.entity';

export function useCertificateManager() {
  const [upload, uploadAction, enviando] = useActionState<
    CertificateFormState,
    FormData
  >(uploadCertificate, CERTIFICATE_INITIAL_STATE);

  const [remocao, deleteAction, removendo] = useActionState<
    CertificateFormState,
    FormData
  >(deleteCertificate, CERTIFICATE_INITIAL_STATE);

  return { upload, uploadAction, enviando, remocao, deleteAction, removendo };
}
