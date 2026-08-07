import { z } from 'zod';

import {
  CERTIFICATE_ACCEPTED_TYPES,
  CERTIFICATE_MAX_BYTES,
  CERTIFICATE_MESSAGES,
} from '@/entity/certificate/constants/certificate.constants';

/**
 * Metadados do certificado publicado hoje no Vercel Blob.
 *
 * Sem URL de propósito: o store é privado, então a URL do blob não abre no
 * navegador. O arquivo só sai pela rota `ROUTES.certificado`, que autentica no
 * Blob e devolve os bytes.
 */
export interface Certificate {
  tamanhoBytes: number;
  /** ISO 8601 — data do último envio. */
  enviadoEm: string;
}

/** Bytes do certificado, prontos para virar resposta HTTP. */
export interface CertificateContent {
  stream: ReadableStream<Uint8Array>;
  contentType: string;
  tamanhoBytes: number;
}

/**
 * Validação do upload. Roda no servidor, dentro da Server Action — o `accept`
 * do input existe só para conveniência de quem escolhe o arquivo.
 */
export const certificateFileSchema = z
  .custom<File>(
    (valor) => valor instanceof File && valor.size > 0,
    CERTIFICATE_MESSAGES.arquivoObrigatorio,
  )
  .refine(
    (arquivo) => arquivo.size <= CERTIFICATE_MAX_BYTES,
    CERTIFICATE_MESSAGES.arquivoGrande,
  )
  .refine(
    (arquivo) => CERTIFICATE_ACCEPTED_TYPES.includes(arquivo.type),
    CERTIFICATE_MESSAGES.arquivoTipo,
  );

export interface CertificateFormState {
  status: 'idle' | 'success' | 'error';
  message?: string;
  /** Erro ligado ao input de arquivo por `aria-describedby`. */
  error?: string;
}

export const CERTIFICATE_INITIAL_STATE: CertificateFormState = {
  status: 'idle',
};
