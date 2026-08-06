/** Monta o link do WhatsApp já com a mensagem codificada. */
export function toWhatsAppUrl(numero: string, mensagem?: string) {
  const digits = numero.replace(/\D/g, '');
  const base = `https://wa.me/${digits}`;

  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}

/** `(11) 5090-5411` -> `tel:+551150905411` */
export function toTelHref(telefone: string) {
  const digits = telefone.replace(/\D/g, '');

  return `tel:+55${digits}`;
}

export function toMailtoHref(email: string) {
  return `mailto:${email}`;
}
