/**
 * Escapa texto para interpolar com segurança em HTML.
 *
 * Usado no corpo dos e-mails: nada que veio de formulário entra no HTML cru.
 * Sem isso, um relato com `<script>` ou `<img onerror>` viaja intacto até o
 * cliente de e-mail de quem for ler.
 */
export function escapeHtml(valor: string): string {
  return valor
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
