'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/guard';
import type { FotoGaleri, FotoGaleriInput } from './dto';

// Data contoh dipakai selama APPS_SCRIPT_GALERI_URL belum diisi.
// urlFoto sengaja dikosongkan supaya UI menampilkan placeholder, bukan
// gambar dari domain luar yang mungkin sudah tidak ada.
const dummyGaleri: FotoGaleri[] = [
  {
    id: 'gl-001',
    judul: 'Kerja Bakti Bersih Desa',
    urlFoto: '',
    kategori: 'Kegiatan Desa',
    tanggalUnggah: '2026-07-14',
    diunggahOleh: 'slamet',
  },
  {
    id: 'gl-002',
    judul: 'Pengerasan Jalan Usaha Tani',
    urlFoto: '',
    kategori: 'Pembangunan',
    tanggalUnggah: '2026-07-08',
    diunggahOleh: 'slamet',
  },
  {
    id: 'gl-003',
    judul: 'Posyandu Balita Dusun Krajan',
    urlFoto: '',
    kategori: 'Posyandu',
    tanggalUnggah: '2026-07-10',
    diunggahOleh: 'yuliana',
  },
  {
    id: 'gl-004',
    judul: 'Turnamen Voli Antar Dusun',
    urlFoto: '',
    kategori: 'Olahraga',
    tanggalUnggah: '2026-06-28',
    diunggahOleh: 'bagus',
  },
  {
    id: 'gl-005',
    judul: 'Pengajian Rutin Muslimat',
    urlFoto: '',
    kategori: 'Keagamaan',
    tanggalUnggah: '2026-06-20',
    diunggahOleh: 'hartono',
  },
  {
    id: 'gl-006',
    judul: 'Penyaluran Bantuan Sosial',
    urlFoto: '',
    kategori: 'Kegiatan Desa',
    tanggalUnggah: '2026-06-15',
    diunggahOleh: 'dwi',
  },
];

async function fetchAppsScript<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Apps Script request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

/** Semua foto, terbaru dulu. */
export async function getGaleri(): Promise<FotoGaleri[]> {
  const url = process.env.APPS_SCRIPT_GALERI_URL;
  const data = url ? (await fetchAppsScript<{ data: FotoGaleri[] }>(url)).data : dummyGaleri;

  return [...data].sort((a, b) => b.tanggalUnggah.localeCompare(a.tanggalUnggah));
}

async function postGaleri(body: unknown) {
  const url = process.env.APPS_SCRIPT_GALERI_URL;
  if (!url) {
    console.warn('[dev] postGaleri tanpa APPS_SCRIPT_GALERI_URL — dilewati', body);
    return;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`Galeri request failed: ${res.status}`);
  const json = (await res.json()) as { success: boolean; error?: string };
  if (!json.success) throw new Error(json.error ?? 'Apps Script returned success: false');
}

export async function simpanFotoAction(input: FotoGaleriInput) {
  const saya = await requireAdmin();
  await postGaleri({
    aksi: 'simpan',
    ...input,
    tanggalUnggah: new Date().toLocaleDateString('en-CA'),
    diunggahOleh: saya.username,
  });
  revalidatePath('/dashboard/galeri');
  revalidatePath('/');
}

export async function hapusFotoAction(id: string) {
  await requireAdmin();
  await postGaleri({ aksi: 'hapus', id });
  revalidatePath('/dashboard/galeri');
  revalidatePath('/');
}
