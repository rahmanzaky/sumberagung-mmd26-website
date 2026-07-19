'use server';

import type { KependudukanDusun, RingkasanKependudukan } from './dto';

// Data contoh dipakai selama APPS_SCRIPT_KEPENDUDUKAN_URL belum diisi.
// Angka di bawah ini ILUSTRATIF — ganti dengan data resmi desa sebelum publikasi.
const dummyKependudukan: KependudukanDusun[] = [
  {
    id: 'kp-001',
    dusun: 'Krajan',
    jumlahKK: 412,
    lakiLaki: 689,
    perempuan: 702,
    balita: 96,
    anak: 273,
    dewasa: 872,
    lansia: 150,
  },
  {
    id: 'kp-002',
    dusun: 'Sumber',
    jumlahKK: 358,
    lakiLaki: 596,
    perempuan: 611,
    balita: 84,
    anak: 241,
    dewasa: 756,
    lansia: 126,
  },
  {
    id: 'kp-003',
    dusun: 'Rejosari',
    jumlahKK: 297,
    lakiLaki: 488,
    perempuan: 503,
    balita: 71,
    anak: 198,
    dewasa: 618,
    lansia: 104,
  },
  {
    id: 'kp-004',
    dusun: 'Tegalrejo',
    jumlahKK: 233,
    lakiLaki: 381,
    perempuan: 394,
    balita: 55,
    anak: 152,
    dewasa: 486,
    lansia: 82,
  },
];

async function fetchAppsScript<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Apps Script request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export async function getKependudukan(): Promise<KependudukanDusun[]> {
  const url = process.env.APPS_SCRIPT_KEPENDUDUKAN_URL;
  if (!url) return dummyKependudukan;

  const json = await fetchAppsScript<{ data: KependudukanDusun[] }>(url);
  return json.data;
}

export async function getRingkasanKependudukan(): Promise<RingkasanKependudukan> {
  const rows = await getKependudukan();
  const jumlah = (pilih: (row: KependudukanDusun) => number) =>
    rows.reduce((total, row) => total + pilih(row), 0);

  const lakiLaki = jumlah((r) => r.lakiLaki);
  const perempuan = jumlah((r) => r.perempuan);

  return {
    totalPenduduk: lakiLaki + perempuan,
    totalKK: jumlah((r) => r.jumlahKK),
    lakiLaki,
    perempuan,
    balita: jumlah((r) => r.balita),
    anak: jumlah((r) => r.anak),
    dewasa: jumlah((r) => r.dewasa),
    lansia: jumlah((r) => r.lansia),
  };
}
