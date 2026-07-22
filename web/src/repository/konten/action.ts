'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/guard';
import { ambilResource, kirimResource } from '@/lib/apps-script';
import type { Konten, KontenInput } from './dto';

// Data contoh dipakai selama backend belum dikonfigurasi.
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

/**
 * Pembantu internal. `opsi.revalidate` diisi untuk pemakaian publik
 * (boleh basi 60 detik) dan dikosongkan untuk admin (harus terbaru).
 */
async function ambilKonten(opsi?: { revalidate?: number }): Promise<Konten[]> {
  const data = await ambilResource<Konten[]>('konten', dummyKonten, opsi);
  return [...data].sort((a, b) =>
    b.tanggalKegiatan.localeCompare(a.tanggalKegiatan),
  );
}

/** Semua konten, terbaru dulu. Khusus panel admin — selalu data terbaru. */
export async function getKonten(): Promise<Konten[]> {
  return ambilKonten();
}

/**
 * Konten untuk halaman publik — hanya berstatus "Tampil" (SK-F-12).
 * Disegarkan tiap 60 detik, bukan tiap kunjungan, dan tahan gagal:
 * bila backend lambat/error, memakai data contoh alih-alih menumbangkan
 * halaman. Filter status tetap di server agar draf tak terkirim ke browser.
 */
export async function getKontenPublik(batas = 6): Promise<Konten[]> {
  try {
    const semua = await ambilKonten({ revalidate: 60 });
    return semua.filter((k) => k.status === 'Tampil').slice(0, batas);
  } catch (error) {
    console.error('Gagal memuat konten publik, memakai data contoh:', error);
    return dummyKonten
      .filter((k) => k.status === 'Tampil')
      .slice(0, batas);
  }
}

async function postKonten(body: object) {
  await kirimResource('konten', body);
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