// Sheet 3 — Absensi (SRS 3.1).
// Field mengikuti SRS persis: ID_Absensi, Username (FK ke PerangkatDesa),
// Tanggal, Jam_Masuk, Keterangan. Tidak ada jam pulang / status kehadiran —
// SRS hanya mencatat check-in satu kali per hari (SK-F-08, SK-NF-11).
export type AbsensiEntry = {
  id: string;
  username: string; // foreign key ke sheet PerangkatDesa
  tanggal: string; // YYYY-MM-DD
  jamMasuk: string; // HH:mm
  keterangan: string;
};

// Baris rekap yang sudah digabung dengan nama & jabatan dari sheet PerangkatDesa.
export type RekapAbsensiRow = AbsensiEntry & {
  namaLengkap: string;
  jabatan: string;
};

// Ringkasan kehadiran satu hari — dipakai StatCard di dashboard.
export type RekapKehadiran = {
  sudahAbsen: number;
  totalPerangkat: number;
};
