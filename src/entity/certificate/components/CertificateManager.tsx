'use client';

import { Button } from '@/components/ui/Button';
import { Field, Input } from '@/components/ui/Field';
import { FileIcon, TrashIcon, UploadIcon } from '@/components/ui/Icons';
import { ROUTES } from '@/constants/routes.constants';
import type { Certificate } from '@/entity/certificate/certificate.entity';
import {
  CERTIFICATE_ACCEPT_ATTR,
  CERTIFICATE_MANAGER,
} from '@/entity/certificate/constants/certificate.constants';
import { useCertificateManager } from '@/entity/certificate/hooks/useCertificateManager';
import { formatBytes, formatDateTime } from '@/utils/format.utils';

/** Painel de troca do certificado. Renderizado só para sessão autenticada. */
export function CertificateManager({
  certificado,
}: {
  certificado: Certificate | null;
}) {
  const { upload, uploadAction, enviando, remocao, deleteAction, removendo } =
    useCertificateManager();

  const aviso = upload.status !== 'idle' ? upload : remocao;

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-line bg-card p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-xl font-bold text-brand">
          {CERTIFICATE_MANAGER.titulo}
        </h2>
        <p className="text-sm leading-relaxed text-muted">
          {CERTIFICATE_MANAGER.descricao}
        </p>
      </div>

      {certificado ? (
        <div className="flex flex-col gap-4 rounded-lg border border-line bg-bg p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <FileIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-ink">
                {CERTIFICATE_MANAGER.atualLabel}
              </span>
              <span className="text-xs text-muted">
                {formatBytes(certificado.tamanhoBytes)} ·{' '}
                {formatDateTime(certificado.enviadoEm)}
              </span>
              {/* Store privado: o arquivo só sai pela rota, nunca pela URL do blob. */}
              <a
                href={ROUTES.certificado}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-accent underline underline-offset-2"
              >
                {CERTIFICATE_MANAGER.verAtual}
              </a>
            </div>
          </div>

          <form action={deleteAction}>
            <Button
              type="submit"
              variant="ghost"
              disabled={removendo || enviando}
              className="text-red-600 hover:bg-red-50"
            >
              <TrashIcon className="h-4 w-4" />
              {removendo
                ? CERTIFICATE_MANAGER.removerLoading
                : CERTIFICATE_MANAGER.remover}
            </Button>
          </form>
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-line bg-bg p-4 text-sm text-muted">
          {CERTIFICATE_MANAGER.vazio}
        </p>
      )}

      {/* Remonta a cada troca de documento, o que limpa o input de arquivo. */}
      <form
        key={certificado?.enviadoEm ?? 'vazio'}
        action={uploadAction}
        className="flex flex-col gap-5 border-t border-line pt-6"
      >
        <Field
          label={CERTIFICATE_MANAGER.campoArquivo}
          htmlFor="arquivo"
          error={upload.error}
        >
          <Input
            id="arquivo"
            name="arquivo"
            type="file"
            accept={CERTIFICATE_ACCEPT_ATTR}
            className="py-2.5 file:mr-3 file:rounded-md file:border-0 file:bg-brand file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-brand-deep"
            {...(upload.error
              ? { 'aria-invalid': true, 'aria-describedby': 'arquivo-error' }
              : {})}
          />
        </Field>

        {aviso.message ? (
          <p
            role="status"
            className={
              aviso.status === 'success'
                ? 'text-sm font-medium text-ok'
                : 'text-sm text-red-600'
            }
          >
            {aviso.message}
          </p>
        ) : null}

        <Button
          type="submit"
          size="lg"
          disabled={enviando || removendo}
          className="self-start"
        >
          <UploadIcon className="h-4 w-4" />
          {enviando
            ? CERTIFICATE_MANAGER.submitLoading
            : CERTIFICATE_MANAGER.submit}
        </Button>
      </form>
    </div>
  );
}
