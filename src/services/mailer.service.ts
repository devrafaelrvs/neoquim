import nodemailer, { type Transporter } from 'nodemailer';

/**
 * Transporte SMTP — único ponto do projeto que conhece e-mail.
 *
 * Vive em `src/services/` porque é infraestrutura usada por **duas** entidades
 * (`contact` e `denuncia`), e a regra de dependência proíbe uma entidade
 * importar da outra. Não está em `utils/` de propósito: lá moram funções puras,
 * e isto lê variável de ambiente e mantém conexão.
 *
 * Nenhuma destas variáveis pode ganhar prefixo `NEXT_PUBLIC_` — a senha da
 * caixa vazaria para o bundle do navegador.
 */
interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
  from: string;
}

function lerConfig(): SmtpConfig {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;

  // Erro nomeia a variável que falta: adivinhar qual das três está vazia custa
  // mais tempo que qualquer outra parte disto.
  if (!host || !user || !password) {
    const faltando = [
      ['SMTP_HOST', host],
      ['SMTP_USER', user],
      ['SMTP_PASSWORD', password],
    ]
      .filter(([, valor]) => !valor)
      .map(([nome]) => nome);

    throw new Error(
      `Configuração de SMTP ausente: defina ${faltando.join(', ')}.`,
    );
  }

  const port = Number(process.env.SMTP_PORT ?? 465);

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error(`SMTP_PORT inválida: "${process.env.SMTP_PORT}".`);
  }

  return {
    host,
    port,
    // 465 fala TLS desde o handshake; 587 sobe com STARTTLS. Default segue a
    // porta para que definir só SMTP_PORT=587 já funcione.
    secure: process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === 'true'
      : port === 465,
    user,
    password,
    /**
     * Hospedagem compartilhada quase sempre recusa relay de remetente diferente
     * do autenticado, e o que passa cai em spam por SPF. Sem MAIL_FROM, usa a
     * própria caixa — que é o valor correto na esmagadora maioria dos casos.
     */
    from: process.env.MAIL_FROM || user,
  };
}

/**
 * Singleton de módulo: reaproveitado entre invocações quentes da serverless.
 * Abrir conexão SMTP a cada envio somaria o handshake inteiro em cada lead.
 */
let transporter: Transporter | null = null;
let remetente: string | null = null;

function getTransporter(): { transporter: Transporter; from: string } {
  if (transporter && remetente) {
    return { transporter, from: remetente };
  }

  const config = lerConfig();

  transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.password },
  });
  remetente = config.from;

  return { transporter, from: remetente };
}

export interface MailMessage {
  to: string;
  subject: string;
  html: string;
  /**
   * Opcional de propósito.
   *
   * O contato define (o comercial responde o lead na thread). O canal de
   * denúncias **não pode**: responder por reflexo a uma denúncia anônima é
   * exatamente o vazamento que o canal existe para evitar.
   */
  replyTo?: string;
}

/**
 * Envia o e-mail. Lança em caso de falha — quem chama registra no log e decide
 * o que mostrar ao usuário.
 */
export async function sendMail({ to, subject, html, replyTo }: MailMessage) {
  const { transporter: transporte, from } = getTransporter();

  await transporte.sendMail({
    from,
    to,
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  });
}

/**
 * Testa host, porta e credencial sem enviar mensagem.
 *
 * Serve para isolar "credencial errada" de "código errado" — o que mais custa
 * tempo quando o formulário simplesmente não entrega.
 */
export async function verifySmtp() {
  const { transporter: transporte } = getTransporter();
  await transporte.verify();
}
