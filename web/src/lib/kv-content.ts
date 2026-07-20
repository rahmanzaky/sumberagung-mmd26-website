// Helper untuk konten "satu record" yang disimpan sebagai sheet kunci-nilai
// (Beranda, Geografi, ProfilVisi, Pengaturan). Menyatukan pola get + overlay
// di atas default supaya tidak diulang di tiap modul.

import { ambilResource, kirimResource } from '@/lib/apps-script';

/**
 * Ambil satu record kunci-nilai. Nilai dari sheet ditimpa DI ATAS default,
 * jadi kunci yang belum pernah diisi tetap punya nilai wajar dan menambah
 * kunci baru di kode tidak membuat halaman kosong.
 */
export async function getKvContent<T extends object>(resource: string, def: T): Promise<T> {
  const data = await ambilResource<Partial<T>>(resource, {} as Partial<T>);
  return { ...def, ...data };
}

/** Simpan record kunci-nilai (upsert per kunci di backend). */
export async function postKvContent(resource: string, body: object): Promise<void> {
  await kirimResource(resource, body);
}
