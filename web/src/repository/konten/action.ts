'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/guard';
import type { Konten, KontenInput } from './dto';

// Data contoh dipakai selama APPS_SCRIPT_KONTEN_URL belum diisi.
const dummyKonten: Konten[] = [
  {
    id: 'kt-001',
    judul: 'Musyawarah Desa Penetapan APBDes 2026',
    deskripsi:
      'Musyawarah desa dihadiri BPD, perangkat desa, dan perwakilan warga untuk menetapkan Anggaran Pendapatan dan Belanja Desa tahun 2026.',
    tanggalKegiatan: '2026-07-15',
    kategori: 'Kegiatan',
    urlFoto: '',
    status: 'Tampil',
    dibuatOleh: 'endang',
  },
  {
    id: 'kt-002',
    judul: 'Posyandu Balita Dusun Krajan',
    deskripsi:
      'Kegiatan penimbangan dan pemberian vitamin A untuk balita bersama kader Posyandu dan bidan desa.',
    tanggalKegiatan: '2026-07-10',
    kategori: 'Kesehatan',
    urlFoto: '',
    status: 'Tampil',
    dibuatOleh: 'yuliana',
  },
  {
    id: 'kt-003',
    judul: 'Pembangunan Jalan Usaha Tani Tahap II',
    deskripsi:
      'Pengerasan jalan usaha tani sepanjang 800 meter yang menghubungkan Dusun Sumber dengan area persawahan.',
    tanggalKegiatan: '2026-07-05',
    kategori: 'Pembangunan',
    urlFoto: '',
    status: 'Tampil',
    dibuatOleh: 'slamet',
  },
  {
    id: 'kt-004',
    judul: 'Persiapan Lomba Desa Tingkat Kabupaten',
    deskripsi: 'Rapat koordinasi persiapan lomba desa. Draf materi masih disusun.',
    tanggalKegiatan: '2026-07-20',
    kategori: 'Pengumuman',
    urlFoto: '',
    status: 'Tersembunyi',
    dibuatOleh: 'sutrisno',
  },
];

async function fetchAppsScript<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Apps Script request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

/** Semua konten, terbaru dulu. Khusus panel admin. */
export async function getKonten(): Promise<Konten[]> {
  const url = process.env.APPS_SCRIPT_KONTEN_URL;
  const data = url ? (await fetchAppsScript<{ data: Konten[] }>(url)).data : dummyKonten;

  return [...data].sort((a, b) => b.tanggalKegiatan.localeCompare(a.tanggalKegiatan));
}

/**
 * Konten untuk halaman publik — hanya yang berstatus "Tampil" (SK-F-12).
 * Filter dilakukan di server supaya draf tidak pernah terkirim ke browser.
 */
export async function getKontenPublik(batas = 6): Promise<Konten[]> {
  const semua = await getKonten();
  return semua.filter((k) => k.status === 'Tampil').slice(0, batas);
}

async function postKonten(body: unknown) {
  const url = process.env.APPS_SCRIPT_KONTEN_URL;
  if (!url) {
    console.warn('[dev] postKonten tanpa APPS_SCRIPT_KONTEN_URL — dilewati', body);
    return;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`Konten request failed: ${res.status}`);
  const json = (await res.json()) as { success: boolean; error?: string };
  if (!json.success) throw new Error(json.error ?? 'Apps Script returned success: false');
}

function revalidasiKonten() {
  revalidatePath('/dashboard/konten');
  revalidatePath('/'); // sneak peek kegiatan di halaman Home
}

export async function simpanKontenAction(input: KontenInput) {
  const saya = await requireAdmin();
  await postKonten({ aksi: 'simpan', ...input, dibuatOleh: saya.username });
  revalidasiKonten();
}

export async function hapusKontenAction(id: string) {
  await requireAdmin();
  await postKonten({ aksi: 'hapus', id });
  revalidasiKonten();
}

export async function toggleStatusKontenAction(id: string, status: Konten['status']) {
  await requireAdmin();
  await postKonten({ aksi: 'status', id, status });
  revalidasiKonten();
}
