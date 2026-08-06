import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { ROUTES } from '@/constants/routes.constants';

export default function NotFound() {
  return (
    <Section>
      <div className="flex flex-col items-start gap-4 py-10">
        <p className="text-sm font-bold tracking-widest text-accent uppercase">
          Erro 404
        </p>
        <h1 className="text-3xl font-bold text-brand md:text-4xl">
          Página não encontrada
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-muted md:text-base">
          O endereço acessado não existe ou foi movido. Você pode voltar para a
          home ou ver nossa linha completa de produtos.
        </p>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={ROUTES.home}>Voltar para a home</ButtonLink>
          <ButtonLink href={ROUTES.produtos} variant="ghost">
            Ver produtos
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
