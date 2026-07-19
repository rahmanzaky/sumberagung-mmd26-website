'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin, requireSuperAdmin } from '@/lib/guard';
import type { Pengguna, PenggunaInput } from './dto';

// Data contoh dipakai selama APPS_SCRIPT_PENGGUNA_URL belum diisi.
const dummyPengguna: Pengguna[] = [
  {
    username: 'sutrisno',
    namaLengkap: 'Sutrisno, S.Sos',
    jabatan: 'Kepala Desa',
    noWa: '0812-3456-7890',
    email: 'sutrisno@sumberagung.desa.id',
    role: 'Super Admin',
  },
  {
    username: 'endang',
    namaLengkap: 'Endang Sulistyowati',
    jabatan: 'Sekretaris Desa',
    noWa: '0856-7890-1234',
    email: 'endang@sumberagung.desa.id',
    role: 'Super Admin',
  },
  {
    username: 'fauzi',
    namaLengkap: 'Muhammad Fauzi',
    jabatan: 'Kaur Keuangan',
    noWa: '0821-4321-0987',
    email: 'fauzi@sumberagung.desa.id',
    role: 'Admin',
  },
  {
    username: 'dwi',
    namaLengkap: 'Dwi Ratnasari',
    jabatan: 'Kaur Umum',
    noWa: '0813-5555-6677',
    email: 'dwi@sumberagung.desa.id',
    role: 'Admin',
  },
  {
    username: 'slamet',
    namaLengkap: 'Slamet Riyadi',
    jabatan: 'Kasi Pemerintahan',
    noWa: '0857-1122-3344',
    email: 'slamet@sumberagung.desa.id',
    role: 'Admin',
  },
  {
    username: 'hartono',
    namaLengkap: 'Hartono',
    jabatan: 'Kasi Kesejahteraan',
    noWa: '0812-9988-7766',
    email: 'hartono@sumberagung.desa.id',
    role: 'Admin',
  },
  {
    username: 'yuliana',
    namaLengkap: 'Yuliana Dewi',
    jabatan: 'Kasi Pelayanan',
    noWa: '0895-3344-5566',
    email: 'yuliana@sumberagung.desa.id',
    role: 'Admin',
  },
  {
    username: 'bagus',
    namaLengkap: 'Bagus Setiawan',
    jabatan: 'Kadus Krajan',
    noWa: '0813-2211-9900',
    email: 'bagus@sumberagung.desa.id',
    role: 'Admin',
  },
];

async function fetchAppsScript<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Apps Script request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export async function getPengguna(): Promise<Pengguna[]> {
  const url = process.env.APPS_SCRIPT_PENGGUNA_URL;
  if (!url) return dummyPengguna;

  const json = await fetchAppsScript<{ data: Pengguna[] }>(url);
  return json.data;
}

/** Cari perangkat desa berdasarkan email sesi Google. null jika tidak terdaftar. */
export async function getPenggunaByEmail(email: string): Promise<Pengguna | null> {
  const semua = await getPengguna();
  const cocok = semua.find((p) => p.email.toLowerCase() === email.toLowerCase());
  return cocok ?? null;
}

async function postPengguna(body: unknown) {
  const url = process.env.APPS_SCRIPT_PENGGUNA_URL;
  if (!url) {
    console.warn('[dev] postPengguna called without APPS_SCRIPT_PENGGUNA_URL — skipping', body);
    return;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`Pengguna request failed: ${res.status}`);
  const json = (await res.json()) as { success: boolean; error?: string };
  if (!json.success) throw new Error(json.error ?? 'Apps Script returned success: false');
}

// Kelola pengguna hanya untuk Super Admin (SRS 2.2 & SK-F-16).
export async function simpanPenggunaAction(input: PenggunaInput) {
  await requireSuperAdmin();
  await postPengguna({ aksi: 'simpan', ...input });
  revalidatePath('/dashboard/pengguna');
}

export async function hapusPenggunaAction(username: string) {
  await requireSuperAdmin();
  await postPengguna({ aksi: 'hapus', username });
  revalidatePath('/dashboard/pengguna');
}

/** Dipakai halaman lain yang cuma butuh daftar nama untuk dropdown. */
export async function getDaftarPerangkat(): Promise<Pengguna[]> {
  await requireAdmin();
  return getPengguna();
}
