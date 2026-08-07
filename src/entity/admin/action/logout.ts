'use server';

import { revalidatePath } from 'next/cache';

import { ADMIN_PATH } from '@/entity/admin/constants/auth.constants';
import { endAdminSession } from '@/entity/admin/services/auth.service';

export async function logout(): Promise<void> {
  await endAdminSession();
  revalidatePath(ADMIN_PATH);
}
