import { Container } from '@/components/ui/Container';
import { ShieldIcon } from '@/components/ui/Icons';
import { CertificateDownloadButton } from '@/entity/certificate/components/CertificateDownloadButton';
import { CERTIFICATION } from '@/entity/company/constants/company.constants';

/** Faixa branca com o texto da ISO, logo abaixo do hero da home. */
export function CertificationBanner() {
  return (
    <div className="border-b border-line bg-card">
      <Container>
        <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="flex items-start gap-3">
            <ShieldIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
            <p className="text-sm leading-relaxed text-muted">
              A Neoquim Indústrias Químicas Ltda possui seu Sistema de Gestão da
              Qualidade certificado conforme requisitos da norma{' '}
              <strong className="font-semibold text-ink">
                {CERTIFICATION.norma}
              </strong>
              , pelo organismo {CERTIFICATION.organismo}.
            </p>
          </div>

          {/* Não renderiza nada enquanto não houver certificado publicado. */}
          <CertificateDownloadButton className="w-full sm:w-auto" />
        </div>
      </Container>
    </div>
  );
}
