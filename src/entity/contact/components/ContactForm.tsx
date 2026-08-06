'use client';

import { Button } from '@/components/ui/Button';
import { Field, Input, Select, Textarea } from '@/components/ui/Field';
import { SendIcon } from '@/components/ui/Icons';
import {
  CONTACT_FORM,
  CONTACT_LABELS,
} from '@/entity/contact/constants/contact.constants';
import { useContactForm } from '@/entity/contact/hooks/useContactForm';
import { getAllProducts } from '@/entity/product/services/product.service';

export function ContactForm() {
  const { state, formAction, pending } = useContactForm();
  const produtos = getAllProducts();
  const { errors, values } = state;

  const invalido = (campo: keyof NonNullable<typeof errors>) =>
    errors?.[campo]
      ? { 'aria-invalid': true, 'aria-describedby': `${campo}-error` }
      : {};

  if (state.status === 'success') {
    return (
      <div className="flex flex-col items-start gap-3 rounded-xl border border-line bg-card p-6 shadow-sm md:p-8">
        <h2 className="text-xl font-bold text-brand">{CONTACT_FORM.titulo}</h2>
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
      <h2 className="text-xl font-bold text-brand">{CONTACT_FORM.titulo}</h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={CONTACT_LABELS.nome} htmlFor="nome" error={errors?.nome}>
          <Input
            id="nome"
            name="nome"
            autoComplete="name"
            defaultValue={values?.nome}
            {...invalido('nome')}
          />
        </Field>

        <Field
          label={CONTACT_LABELS.empresa}
          htmlFor="empresa"
          error={errors?.empresa}
        >
          <Input
            id="empresa"
            name="empresa"
            autoComplete="organization"
            defaultValue={values?.empresa}
            {...invalido('empresa')}
          />
        </Field>

        <Field
          label={CONTACT_LABELS.email}
          htmlFor="email"
          error={errors?.email}
        >
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={values?.email}
            {...invalido('email')}
          />
        </Field>

        <Field
          label={CONTACT_LABELS.telefone}
          htmlFor="telefone"
          error={errors?.telefone}
        >
          <Input
            id="telefone"
            name="telefone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(11) 90000-0000"
            defaultValue={values?.telefone}
            {...invalido('telefone')}
          />
        </Field>
      </div>

      <Field
        label={CONTACT_LABELS.produtoInteresse}
        htmlFor="produtoInteresse"
        error={errors?.produtoInteresse}
      >
        <Select
          id="produtoInteresse"
          name="produtoInteresse"
          defaultValue={values?.produtoInteresse ?? ''}
          {...invalido('produtoInteresse')}
        >
          <option value="">{CONTACT_FORM.selectPlaceholder}</option>
          {produtos.map((produto) => (
            <option key={produto.slug} value={produto.slug}>
              {produto.titulo}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        label={CONTACT_LABELS.mensagem}
        htmlFor="mensagem"
        error={errors?.mensagem}
      >
        <Textarea
          id="mensagem"
          name="mensagem"
          rows={6}
          defaultValue={values?.mensagem}
          {...invalido('mensagem')}
        />
      </Field>

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
        {pending ? CONTACT_FORM.submitLoading : CONTACT_FORM.submit}
      </Button>
    </form>
  );
}
