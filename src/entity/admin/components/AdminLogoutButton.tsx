import { Button } from '@/components/ui/Button';
import { logout } from '@/entity/admin/action/logout';
import { ADMIN_LABELS } from '@/entity/admin/constants/admin-messages.constants';

/** Server Component: o `<form>` chama a Server Action direto, sem JS de cliente. */
export function AdminLogoutButton() {
  return (
    <form action={logout}>
      <Button type="submit" variant="ghost">
        {ADMIN_LABELS.sair}
      </Button>
    </form>
  );
}
