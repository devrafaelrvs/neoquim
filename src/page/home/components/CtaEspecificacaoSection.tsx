import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { ArrowRightIcon } from '@/components/ui/Icons';
import { ROUTES } from '@/constants/routes.constants';
import { HOME_CTA } from '@/page/home/constants/home.constants';

export function CtaEspecificacaoSection() {
  return (
    <section className="pb-14 md:pb-20">
      <Container>
        <div className="flex flex-col gap-4 rounded-xl bg-linear-to-r from-brand to-brand-light p-8 md:p-12">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            {HOME_CTA.titulo}
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
            {HOME_CTA.texto}
          </p>
          <ButtonLink
            href={ROUTES.contato}
            variant="accent"
            size="lg"
            className="mt-2 self-start"
          >
            {HOME_CTA.botao}
            <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
