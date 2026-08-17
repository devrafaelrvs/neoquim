import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { MailIcon, MapPinIcon, PhoneIcon } from '@/components/ui/Icons';
import {
  FOOTER_COMPLIANCE,
  FOOTER_NAV,
} from '@/constants/navigation.constants';
import {
  ADDRESS,
  COMPANY,
  CONTACT_CHANNELS,
} from '@/entity/company/constants/company.constants';
import { toMailtoHref, toTelHref } from '@/utils/url.utils';
import { Logo } from './Logo';

export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-r from-brand to-brand-light text-white">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Logo className="inline-flex self-start" />
            <p className="text-sm font-semibold">{COMPANY.razaoSocial}</p>
            <p className="text-sm text-white/70">{COMPANY.atividade}</p>
            <p className="text-xs text-white/60">
              © {ano} Todos os direitos reservados.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-xs font-bold tracking-widest text-white/80 uppercase">
              Localização
            </h2>
            <p className="flex gap-2 text-sm text-white/80">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{ADDRESS.completo}</span>
            </p>

            <nav className="mt-2 flex flex-col gap-2">
              {FOOTER_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-6">
            {CONTACT_CHANNELS.map((canal) => (
              <div key={canal.label} className="flex flex-col gap-2">
                <h2 className="text-xs font-bold tracking-widest text-white/80 uppercase">
                  {canal.label}
                </h2>

                {canal.email ? (
                  <a
                    href={toMailtoHref(canal.email)}
                    className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
                  >
                    <MailIcon className="h-4 w-4 shrink-0" />
                    {canal.email}
                  </a>
                ) : null}

                {canal.telefones.map((tel) => (
                  <a
                    key={tel}
                    href={toTelHref(tel)}
                    className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
                  >
                    <PhoneIcon className="h-4 w-4 shrink-0" />
                    {tel}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Compliance separado da navegação: precisa estar achável de qualquer página. */}
        <div className="border-t border-white/15 py-6">
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {FOOTER_COMPLIANCE.map((item) => (
              <a
                key={item.href}
                href={item.href}
                {...(item.externo
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="inline-flex min-h-11 items-center text-sm font-medium text-white/80 underline underline-offset-4 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
