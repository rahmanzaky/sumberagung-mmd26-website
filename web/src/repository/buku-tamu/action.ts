'use server';

import { revalidatePath } from 'next/cache';
import type { BukuTamuEntry, BukuTamuInput } from './dto';

const dummyBukuTamu: BukuTamuEntry[] = [
  {
    id: 'bt-001',
    nama: 'Dr. Hendra Wijaya',
    instansi: 'Dinas Pertanian Kab.',
    keperluan: 'Koordinasi program bantuan pupuk',
    noWhatsapp: '0812-3456-7890',
    tanggal: '2026-07-01',
    jam: '09:15',
  },
  {
    id: 'bt-002',
    nama: 'Siti Aminah, M.Pd',
    instansi: 'Universitas Negeri',
    keperluan: 'Izin penelitian lapangan',
    noWhatsapp: '0856-7890-1234',
    tanggal: '2026-07-01',
    jam: '10:30',
  },
  {
    id: 'bt-003',
    nama: 'Timotius Purba',
    instansi: 'PT. Bangun Desa Makmur',
    keperluan: 'Presentasi penawaran pengadaan',
    noWhatsapp: '0821-4321-0987',
    tanggal: '2026-07-02',
    jam: '13:45',
  },
  {
    id: 'bt-004',
    nama: 'Warga RT 05',
    instansi: 'Dusun Krajan',
    keperluan: 'Konsultasi sengketa batas tanah',
    noWhatsapp: '0813-5555-6677',
    tanggal: '2026-07-02',
    jam: '15:00',
  },
  {
    id: 'bt-005',
    nama: 'Rina Wulandari',
    instansi: 'Puskesmas Panggungrejo',
    keperluan: 'Pendataan Posyandu balita',
    noWhatsapp: '0857-1122-3344',
    tanggal: '2026-07-03',
    jam: '09:00',
  },
  {
    id: 'bt-006',
    nama: 'Bambang Susilo',
    instansi: 'Kelompok Tani Subur',
    keperluan: 'Pengajuan proposal irigasi',
    noWhatsapp: '0812-9988-7766',
    tanggal: '2026-07-03',
    jam: '11:20',
  },
  {
    id: 'bt-007',
    nama: 'Sumiati',
    instansi: 'PKK Desa',
    keperluan: 'Koordinasi kegiatan lomba desa',
    noWhatsapp: '0895-3344-5566',
    tanggal: '2026-07-04',
    jam: '14:15',
  },
  {
    id: 'bt-008',
    nama: 'Agus Purnomo',
    instansi: 'Bank BRI Unit Panggungrejo',
    keperluan: 'Sosialisasi KUR untuk UMKM',
    noWhatsapp: '0813-2211-9900',
    tanggal: '2026-07-05',
    jam: '08:30',
  },
  {
    id: 'bt-009',
    nama: 'Lestari Ningsih',
    instansi: 'Karang Taruna',
    keperluan: 'Rapat persiapan HUT RI',
    noWhatsapp: '0838-4455-6677',
    tanggal: '2026-07-05',
    jam: '10:00',
  },
  {
    id: 'bt-010',
    nama: 'Wahyu Setiawan',
    instansi: 'CV. Sinar Abadi',
    keperluan: 'Permohonan izin kegiatan pameran',
    noWhatsapp: '0812-7788-9900',
    tanggal: '2026-07-06',
    jam: '09:45',
  },
  {
    id: 'bt-011',
    nama: 'Nurul Hidayah',
    instansi: 'Dinas Sosial Kab.',
    keperluan: 'Verifikasi data penerima bansos',
    noWhatsapp: '0857-6655-4433',
    tanggal: '2026-07-06',
    jam: '11:00',
  },
  {
    id: 'bt-012',
    nama: 'Joko Prasetyo',
    instansi: 'RT 02 Dusun Sumber',
    keperluan: 'Pengaduan jalan rusak',
    noWhatsapp: '0821-3322-1100',
    tanggal: '2026-07-06',
    jam: '13:30',
  },
];

async function fetchAppsScript<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Apps Script request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export async function getBukuTamu(): Promise<BukuTamuEntry[]> {
  const url = process.env.APPS_SCRIPT_BUKU_TAMU_URL;
  if (!url) return dummyBukuTamu;

  const json = await fetchAppsScript<{ data: BukuTamuEntry[] }>(url);
  return json.data;
}

export async function createBukuTamu(input: BukuTamuInput): Promise<void> {
  const url = process.env.APPS_SCRIPT_BUKU_TAMU_URL;
  if (!url) {
    console.warn('[dev] createBukuTamu called without APPS_SCRIPT_BUKU_TAMU_URL — skipping', input);
    return;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!res.ok) throw new Error(`Create buku tamu failed: ${res.status}`);
  const json = (await res.json()) as { success: boolean };
  if (!json.success) throw new Error('Apps Script returned success: false');
}

export async function createBukuTamuAction(input: BukuTamuInput) {
  await createBukuTamu(input);
  revalidatePath('/dashboard/buku-tamu');
  revalidatePath('/dashboard');
}
