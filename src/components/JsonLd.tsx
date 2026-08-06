import { SITE_URL } from '@/constants/seo.constants';
import {
  ADDRESS,
  CERTIFICATION,
  COMPANY,
  CONTACT_CHANNELS,
} from '@/entity/company/constants/company.constants';

/** Dados estruturados de Organization + LocalBusiness. */
export function JsonLd() {
  const telefones = CONTACT_CHANNELS.flatMap((c) => c.telefones).map(
    (t) => `+55${t.replace(/\D/g, '')}`,
  );

  const email = CONTACT_CHANNELS.find((c) => c.email)?.email;

  const dados = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}#organizacao`,
    name: COMPANY.razaoSocial,
    alternateName: COMPANY.nome,
    description: COMPANY.atividade,
    url: SITE_URL,
    logo: `${SITE_URL}/logo/logo-neoquim.png`,
    image: `${SITE_URL}/images/planta-aerea.jpg`,
    foundingDate: String(COMPANY.fundacao),
    telephone: telefones,
    email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${ADDRESS.logradouro}, ${ADDRESS.bairro}`,
      addressLocality: ADDRESS.cidade,
      addressRegion: ADDRESS.uf,
      postalCode: ADDRESS.cep,
      addressCountry: 'BR',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ],
      opens: '08:00',
      closes: '17:00',
    },
    hasCredential: `${CERTIFICATION.norma} — ${CERTIFICATION.organismo}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }}
    />
  );
}
