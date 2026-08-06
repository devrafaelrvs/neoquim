import {
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from '@/components/ui/Icons';
import {
  ADDRESS,
  COMPANY,
  CONTACT_CHANNELS,
} from '@/entity/company/constants/company.constants';
import { toMailtoHref, toTelHref } from '@/utils/url.utils';

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-8">
      {CONTACT_CHANNELS.map((canal) => (
        <div key={canal.label} className="flex flex-col gap-3">
          <h2 className="text-xs font-bold tracking-widest text-brand uppercase">
            {canal.label}
          </h2>

          {canal.email ? (
            <a
              href={toMailtoHref(canal.email)}
              className="flex min-h-11 items-center gap-3 text-sm text-ink transition-colors hover:text-brand"
            >
              <MailIcon className="h-4 w-4 shrink-0 text-muted" />
              {canal.email}
            </a>
          ) : null}

          {canal.telefones.map((tel) => (
            <a
              key={tel}
              href={toTelHref(tel)}
              className="flex min-h-11 items-center gap-3 text-sm text-ink transition-colors hover:text-brand"
            >
              <PhoneIcon className="h-4 w-4 shrink-0 text-muted" />
              {tel}
            </a>
          ))}
        </div>
      ))}

      <div className="flex flex-col gap-3">
        <p className="flex gap-3 text-sm text-ink">
          <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
          <span>{ADDRESS.completo}</span>
        </p>
        <p className="flex items-center gap-3 text-sm text-ink">
          <ClockIcon className="h-4 w-4 shrink-0 text-muted" />
          {COMPANY.horario}
        </p>
      </div>
    </div>
  );
}
