/** `2621440` → `2,5 MB` */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;

  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;

  return `${(kb / 1024).toFixed(1).replace('.', ',')} MB`;
}

/** `840000` → `14 minutos`. Arredonda para cima: nunca promete antes da hora. */
export function formatMinutos(ms: number): string {
  const minutos = Math.max(1, Math.ceil(ms / 60_000));
  return minutos === 1 ? '1 minuto' : `${minutos} minutos`;
}

/**
 * `2026-08-07T14:30:00Z` → `07/08/2026 às 11:30`
 *
 * O fuso é fixo em São Paulo de propósito: o servidor roda em UTC e o
 * navegador no fuso de quem acessa — sem fixar, o texto renderizado no
 * servidor não bateria com o do cliente na hidratação.
 */
export function formatDateTime(iso: string): string {
  const data = new Date(iso);

  const formatado = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(data);

  return formatado.replace(', ', ' às ');
}
