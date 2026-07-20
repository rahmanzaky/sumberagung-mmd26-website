// Sheet 3 — Absensi (SRS 3.1) + perluasan bukti kehadiran.
// Field SRS: ID_Absensi, Username (FK ke PerangkatDesa), Tanggal, Jam_Masuk,
// Keterangan. Ditambah (permintaan desa): foto bukti + koordinat lokasi saat
// absen. Tetap satu check-in per hari (SK-F-08, SK-NF-11).
export type AbsensiEntry = {
  id: string;
  username: string; // foreign key ke sheet PerangkatDesa
  tanggal: string; // YYYY-MM-DD
  jamMasuk: string; // HH:mm
  keterangan: string;
  urlFoto: string; // tautan Drive foto bukti (privat)
  latitude: string; // koordinat lokasi absen
  longitude: string;
};

// Payload dari klien saat absen — foto sudah dikompres jadi base64.
export type AbsenPayload = {
  keterangan: string;
  latitude: string;
  longitude: string;
  fotoBase64: string; // tanpa prefix data URI
  fotoMime: string;
  fotoNama: string;
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
