'use client';

import { useActionState } from 'react';

import { sendContactMessage } from '@/entity/contact/action/sendContactMessage';
import {
  CONTACT_INITIAL_STATE,
  type ContactFormState,
} from '@/entity/contact/contact.entity';

export function useContactForm() {
  const [state, formAction, pending] = useActionState<ContactFormState, FormData>(
    sendContactMessage,
    CONTACT_INITIAL_STATE,
  );

  return { state, formAction, pending };
}
