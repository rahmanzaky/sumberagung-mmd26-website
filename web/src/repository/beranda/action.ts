'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/guard';
import { getKvContent, postKvContent } from '@/lib/kv-content';
import type { Beranda } from './dto';
import { BERANDA_DEFAULT } from './dto';

export async function getBeranda(): Promise<Beranda> {
  return getKvContent(process.env.APPS_SCRIPT_BERANDA_URL, BERANDA_DEFAULT);
}

export async function simpanBerandaAction(input: Beranda) {
  await requireAdmin();
  await postKvContent(process.env.APPS_SCRIPT_BERANDA_URL, input);
  revalidatePath('/dashboard/beranda');
  revalidatePath('/'); // halaman Home publik ikut berubah
}
