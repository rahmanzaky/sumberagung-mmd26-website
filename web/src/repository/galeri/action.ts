'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/guard';
import { ambilResource, kirimResource } from '@/lib/apps-script';
import type { FotoGaleri, FotoGaleriInput } from './dto';

// Data contoh dipakai selama backend belum dikonfigurasi.
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

/** Semua foto, terbaru dulu. */
export async function getGaleri(): Promise<FotoGaleri[]> {
  const data = await ambilResource<FotoGaleri[]>('galeri', dummyGaleri);
  return [...data].sort((a, b) => b.tanggalUnggah.localeCompare(a.tanggalUnggah));
}

async function postGaleri(body: object) {
  await kirimResource('galeri', body);
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
