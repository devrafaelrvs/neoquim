import { Container } from '@/components/ui/Container';
import { AdminLockedNotice } from '@/entity/admin/components/AdminLockedNotice';
import { AdminLoginForm } from '@/entity/admin/components/AdminLoginForm';
import { AdminLogoutButton } from '@/entity/admin/components/AdminLogoutButton';
import {
  getLoginLockout,
  isAdminAuthenticated,
} from '@/entity/admin/services/auth.service';
import { CertificateManager } from '@/entity/certificate/components/CertificateManager';
import { getCertificate } from '@/entity/certificate/services/certificate.service';
import { ADMIN_PAGE } from '@/page/admin/constants/admin.constants';

export async function AdminPage() {
  const autenticado = await isAdminAuthenticated();
  const certificado = autenticado ? await getCertificate() : null;

  // Só interessa a quem ainda não entrou — sessão válida ignora o contador.
  const lockout = autenticado ? null : await getLoginLockout();

  return (
    // pb extra no mobile: o FAB do WhatsApp não pode cobrir os botões.
    <div className="bg-bg py-10 pb-28 md:py-16">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col gap-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <h1 className="text-2xl font-bold text-brand md:text-3xl">
                {ADMIN_PAGE.titulo}
              </h1>
              <p className="text-sm text-muted">
                {autenticado
                  ? ADMIN_PAGE.subtituloLogado
                  : ADMIN_PAGE.subtituloDeslogado}
              </p>
            </div>

            {autenticado ? <AdminLogoutButton /> : null}
          </div>

          {autenticado ? <CertificateManager certificado={certificado} /> : null}

          {lockout?.bloqueado ? <AdminLockedNotice lockout={lockout} /> : null}

          {!autenticado && !lockout?.bloqueado ? <AdminLoginForm /> : null}
        </div>
      </Container>
    </div>
  );
}
