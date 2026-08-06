import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { ContactForm } from '@/entity/contact/components/ContactForm';
import { ContactInfo } from '@/entity/contact/components/ContactInfo';
import { ContactMap } from '@/entity/contact/components/ContactMap';
import { CONTATO_PAGE } from '@/page/contato/constants/contato.constants';

export function ContatoPage() {
  return (
    <>
      <PageHero
        titulo={CONTATO_PAGE.heroTitulo}
        subtitulo={CONTATO_PAGE.heroSubtitulo}
      />

      {/* pb extra no mobile: o FAB do WhatsApp não pode cobrir o botão de envio. */}
      <Section containerClassName="pb-24 md:pb-0">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col gap-8">
            <ContactInfo />
            <ContactMap />
          </div>

          <ContactForm />
        </div>
      </Section>
    </>
  );
}
