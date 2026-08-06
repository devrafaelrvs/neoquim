import { Resend } from 'resend';

import type { ContactInput } from '@/entity/contact/contact.entity';
import { getProductBySlug } from '@/entity/product/services/product.service';

/** Escapa o que veio do formulário antes de ir para o HTML do e-mail. */
function escapeHtml(valor: string) {
  return valor
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildHtml(dados: ContactInput) {
  const produto =
    getProductBySlug(dados.produtoInteresse)?.titulo ?? dados.produtoInteresse;

  const linhas: Array<[string, string]> = [
    ['Nome', dados.nome],
    ['Empresa', dados.empresa],
    ['E-mail', dados.email],
    ['Telefone', dados.telefone],
    ['Produto de interesse', produto],
  ];

  const tabela = linhas
    .map(
      ([rotulo, valor]) =>
        `<tr>
           <td style="padding:6px 12px 6px 0;color:#5a6178;white-space:nowrap;">${rotulo}</td>
           <td style="padding:6px 0;color:#1c2340;font-weight:600;">${escapeHtml(valor)}</td>
         </tr>`,
    )
    .join('');

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;">
      <h2 style="color:#445492;margin:0 0 4px;">Novo contato pelo site</h2>
      <p style="color:#5a6178;margin:0 0 20px;font-size:14px;">
        Mensagem enviada pelo formulário de contato do site da Neoquim.
      </p>
      <table style="border-collapse:collapse;font-size:14px;">${tabela}</table>
      <h3 style="color:#1c2340;margin:24px 0 8px;font-size:15px;">Mensagem</h3>
      <p style="color:#1c2340;font-size:14px;line-height:1.6;white-space:pre-wrap;margin:0;">${escapeHtml(
        dados.mensagem,
      )}</p>
    </div>
  `;
}

/**
 * Dispara o e-mail do lead para a caixa comercial.
 * Lança em caso de falha — quem chama decide o que mostrar ao usuário.
 */
export async function sendContactEmail(dados: ContactInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM;

  if (!apiKey || !to || !from) {
    throw new Error(
      'Configuração de e-mail ausente: defina RESEND_API_KEY, CONTACT_EMAIL_TO e CONTACT_EMAIL_FROM.',
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: dados.email,
    subject: `Contato pelo site — ${dados.empresa}`,
    html: buildHtml(dados),
  });

  if (error) {
    throw new Error(`Resend: ${error.message}`);
  }
}
