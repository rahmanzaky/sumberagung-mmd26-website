export type StatusHadir = 'Hadir' | 'Izin' | 'Sakit' | 'Alpha';

export type PresensiEntry = {
  id: string;
  nama: string;
  jabatan: string;
  tanggal: string; // YYYY-MM-DD
  jamMasuk: string; // HH:mm — kosong jika tidak hadir
  jamPulang: string; // HH:mm — kosong jika belum absen pulang
  status: StatusHadir;
  keterangan: string;
};

export const STATUS_HADIR: StatusHadir[] = ['Hadir', 'Izin', 'Sakit', 'Alpha'];

// Rekap kehadiran satu hari — dipakai StatCard "Status Kehadiran Perangkat".
export type RekapKehadiran = {
  hadir: number;
  total: number;
  izin: number;
  sakit: number;
  alpha: number;
};
