'use client';

import { Button } from '@/components/ui/Button';
import { Field, Input, Select, Textarea } from '@/components/ui/Field';
import { SendIcon } from '@/components/ui/Icons';
import {
  DENUNCIA_ASSUNTO_LABELS,
  DENUNCIA_FORM,
  DENUNCIA_LABELS,
} from '@/entity/denuncia/constants/denuncia.constants';
import { DENUNCIA_ASSUNTOS } from '@/entity/denuncia/denuncia.entity';
import { useDenunciaForm } from '@/entity/denuncia/hooks/useDenunciaForm';

export function DenunciaForm() {
  const { state, formAction, pending } = useDenunciaForm();
  const { errors, values } = state;

  const invalido = (campo: keyof NonNullable<typeof errors>) =>
    errors?.[campo]
      ? { 'aria-invalid': true, 'aria-describedby': `${campo}-error` }
      : {};

  if (state.status === 'success') {
    return (
      <div className="flex flex-col items-start gap-3 rounded-xl border border-line bg-card p-6 shadow-sm md:p-8">
        <h2 className="text-xl font-bold text-brand">{DENUNCIA_FORM.titulo}</h2>
        <p className="font-medium text-ok">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      className="flex flex-col gap-5 rounded-xl border border-line bg-card p-6 shadow-sm md:p-8"
    >
      <h2 className="text-xl font-bold text-brand">{DENUNCIA_FORM.titulo}</h2>

      <Field
        label={DENUNCIA_LABELS.assunto}
        htmlFor="assunto"
        error={errors?.assunto}
      >
        <Select
          id="assunto"
          name="assunto"
          defaultValue={values?.assunto ?? ''}
          {...invalido('assunto')}
        >
          <option value="">{DENUNCIA_FORM.selectPlaceholder}</option>
          {DENUNCIA_ASSUNTOS.map((assunto) => (
            <option key={assunto} value={assunto}>
              {DENUNCIA_ASSUNTO_LABELS[assunto]}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        label={DENUNCIA_LABELS.relato}
        htmlFor="relato"
        error={errors?.relato}
      >
        <p id="relato-ajuda" className="text-xs leading-relaxed text-muted">
          {DENUNCIA_FORM.relatoAjuda}
        </p>
        <Textarea
          id="relato"
          name="relato"
          rows={8}
          aria-describedby={
            errors?.relato ? 'relato-error relato-ajuda' : 'relato-ajuda'
          }
          aria-invalid={errors?.relato ? true : undefined}
        />
      </Field>

      <div className="flex flex-col gap-4 rounded-lg border border-line bg-bg p-4">
        <p className="text-xs leading-relaxed text-muted">
          {DENUNCIA_FORM.anonimatoAviso}
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={DENUNCIA_LABELS.nome} htmlFor="nome" error={errors?.nome}>
            <Input
              id="nome"
              name="nome"
              autoComplete="off"
              defaultValue={values?.nome}
              {...invalido('nome')}
            />
          </Field>

          <Field
            label={DENUNCIA_LABELS.contato}
            htmlFor="contato"
            error={errors?.contato}
          >
            <Input
              id="contato"
              name="contato"
              autoComplete="off"
              defaultValue={values?.contato}
              {...invalido('contato')}
            />
          </Field>
        </div>
      </div>

      {/* Honeypot — invisível para o usuário, atrativo para bot. */}
      <div aria-hidden className="hidden">
        <label htmlFor="website">Não preencha este campo</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === 'error' && state.message ? (
        <p role="alert" className="text-sm text-red-600">
          {state.message}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={pending} className="self-start">
        <SendIcon className="h-4 w-4" />
        {pending ? DENUNCIA_FORM.submitLoading : DENUNCIA_FORM.submit}
      </Button>
    </form>
  );
}
