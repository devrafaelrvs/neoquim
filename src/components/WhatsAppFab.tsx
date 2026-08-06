import { WhatsAppIcon } from '@/components/ui/Icons';
import { WHATSAPP } from '@/entity/company/constants/company.constants';
import { toWhatsAppUrl } from '@/utils/url.utils';

/**
 * Botão flutuante de WhatsApp, presente em todas as rotas.
 *
 * Fica acima do conteúdo mas ABAIXO do menu mobile aberto (z-40 vs z-50).
 * A página /contato precisa de padding inferior extra para o botão de submit
 * do formulário não ficar atrás dele no mobile.
 */
export function WhatsAppFab() {
  if (!WHATSAPP.numero) return null;

  return (
    <a
      href={toWhatsAppUrl(WHATSAPP.numero, WHATSAPP.mensagem)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Neoquim no WhatsApp"
      className="fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform duration-200 hover:scale-105 md:right-8 md:bottom-8"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
