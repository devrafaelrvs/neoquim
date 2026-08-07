import { ButtonAnchor } from '@/components/ui/Button';
import { DownloadIcon } from '@/components/ui/Icons';
import { ROUTES } from '@/constants/routes.constants';
import { CERTIFICATE_DOWNLOAD } from '@/entity/certificate/constants/certificate.constants';
import { getCertificate } from '@/entity/certificate/services/certificate.service';
import { cn } from '@/utils/cn';

/**
 * Botão de download do certificado. Não renderiza nada enquanto não houver
 * documento publicado na área restrita.
 */
export async function CertificateDownloadButton({
  className,
}: {
  className?: string;
}) {
  const certificado = await getCertificate();

  if (!certificado) return null;

  return (
    <ButtonAnchor
      href={ROUTES.certificado}
      variant="accent"
      aria-label={CERTIFICATE_DOWNLOAD.ariaLabel}
      className={cn('shrink-0', className)}
    >
      <DownloadIcon className="h-4 w-4" />
      {CERTIFICATE_DOWNLOAD.label}
    </ButtonAnchor>
  );
}
