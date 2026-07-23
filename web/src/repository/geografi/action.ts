'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/guard';
import { getKvContent, postKvContent } from '@/lib/kv-content';
import type { Geografi } from './dto';
import { GEOGRAFI_DEFAULT } from './dto';

export async function getGeografi(): Promise<Geografi> {
  return getKvContent('geografi', GEOGRAFI_DEFAULT);
}

export async function simpanGeografiAction(input: Geografi) {
  await requireAdmin();
  await postKvContent('geografi', input);
  revalidatePath('/dashboard/geografi');
  revalidatePath('/profil-desa');
}
