import {
  CERTIFICATE_CACHE_MAX_AGE_SECONDS,
  CERTIFICATE_DOWNLOAD_FILENAME,
  CERTIFICATE_MESSAGES,
} from '@/entity/certificate/constants/certificate.constants';
import { getCertificateContent } from '@/entity/certificate/services/certificate.service';

/** O arquivo pode ser trocado a qualquer momento na área restrita. */
export const dynamic = 'force-dynamic';

function indisponivel() {
  return new Response(CERTIFICATE_MESSAGES.indisponivel, {
    status: 404,
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}

/**
 * Download do certificado ISO, no domínio da Neoquim.
 *
 * O store do Blob é privado, então esta rota é a única saída do arquivo: ela
 * autentica, repassa os bytes em streaming (sem carregar o PDF na memória da
 * função) e nomeia o download — o visitante nunca vê a URL interna do store.
 */
export async function GET() {
  let certificado;

  try {
    certificado = await getCertificateContent();
  } catch (erro) {
    console.error('[certificado] falha ao ler o arquivo:', erro);
    return indisponivel();
  }

  if (!certificado) return indisponivel();

  return new Response(certificado.stream, {
    headers: {
      'content-type': certificado.contentType,
      'content-length': String(certificado.tamanhoBytes),
      'content-disposition': `attachment; filename="${CERTIFICATE_DOWNLOAD_FILENAME}"`,
      'cache-control': `public, max-age=${CERTIFICATE_CACHE_MAX_AGE_SECONDS}`,
    },
  });
}
