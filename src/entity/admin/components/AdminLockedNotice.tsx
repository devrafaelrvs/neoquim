import { LockIcon } from '@/components/ui/Icons';
import type { AdminLockout } from '@/entity/admin/admin.entity';
import { ADMIN_LOCKOUT } from '@/entity/admin/constants/admin-messages.constants';
import { formatMinutos } from '@/utils/format.utils';

/** Substitui o formulário depois de estourado o limite de tentativas. */
export function AdminLockedNotice({ lockout }: { lockout: AdminLockout }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-red-200 bg-card p-6 shadow-sm md:p-8"
    >
      <LockIcon className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

      <div className="flex flex-col gap-1.5">
        <h2 className="text-lg font-bold text-red-600">
          {ADMIN_LOCKOUT.titulo}
        </h2>
        <p className="text-sm text-ink">
          {ADMIN_LOCKOUT.descricao(lockout.tentativas)}{' '}
          {ADMIN_LOCKOUT.liberaEm(formatMinutos(lockout.liberaEmMs))}
        </p>
        <p className="text-sm text-muted">{ADMIN_LOCKOUT.ajuda}</p>
      </div>
    </div>
  );
}
