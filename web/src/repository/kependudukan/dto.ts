// Satu baris = rekap kependudukan satu dusun.
export type KependudukanDusun = {
  id: string;
  dusun: string;
  jumlahKK: number;
  lakiLaki: number;
  perempuan: number;
  balita: number; // 0–5 th
  anak: number; // 6–17 th
  dewasa: number; // 18–59 th
  lansia: number; // 60 th ke atas
};

// Agregat seluruh desa — dipakai untuk stat card di halaman Kependudukan.
export type RingkasanKependudukan = {
  totalPenduduk: number;
  totalKK: number;
  lakiLaki: number;
  perempuan: number;
  balita: number;
  anak: number;
  dewasa: number;
  lansia: number;
};
