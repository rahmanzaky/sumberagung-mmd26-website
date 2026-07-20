'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/guard';
import type { PengajuanSurat, PengajuanSuratInput, StatusSurat } from './dto';

// Data contoh tanpa alamat/noWa; diisi default oleh getPengajuanSurat().
const dummyPengajuanSurat: Omit<PengajuanSurat, 'alamat' | 'noWa'>[] = [
  {
    id: 'ps-001',
    nama: 'Siti Aminah',
    nik: '3502110101900001',
    jenisSurat: 'Surat Keterangan Domisili',
    keperluan: 'Syarat CPNS',
    status: 'Selesai',
    tanggalPengajuan: '2026-06-28',
    tanggalUpdate: '2026-06-30',
  },
  {
    id: 'ps-002',
    nama: 'Budi Santoso',
    nik: '3502110202850002',
    jenisSurat: 'Surat Keterangan Tidak Mampu',
    keperluan: 'Beasiswa PIP',
    status: 'Selesai',
    tanggalPengajuan: '2026-06-29',
    tanggalUpdate: '2026-07-01',
  },
  {
    id: 'ps-003',
    nama: 'Ahmad Fauzi',
    nik: '3502110303780003',
    jenisSurat: 'Surat Pengantar KTP',
    keperluan: 'Pembaruan KTP',
    status: 'Diproses',
    tanggalPengajuan: '2026-07-01',
    tanggalUpdate: '2026-07-01',
  },
  {
    id: 'ps-004',
    nama: 'Dewi Rahayu',
    nik: '3502114404950004',
    jenisSurat: 'Surat Keterangan Usaha',
    keperluan: 'Pinjaman KUR',
    status: 'Diproses',
    tanggalPengajuan: '2026-07-02',
    tanggalUpdate: '2026-07-03',
  },
  {
    id: 'ps-005',
    nama: 'Rina Wulandari',
    nik: '3502115505000005',
    jenisSurat: 'Surat Keterangan Domisili',
    keperluan: 'Daftar Sekolah',
    status: 'Baru',
    tanggalPengajuan: '2026-07-04',
    tanggalUpdate: '2026-07-04',
  },
  {
    id: 'ps-006',
    nama: 'Hendra Wijaya',
    nik: '3502110606820006',
    jenisSurat: 'Surat Keterangan Kelahiran',
    keperluan: 'Akta Lahir Anak',
    status: 'Baru',
    tanggalPengajuan: '2026-07-05',
    tanggalUpdate: '2026-07-05',
  },
  {
    id: 'ps-007',
    nama: 'Sumiati',
    nik: '3502116707750007',
    jenisSurat: 'Surat Pengantar SKCK',
    keperluan: 'Syarat Kerja',
    status: 'Baru',
    tanggalPengajuan: '2026-07-06',
    tanggalUpdate: '2026-07-06',
  },
  {
    id: 'ps-008',
    nama: 'Agus Purnomo',
    nik: '3502110808910008',
    jenisSurat: 'Surat Keterangan Tidak Mampu',
    keperluan: 'Keringanan BPJS',
    status: 'Ditolak',
    tanggalPengajuan: '2026-06-25',
    tanggalUpdate: '2026-06-27',
  },
  {
    id: 'ps-009',
    nama: 'Lestari Ningsih',
    nik: '3502119909980009',
    jenisSurat: 'Surat Keterangan Domisili',
    keperluan: 'Buka Rekening Bank',
    status: 'Selesai',
    tanggalPengajuan: '2026-07-01',
    tanggalUpdate: '2026-07-02',
  },
  {
    id: 'ps-010',
    nama: 'Wahyu Setiawan',
    nik: '3502111010870010',
    jenisSurat: 'Surat Keterangan Usaha',
    keperluan: 'Izin Usaha Mikro',
    status: 'Diproses',
    tanggalPengajuan: '2026-07-05',
    tanggalUpdate: '2026-07-06',
  },
];

async function fetchAppsScript<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Apps Script request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export async function getPengajuanSurat(): Promise<PengajuanSurat[]> {
  const url = process.env.APPS_SCRIPT_SURAT_URL;
  if (!url) return dummyPengajuanSurat.map((d) => ({ ...d, alamat: '', noWa: '' }));

  const json = await fetchAppsScript<{ data: PengajuanSurat[] }>(url);
  return json.data;
}

/**
 * Pengajuan surat baru dari warga (halaman publik). TIDAK butuh login — warga
 * tidak punya akun (SRS 2.2). Apps Script menyimpan baris & mengirim email
 * notifikasi ke perangkat desa (menggantikan notifikasi WhatsApp).
 */
export async function buatPengajuanSuratAction(input: PengajuanSuratInput) {
  const url = process.env.APPS_SCRIPT_SURAT_URL;
  if (!url) {
    console.warn('[dev] buatPengajuanSuratAction tanpa APPS_SCRIPT_SURAT_URL — dilewati', input);
    return;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ aksi: 'buat', ...input }),
  });

  if (!res.ok) throw new Error(`Pengajuan gagal: ${res.status}`);
  const json = (await res.json()) as { success: boolean; error?: string };
  if (!json.success) throw new Error(json.error ?? 'Apps Script returned success: false');

  revalidatePath('/dashboard/pengajuan-surat');
  revalidatePath('/dashboard');
}

export async function updateStatusSurat(id: string, status: StatusSurat): Promise<void> {
  const url = process.env.APPS_SCRIPT_SURAT_URL;
  if (!url) {
    console.warn('[dev] updateStatusSurat called without APPS_SCRIPT_SURAT_URL — skipping');
    return;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, status }),
  });

  if (!res.ok) throw new Error(`Update status failed: ${res.status}`);
  const json = (await res.json()) as { success: boolean };
  if (!json.success) throw new Error('Apps Script returned success: false');
}

export async function updateStatusAction(id: string, status: StatusSurat) {
  await requireAdmin();
  await updateStatusSurat(id, status);
  revalidatePath('/dashboard/pengajuan-surat');
  revalidatePath('/dashboard');
}
