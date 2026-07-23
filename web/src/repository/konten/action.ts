'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/guard';
import { ambilResource, kirimResource } from '@/lib/apps-script';
import { daftarKegiatan } from '@/feature/public/kegiatan-desa/data';
import type { Konten, KontenInput } from './dto';

/**
 * Data contoh (mode pengembangan, saat APPS_SCRIPT_URL kosong).
 *
 * Diturunkan langsung dari data statis kegiatan & berita agar `id`-nya
 * SAMA dengan yang dicari halaman detail (DetailKegiatanContainer /
 * DetailBeritaContainer). Dengan begitu, klik kartu di beranda → halaman
 * detail ketemu datanya, tidak lagi 404.
 *
 * CATATAN untuk mode BACKEND: halaman detail & daftar berita masih membaca
 * data statis ini, bukan dari Apps Script. Selama itu, id dari backend
 * (mis. "kt-001") tidak akan cocok. Lihat catatan di bawah file.
 */
const dummyKonten: Konten[] = [
  ...daftarKegiatan.map((k) => ({
    id: k.id,
    judul: k.judul,
    deskripsi: k.deskripsi.join('\n'),
    tanggalKegiatan: k.tanggal,
    kategori: k.kategori,
    urlFoto: k.gambar.src,
    status: 'Tampil' as const,
    dibuatOleh: k.fasilitator,
  })),
  {
    id: 'kt-1784699960278', // User's requested ID
    judul: 'Aplikasi Pelayanan Desa Resmi Diluncurkan',
    deskripsi:
      'Pemerintah Desa Sumberagung resmi meluncurkan aplikasi pelayanan terpadu berbasis web untuk mempermudah administrasi warga.',
    tanggalKegiatan: '10 Okt 2023',
    kategori: 'Berita',
    urlFoto: '',
    status: 'Tampil' as const,
    dibuatOleh: 'Admin Desa',
  },
  {
    id: 'sukses-panen-raya-hasil-pertanian-organik',
    judul: 'Sukses Panen Raya: Hasil Pertanian Organik Meningkat Pesat',
    deskripsi:
      'Kelompok tani Desa Sumberagung mencatatkan hasil panen raya padi organik yang melimpah pada musim ini.',
    tanggalKegiatan: '08 Okt 2023',
    kategori: 'Pertanian',
    urlFoto: '',
    status: 'Tampil' as const,
    dibuatOleh: 'Admin Desa',
  },
];

/**
 * Pembantu internal. `opsi.revalidate` diisi untuk pemakaian publik
 * (boleh basi 60 detik) dan dikosongkan untuk admin (harus terbaru).
 */
async function ambilKonten(opsi?: { revalidate?: number }): Promise<Konten[]> {
  const data = await ambilResource<Konten[]>('konten', dummyKonten, opsi);
  return [...data].sort((a, b) => b.tanggalKegiatan.localeCompare(a.tanggalKegiatan));
}

/** Semua konten, terbaru dulu. Khusus panel admin — selalu data terbaru. */
export async function getKonten(): Promise<Konten[]> {
  return ambilKonten();
}

/**
 * Konten untuk halaman publik — hanya berstatus "Tampil" (SK-F-12).
 * Disegarkan tiap 60 detik dan tahan gagal.
 */
export async function getKontenPublik(batas = 6): Promise<Konten[]> {
  try {
    const semua = await ambilKonten({ revalidate: 60 });
    return semua.filter((k) => k.status === 'Tampil').slice(0, batas);
  } catch (error) {
    console.error('Gagal memuat konten publik, memakai data contoh:', error);
    return dummyKonten.filter((k) => k.status === 'Tampil').slice(0, batas);
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
