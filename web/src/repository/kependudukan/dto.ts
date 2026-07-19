// Sheet 6 — Data Kependudukan (SRS 3.1).
// Satu baris = statistik satu tahun. Field mengikuti SRS persis.
export type KependudukanTahun = {
  tahun: number; // primary key
  totalPenduduk: number;
  lakiLaki: number;
  perempuan: number;
  jumlahKK: number;
  jumlahRt: number;
  jumlahRw: number;
};

export const FIELD_ANGKA = [
  'totalPenduduk',
  'lakiLaki',
  'perempuan',
  'jumlahKK',
  'jumlahRt',
  'jumlahRw',
] as const;

export const LABEL_FIELD: Record<(typeof FIELD_ANGKA)[number], string> = {
  totalPenduduk: 'Total Penduduk',
  lakiLaki: 'Laki-laki',
  perempuan: 'Perempuan',
  jumlahKK: 'Jumlah KK',
  jumlahRt: 'Jumlah RT',
  jumlahRw: 'Jumlah RW',
};
