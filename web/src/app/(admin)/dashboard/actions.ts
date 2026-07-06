'use server';

import { revalidatePath } from 'next/cache';
import { updateStatusSurat } from '@/lib/apps-script';
import type { StatusSurat } from '@/types/pengajuan-surat';

export async function updateStatusAction(id: string, status: StatusSurat) {
  await updateStatusSurat(id, status);
  revalidatePath('/dashboard/pengajuan-surat');
  revalidatePath('/dashboard');
}
