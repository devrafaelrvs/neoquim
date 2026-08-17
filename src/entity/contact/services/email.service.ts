import type { ContactInput } from '@/entity/contact/contact.entity';
import { getProductBySlug } from '@/entity/product/services/product.service';
import { sendMail } from '@/services/mailer.service';
import { escapeHtml } from '@/utils/html.utils';

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
 *
 * Caixa própria (`CONTACT_EMAIL_TO`), separada da de compliance — ver
 * `denuncia-email.service.ts`.
 *
 * Lança em caso de falha — quem chama decide o que mostrar ao usuário.
 */
export async function sendContactEmail(dados: ContactInput) {
  const to = process.env.CONTACT_EMAIL_TO;

  if (!to) {
    throw new Error('Configuração de e-mail ausente: defina CONTACT_EMAIL_TO.');
  }

  await sendMail({
    to,
    subject: `Contato pelo site — ${dados.empresa}`,
    html: buildHtml(dados),
    // O comercial responde o lead direto na thread.
    replyTo: dados.email,
  });
}
