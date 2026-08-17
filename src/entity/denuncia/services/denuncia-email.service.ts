import { DENUNCIA_ASSUNTO_LABELS } from '@/entity/denuncia/constants/denuncia.constants';
import type { DenunciaInput } from '@/entity/denuncia/denuncia.entity';
import { sendMail } from '@/services/mailer.service';
import { escapeHtml } from '@/utils/html.utils';

const ANONIMO = 'Não informado (denúncia anônima)';

function buildHtml(dados: DenunciaInput) {
  const linhas: Array<[string, string]> = [
    ['Assunto', DENUNCIA_ASSUNTO_LABELS[dados.assunto]],
    ['Nome', dados.nome || ANONIMO],
    ['Contato para retorno', dados.contato || ANONIMO],
    ['Recebida em', new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })],
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
      <h2 style="color:#445492;margin:0 0 4px;">Nova denúncia pelo canal do site</h2>
      <p style="color:#5a6178;margin:0 0 20px;font-size:14px;">
        Registro recebido pelo Canal de Denúncias. Trate como <strong>confidencial</strong>:
        conforme o CEC-8.5, a identidade do informante deve ser preservada.
      </p>
      <table style="border-collapse:collapse;font-size:14px;">${tabela}</table>
      <h3 style="color:#1c2340;margin:24px 0 8px;font-size:15px;">Relato</h3>
      <p style="color:#1c2340;font-size:14px;line-height:1.6;white-space:pre-wrap;margin:0;">${escapeHtml(
        dados.relato,
      )}</p>
    </div>
  `;
}

/**
 * Envia a denúncia para a caixa de compliance.
 *
 * Caixa **própria** (`DENUNCIA_EMAIL_TO`), separada da comercial de propósito:
 * o CEC-8.5 define que quem recebe e apura é RH/Diretoria, e denúncia de
 * assédio ou fraude não pode transitar na caixa de lead.
 *
 * Nunca define `replyTo`: responder por reflexo a uma denúncia anônima é
 * justamente o vazamento que este canal existe para evitar. Se o denunciante
 * quiser retorno, o contato dele está no corpo do e-mail.
 *
 * Lança em caso de falha — quem chama decide o que mostrar ao usuário.
 */
export async function sendDenunciaEmail(dados: DenunciaInput) {
  const to = process.env.DENUNCIA_EMAIL_TO;

  if (!to) {
    throw new Error(
      'Configuração de e-mail ausente: defina DENUNCIA_EMAIL_TO.',
    );
  }

  // Sem `replyTo`: ver o bloco acima. Não é esquecimento.
  await sendMail({
    to,
    subject: `[Confidencial] Denúncia — ${DENUNCIA_ASSUNTO_LABELS[dados.assunto]}`,
    html: buildHtml(dados),
  });
}
