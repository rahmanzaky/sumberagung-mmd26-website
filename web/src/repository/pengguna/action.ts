'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin, requireSuperAdmin } from '@/lib/guard';
import { ambilResource, kirimResource } from '@/lib/apps-script';
import type { Pengguna, PenggunaInput } from './dto';

// Data contoh dipakai selama backend belum dikonfigurasi.
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

export async function getPengguna(): Promise<Pengguna[]> {
  return ambilResource<Pengguna[]>('pengguna', dummyPengguna);
}

/** Cari perangkat desa berdasarkan email sesi Google. null jika tidak terdaftar. */
export async function getPenggunaByEmail(email: string): Promise<Pengguna | null> {
  const semua = await getPengguna();
  const cocok = semua.find((p) => p.email.toLowerCase() === email.toLowerCase());
  return cocok ?? null;
}

async function postPengguna(body: object) {
  await kirimResource('pengguna', body);
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
