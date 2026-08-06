import { ExternalLinkIcon } from '@/components/ui/Icons';
import { ADDRESS, MAPS_URL } from '@/entity/company/constants/company.constants';

/**
 * Mapa embutido. Usa o modo `?output=embed` do Google Maps, que não exige
 * API key. Se um dia precisar de marcador customizado, troque pela
 * Maps Embed API e mova a chave para variável de ambiente.
 */
export function ContactMap() {
  const query = encodeURIComponent(
    `${ADDRESS.logradouro}, ${ADDRESS.cidade}, ${ADDRESS.uf}, ${ADDRESS.cep}`,
  );

  return (
    <div className="flex flex-col gap-2">
      <a
        href={MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-accent hover:underline"
      >
        Abrir no Maps
        <ExternalLinkIcon className="h-3.5 w-3.5" />
      </a>

      <div className="overflow-hidden rounded-xl border border-line">
        <iframe
          title={`Localização da Neoquim — ${ADDRESS.completo}`}
          src={`https://www.google.com/maps?q=${query}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-64 w-full border-0 md:h-80"
        />
      </div>
    </div>
  );
}
