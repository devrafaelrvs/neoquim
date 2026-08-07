'use client';

import { useActionState } from 'react';

import { Button } from '@/components/ui/Button';
import { Field, Input } from '@/components/ui/Field';
import { LockIcon } from '@/components/ui/Icons';
import { login } from '@/entity/admin/action/login';
import {
  ADMIN_LOGIN_INITIAL_STATE,
  type AdminLoginState,
} from '@/entity/admin/admin.entity';
import {
  ADMIN_LABELS,
  ADMIN_MESSAGES,
} from '@/entity/admin/constants/admin-messages.constants';

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState<AdminLoginState, FormData>(
    login,
    ADMIN_LOGIN_INITIAL_STATE,
  );

  return (
    <form
      action={formAction}
      className="flex flex-col gap-5 rounded-xl border border-line bg-card p-6 shadow-sm md:p-8"
    >
      <Field label={ADMIN_LABELS.usuario} htmlFor="usuario">
        <Input
          id="usuario"
          name="usuario"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          required
        />
      </Field>

      <Field label={ADMIN_LABELS.senha} htmlFor="senha">
        <Input
          id="senha"
          name="senha"
          type="password"
          autoComplete="current-password"
          required
        />
      </Field>

      {state.status === 'error' && state.message ? (
        <div role="alert" className="flex flex-col gap-0.5">
          <p className="text-sm text-red-600">{state.message}</p>
          {state.tentativasRestantes !== undefined ? (
            <p className="text-xs text-muted">
              {ADMIN_MESSAGES.tentativasRestantes(state.tentativasRestantes)}
            </p>
          ) : null}
        </div>
      ) : null}

      <Button type="submit" size="lg" disabled={pending}>
        <LockIcon className="h-4 w-4" />
        {pending ? ADMIN_LABELS.entrando : ADMIN_LABELS.entrar}
      </Button>
    </form>
  );
}
