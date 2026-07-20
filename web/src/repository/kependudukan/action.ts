'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/guard';
import { ambilResource, kirimResource } from '@/lib/apps-script';
import { tukarUrutan, urutanBerikutnya } from '@/lib/ordered';
import type {
  KependudukanTahun,
  DistribusiUsia,
  DistribusiUsiaInput,
  TingkatPendidikan,
  TingkatPendidikanInput,
} from './dto';

// Data contoh dipakai selama backend belum dikonfigurasi.
// Angka di bawah ini ILUSTRATIF — ganti dengan data resmi desa sebelum publikasi.
const dummyKependudukan: KependudukanTahun[] = [
  {
    tahun: 2026,
    totalPenduduk: 4364,
    lakiLaki: 2154,
    perempuan: 2210,
    jumlahKK: 1300,
    jumlahRt: 28,
    jumlahRw: 7,
  },
  {
    tahun: 2025,
    totalPenduduk: 4318,
    lakiLaki: 2131,
    perempuan: 2187,
    jumlahKK: 1284,
    jumlahRt: 28,
    jumlahRw: 7,
  },
  {
    tahun: 2024,
    totalPenduduk: 4270,
    lakiLaki: 2108,
    perempuan: 2162,
    jumlahKK: 1265,
    jumlahRt: 27,
    jumlahRw: 7,
  },
];

/** Semua tahun, terbaru dulu. */
export async function getKependudukan(): Promise<KependudukanTahun[]> {
  const data = await ambilResource<KependudukanTahun[]>('kependudukan', dummyKependudukan);
  return [...data].sort((a, b) => b.tahun - a.tahun);
}

/** Statistik tahun terbaru — dipakai card angka di halaman Home publik (SK-F-02). */
export async function getKependudukanTerbaru(): Promise<KependudukanTahun | null> {
  const semua = await getKependudukan();
  return semua[0] ?? null;
}

export async function simpanKependudukanAction(input: KependudukanTahun) {
  await requireAdmin();
  // Upsert per tahun (backend memakai kolom kunci 'tahun').
  await kirimResource('kependudukan', input);
  revalidatePath('/dashboard/kependudukan');
  revalidatePath('/'); // card angka di halaman Home ikut diperbarui
}

// ==========================================================================
// Distribusi Usia & Gender + Tingkat Pendidikan (halaman Demografi)
// Disimpan sebagai daftar berurut, terpisah dari statistik per tahun.
// ==========================================================================

const dummyDistribusiUsia: DistribusiUsia[] = [
  {
    id: 'du-001',
    rentang: '0 - 5 Tahun',
    wilayah: 'Sumberagung',
    lakiLaki: 10,
    perempuan: 17,
    urutan: 1,
  },
  {
    id: 'du-002',
    rentang: '6 - 12 Tahun',
    wilayah: 'Sumberagung',
    lakiLaki: 11,
    perempuan: 21,
    urutan: 2,
  },
  {
    id: 'du-003',
    rentang: '13 - 17 Tahun',
    wilayah: 'Sumberagung',
    lakiLaki: 12,
    perempuan: 15,
    urutan: 3,
  },
  {
    id: 'du-004',
    rentang: '18 - 25 Tahun',
    wilayah: 'Sumberagung',
    lakiLaki: 22,
    perempuan: 19,
    urutan: 4,
  },
  {
    id: 'du-005',
    rentang: '26 - 45 Tahun',
    wilayah: 'Sumberagung',
    lakiLaki: 45,
    perempuan: 42,
    urutan: 5,
  },
  {
    id: 'du-006',
    rentang: '46+ Tahun',
    wilayah: 'Sumberagung',
    lakiLaki: 38,
    perempuan: 35,
    urutan: 6,
  },
];

const dummyPendidikan: TingkatPendidikan[] = [
  { id: 'tp-001', jenjang: 'SD / Sederajat', persentase: 45, urutan: 1 },
  { id: 'tp-002', jenjang: 'SMP / Sederajat', persentase: 28, urutan: 2 },
  { id: 'tp-003', jenjang: 'SMA / Sederajat', persentase: 18, urutan: 3 },
  { id: 'tp-004', jenjang: 'Sarjana (S1/D4)', persentase: 9, urutan: 4 },
];

export async function getDistribusiUsia(): Promise<DistribusiUsia[]> {
  const data = await ambilResource<DistribusiUsia[]>('distribusiUsia', dummyDistribusiUsia);
  return [...data].sort((a, b) => a.urutan - b.urutan);
}

export async function getTingkatPendidikan(): Promise<TingkatPendidikan[]> {
  const data = await ambilResource<TingkatPendidikan[]>('pendidikan', dummyPendidikan);
  return [...data].sort((a, b) => a.urutan - b.urutan);
}

function revalidasiDemografi() {
  revalidatePath('/dashboard/kependudukan');
  revalidatePath('/profil-desa');
  revalidatePath('/');
}

// --- Distribusi usia ---

export async function simpanDistribusiUsiaAction(input: DistribusiUsiaInput, id: string | null) {
  await requireAdmin();
  const urutan = id ? input.urutan : urutanBerikutnya(await getDistribusiUsia());
  await kirimResource('distribusiUsia', { aksi: 'simpan', id: id ?? '', ...input, urutan });
  revalidasiDemografi();
}

export async function hapusDistribusiUsiaAction(id: string) {
  await requireAdmin();
  await kirimResource('distribusiUsia', { aksi: 'hapus', id });
  revalidasiDemografi();
}

export async function pindahDistribusiUsiaAction(id: string, arah: 'naik' | 'turun') {
  await requireAdmin();
  const tukar = tukarUrutan(await getDistribusiUsia(), id, arah);
  if (!tukar) return;
  await kirimResource('distribusiUsia', { aksi: 'simpan', ...tukar.a });
  await kirimResource('distribusiUsia', { aksi: 'simpan', ...tukar.b });
  revalidasiDemografi();
}

// --- Tingkat pendidikan ---

export async function simpanPendidikanAction(input: TingkatPendidikanInput, id: string | null) {
  await requireAdmin();
  const urutan = id ? input.urutan : urutanBerikutnya(await getTingkatPendidikan());
  await kirimResource('pendidikan', { aksi: 'simpan', id: id ?? '', ...input, urutan });
  revalidasiDemografi();
}

export async function hapusPendidikanAction(id: string) {
  await requireAdmin();
  await kirimResource('pendidikan', { aksi: 'hapus', id });
  revalidasiDemografi();
}

export async function pindahPendidikanAction(id: string, arah: 'naik' | 'turun') {
  await requireAdmin();
  const tukar = tukarUrutan(await getTingkatPendidikan(), id, arah);
  if (!tukar) return;
  await kirimResource('pendidikan', { aksi: 'simpan', ...tukar.a });
  await kirimResource('pendidikan', { aksi: 'simpan', ...tukar.b });
  revalidasiDemografi();
}
