'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/guard';
import type { PresensiEntry, RekapKehadiran, StatusHadir } from './dto';

// Data contoh dipakai selama APPS_SCRIPT_PRESENSI_URL belum diisi,
// mengikuti pola modul buku-tamu & pengajuan-surat.
const dummyPresensi: PresensiEntry[] = [
  {
    id: 'ps-001',
    nama: 'Sutrisno, S.Sos',
    jabatan: 'Kepala Desa',
    tanggal: '2026-07-19',
    jamMasuk: '07:30',
    jamPulang: '15:00',
    status: 'Hadir',
    keterangan: '',
  },
  {
    id: 'ps-002',
    nama: 'Endang Sulistyowati',
    jabatan: 'Sekretaris Desa',
    tanggal: '2026-07-19',
    jamMasuk: '07:25',
    jamPulang: '15:00',
    status: 'Hadir',
    keterangan: '',
  },
  {
    id: 'ps-003',
    nama: 'Muhammad Fauzi',
    jabatan: 'Kaur Keuangan',
    tanggal: '2026-07-19',
    jamMasuk: '07:45',
    jamPulang: '',
    status: 'Hadir',
    keterangan: '',
  },
  {
    id: 'ps-004',
    nama: 'Dwi Ratnasari',
    jabatan: 'Kaur Umum',
    tanggal: '2026-07-19',
    jamMasuk: '',
    jamPulang: '',
    status: 'Izin',
    keterangan: 'Mengurus keperluan keluarga',
  },
  {
    id: 'ps-005',
    nama: 'Slamet Riyadi',
    jabatan: 'Kasi Pemerintahan',
    tanggal: '2026-07-19',
    jamMasuk: '07:20',
    jamPulang: '15:10',
    status: 'Hadir',
    keterangan: '',
  },
  {
    id: 'ps-006',
    nama: 'Hartono',
    jabatan: 'Kasi Kesejahteraan',
    tanggal: '2026-07-19',
    jamMasuk: '',
    jamPulang: '',
    status: 'Sakit',
    keterangan: 'Surat keterangan dokter terlampir',
  },
  {
    id: 'ps-007',
    nama: 'Yuliana Dewi',
    jabatan: 'Kasi Pelayanan',
    tanggal: '2026-07-19',
    jamMasuk: '07:35',
    jamPulang: '',
    status: 'Hadir',
    keterangan: '',
  },
  {
    id: 'ps-008',
    nama: 'Bagus Setiawan',
    jabatan: 'Kadus Krajan',
    tanggal: '2026-07-19',
    jamMasuk: '',
    jamPulang: '',
    status: 'Alpha',
    keterangan: 'Tanpa keterangan',
  },
];

async function fetchAppsScript<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Apps Script request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export async function getPresensi(): Promise<PresensiEntry[]> {
  const url = process.env.APPS_SCRIPT_PRESENSI_URL;
  if (!url) return dummyPresensi;

  const json = await fetchAppsScript<{ data: PresensiEntry[] }>(url);
  return json.data;
}

function tanggalHariIniISO() {
  // Format YYYY-MM-DD mengikuti zona waktu lokal, bukan UTC.
  return new Date().toLocaleDateString('en-CA');
}

/** Rekap kehadiran untuk satu tanggal (default: hari ini). */
export async function getRekapKehadiran(tanggal?: string): Promise<RekapKehadiran> {
  const target = tanggal ?? tanggalHariIniISO();
  const semua = await getPresensi();
  const hariIni = semua.filter((p) => p.tanggal === target);

  const hitung = (status: StatusHadir) => hariIni.filter((p) => p.status === status).length;

  return {
    hadir: hitung('Hadir'),
    total: hariIni.length,
    izin: hitung('Izin'),
    sakit: hitung('Sakit'),
    alpha: hitung('Alpha'),
  };
}

export async function updateStatusPresensi(id: string, status: StatusHadir, keterangan: string) {
  const url = process.env.APPS_SCRIPT_PRESENSI_URL;
  if (!url) {
    console.warn('[dev] updateStatusPresensi called without APPS_SCRIPT_PRESENSI_URL — skipping');
    return;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, status, keterangan }),
  });

  if (!res.ok) throw new Error(`Update presensi failed: ${res.status}`);
  const json = (await res.json()) as { success: boolean };
  if (!json.success) throw new Error('Apps Script returned success: false');
}

export async function updateStatusPresensiAction(
  id: string,
  status: StatusHadir,
  keterangan: string,
) {
  await requireAdmin();
  await updateStatusPresensi(id, status, keterangan);
  revalidatePath('/dashboard/presensi');
  revalidatePath('/dashboard');
}
