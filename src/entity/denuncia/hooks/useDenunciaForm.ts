'use client';

import { useActionState } from 'react';

import { sendDenuncia } from '@/entity/denuncia/action/sendDenuncia';
import {
  DENUNCIA_INITIAL_STATE,
  type DenunciaFormState,
} from '@/entity/denuncia/denuncia.entity';

export function useDenunciaForm() {
  const [state, formAction, pending] = useActionState<
    DenunciaFormState,
    FormData
  >(sendDenuncia, DENUNCIA_INITIAL_STATE);

  return { state, formAction, pending };
}
