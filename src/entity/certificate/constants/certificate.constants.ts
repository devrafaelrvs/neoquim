/**
 * Pasta do certificado dentro do Vercel Blob.
 *
 * Existe **um** arquivo por vez: cada envio sobrescreve o anterior no mesmo
 * caminho, então a URL pública nunca muda.
 */
export const CERTIFICATE_BLOB_PATHNAME = 'certificado/certificado-iso-9001.pdf';

/** Prefixo usado para localizar o arquivo atual sem depender do host do store. */
export const CERTIFICATE_BLOB_PREFIX = 'certificado/';

/**
 * O arquivo sobe pela Server Action, e o corpo da requisição na Vercel para em
 * 4,5 MB. Mantenha este teto abaixo disso e alinhado ao `bodySizeLimit` do
 * `next.config.ts`.
 */
export const CERTIFICATE_MAX_BYTES = 4 * 1024 * 1024;

export const CERTIFICATE_ACCEPTED_TYPES: readonly string[] = ['application/pdf'];

export const CERTIFICATE_ACCEPT_ATTR = 'application/pdf,.pdf';

/**
 * Como o arquivo é sobrescrito no mesmo caminho, o CDN poderia servir a versão
 * antiga por até um mês (padrão do Blob). Um minuto de cache mantém o download
 * rápido sem segurar um documento vencido — é também o mínimo aceito pela API.
 */
export const CERTIFICATE_CACHE_MAX_AGE_SECONDS = 60;

/** Nome com que o arquivo chega na pasta de downloads do visitante. */
export const CERTIFICATE_DOWNLOAD_FILENAME = 'certificado-iso-9001-neoquim.pdf';

export const CERTIFICATE_DOWNLOAD = {
  label: 'Baixar certificado',
  ariaLabel: 'Baixar o certificado ISO 9001:2015 da Neoquim em PDF',
} as const;

export const CERTIFICATE_MESSAGES = {
  arquivoObrigatorio: 'Selecione o arquivo do certificado.',
  arquivoTipo: 'O certificado precisa estar em PDF.',
  arquivoGrande: 'O arquivo passa de 4 MB. Reduza o PDF e tente de novo.',
  naoAutorizado: 'Sessão expirada. Entre novamente para continuar.',
  naoConfigurado:
    'O armazenamento de arquivos não está configurado neste ambiente.',
  erroValidacao: 'Confira o arquivo selecionado.',
  erroGenerico: 'Não foi possível concluir a operação. Tente novamente.',
  enviado: 'Certificado publicado. Já aparece no site.',
  removido: 'Certificado removido. O botão de download saiu do site.',
  indisponivel: 'Nenhum certificado publicado no momento.',
} as const;

export const CERTIFICATE_MANAGER = {
  titulo: 'Certificado ISO 9001:2015',
  descricao:
    'O arquivo enviado aqui alimenta o botão de download na faixa de certificação da home. Cada envio substitui o documento anterior.',
  vazio: 'Nenhum certificado publicado ainda.',
  atualLabel: 'Documento publicado',
  campoArquivo: 'Arquivo do certificado (PDF, até 4 MB)',
  submit: 'Publicar certificado',
  submitLoading: 'Enviando…',
  remover: 'Remover',
  removerLoading: 'Removendo…',
  verAtual: 'Ver documento atual',
} as const;
