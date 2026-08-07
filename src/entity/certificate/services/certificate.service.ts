import { del, get, list, put } from '@vercel/blob';

import type {
  Certificate,
  CertificateContent,
} from '@/entity/certificate/certificate.entity';
import {
  CERTIFICATE_BLOB_PATHNAME,
  CERTIFICATE_BLOB_PREFIX,
  CERTIFICATE_CACHE_MAX_AGE_SECONDS,
  CERTIFICATE_MESSAGES,
} from '@/entity/certificate/constants/certificate.constants';

/**
 * O store é **privado**: ler exige o token, então nenhum blob deste projeto é
 * alcançável direto pelo navegador. O arquivo chega ao visitante pela rota
 * `ROUTES.certificado`, que é quem autentica aqui.
 *
 * O token é injetado pela Vercel quando o store está conectado ao projeto. Sem
 * ele o site continua de pé — apenas sem certificado publicado.
 */
const ACESSO = 'private' as const;

function assertBlobConfigurado() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(CERTIFICATE_MESSAGES.naoConfigurado);
  }
}

/**
 * Metadados do certificado publicado hoje, ou `null` se não houver nenhum.
 *
 * Nunca lança: é chamado durante o build da home, e uma falha de rede aqui não
 * pode derrubar o site inteiro — no pior caso o botão de download some.
 */
export async function getCertificate(): Promise<Certificate | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;

  try {
    const { blobs } = await list({ prefix: CERTIFICATE_BLOB_PREFIX, limit: 1 });
    const atual = blobs[0];

    if (!atual) return null;

    return {
      tamanhoBytes: atual.size,
      enviadoEm: atual.uploadedAt.toISOString(),
    };
  } catch (erro) {
    console.error('[certificado] falha ao consultar o Blob:', erro);
    return null;
  }
}

/**
 * Abre o arquivo para streaming. Quem chama monta a resposta HTTP — o serviço
 * não conhece cabeçalho nem `Content-Disposition`.
 */
export async function getCertificateContent(): Promise<CertificateContent | null> {
  assertBlobConfigurado();

  const resultado = await get(CERTIFICATE_BLOB_PATHNAME, { access: ACESSO });

  // 304 não vem sem `ifNoneMatch`, mas o tipo é uma união — o guard restringe.
  if (!resultado || resultado.statusCode !== 200) return null;

  return {
    stream: resultado.stream,
    contentType: resultado.blob.contentType,
    tamanhoBytes: resultado.blob.size,
  };
}

/**
 * Publica o certificado, substituindo o anterior.
 *
 * Grava sempre no mesmo caminho com `allowOverwrite`, então só existe um
 * arquivo — nunca sobra versão antiga ocupando espaço no store.
 */
export async function putCertificate(arquivo: File): Promise<void> {
  assertBlobConfigurado();

  await put(CERTIFICATE_BLOB_PATHNAME, arquivo, {
    access: ACESSO,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/pdf',
    cacheControlMaxAge: CERTIFICATE_CACHE_MAX_AGE_SECONDS,
  });
}

/** Tira o certificado do ar. O botão de download some do site em seguida. */
export async function removeCertificate(): Promise<void> {
  assertBlobConfigurado();

  const { blobs } = await list({ prefix: CERTIFICATE_BLOB_PREFIX });

  if (blobs.length === 0) return;

  await del(blobs.map((blob) => blob.url));
}
