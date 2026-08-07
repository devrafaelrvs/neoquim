import Image from 'next/image';
import Link from 'next/link';

import { ROUTES } from '@/constants/routes.constants';
import { COMPANY } from '@/entity/company/constants/company.constants';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href={ROUTES.home}
      aria-label={`${COMPANY.nome} — página inicial`}
      className={className}
    >
      <div className="flex items-center gap-2">

      <Image
        src="/logo/logo-neoquim.png"
        alt={COMPANY.razaoSocial}
        width={100}
        height={100}
        priority
        className="h-15  w-auto md:h-15"
        />
        </div>
    </Link>
  );
}
