import type { BukuTamuEntry } from './dto';

const dummyBukuTamu: BukuTamuEntry[] = [
  {
    id: 'bt-001',
    nama: 'Siti Aminah',
    keperluan: 'Pengurusan KTP',
    bertemuDengan: 'Sekretaris Desa',
    tanggal: '2026-07-01',
    jam: '09:15',
  },
  {
    id: 'bt-002',
    nama: 'Budi Santoso',
    keperluan: 'Informasi Program Bantuan',
    bertemuDengan: 'Kepala Desa',
    tanggal: '2026-07-01',
    jam: '10:30',
  },
  {
    id: 'bt-003',
    nama: 'Dewi Rahayu',
    keperluan: 'Pengajuan Surat Keterangan',
    bertemuDengan: 'Kaur Pelayanan',
    tanggal: '2026-07-02',
    jam: '08:45',
  },
  {
    id: 'bt-004',
    nama: 'Ahmad Fauzi',
    keperluan: 'Konsultasi Usaha UMKM',
    bertemuDengan: 'Kepala Desa',
    tanggal: '2026-07-02',
    jam: '13:00',
  },
  {
    id: 'bt-005',
    nama: 'Rina Wulandari',
    keperluan: 'Pendaftaran Posyandu',
    bertemuDengan: 'Kaur Kesra',
    tanggal: '2026-07-03',
    jam: '09:00',
  },
  {
    id: 'bt-006',
    nama: 'Hendra Wijaya',
    keperluan: 'Pengurusan IMB',
    bertemuDengan: 'Sekretaris Desa',
    tanggal: '2026-07-03',
    jam: '11:20',
  },
  {
    id: 'bt-007',
    nama: 'Sumiati',
    keperluan: 'Laporan Kehilangan',
    bertemuDengan: 'Kepala Desa',
    tanggal: '2026-07-04',
    jam: '14:15',
  },
  {
    id: 'bt-008',
    nama: 'Agus Purnomo',
    keperluan: 'Pengurusan Akta Kelahiran',
    bertemuDengan: 'Kaur Pelayanan',
    tanggal: '2026-07-05',
    jam: '08:30',
  },
  {
    id: 'bt-009',
    nama: 'Lestari Ningsih',
    keperluan: 'Informasi Beasiswa',
    bertemuDengan: 'Kaur Kesra',
    tanggal: '2026-07-05',
    jam: '10:00',
  },
  {
    id: 'bt-010',
    nama: 'Wahyu Setiawan',
    keperluan: 'Permohonan Izin Kegiatan',
    bertemuDengan: 'Kepala Desa',
    tanggal: '2026-07-06',
    jam: '09:45',
  },
  {
    id: 'bt-011',
    nama: 'Nurul Hidayah',
    keperluan: 'Pengurusan Kartu Keluarga',
    bertemuDengan: 'Sekretaris Desa',
    tanggal: '2026-07-06',
    jam: '11:00',
  },
  {
    id: 'bt-012',
    nama: 'Bambang Susilo',
    keperluan: 'Konsultasi Pertanian',
    bertemuDengan: 'Kepala Desa',
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
