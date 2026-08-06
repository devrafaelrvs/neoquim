import { Section, SectionTitle } from '@/components/ui/Section';
import { Timeline } from '@/entity/company/components/Timeline';
import { SOBRE_PAGE } from '@/page/sobre/constants/sobre.constants';

export function TrajetoriaSection() {
  return (
    <Section className="bg-card">
      <div className="flex flex-col gap-8">
        <SectionTitle>{SOBRE_PAGE.trajetoria}</SectionTitle>
        <Timeline />
      </div>
    </Section>
  );
}
