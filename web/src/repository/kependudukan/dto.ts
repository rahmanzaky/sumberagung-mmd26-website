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

// Tabel "Distribusi Usia & Gender" di halaman Demografi. Satu baris = satu
// rentang usia. `jumlah` dihitung (L + P), tidak disimpan.
export type DistribusiUsia = {
  id: string;
  rentang: string; // mis. "0 - 5 Tahun"
  wilayah: string; // mis. "Sumberagung"
  lakiLaki: number;
  perempuan: number;
  urutan: number;
};

export type DistribusiUsiaInput = Omit<DistribusiUsia, 'id'>;

// Grafik "Tingkat Pendidikan" (persentase batang).
export type TingkatPendidikan = {
  id: string;
  jenjang: string; // mis. "SD / Sederajat"
  persentase: number; // 0–100
  urutan: number;
};

export type TingkatPendidikanInput = Omit<TingkatPendidikan, 'id'>;
