// Sheet 2 — Perangkat Desa (SRS 3.1).
// Catatan deviasi dari SRS: kolom Password TIDAK dipakai. Login memakai
// Google OAuth (NextAuth) dan dicocokkan lewat kolom `email`, sehingga tidak
// ada password mentah yang tersimpan di Spreadsheet.
export type Role = 'Admin' | 'Super Admin';

export type Pengguna = {
  username: string; // primary key
  namaLengkap: string;
  jabatan: string;
  noWa: string;
  email: string; // dicocokkan dengan email sesi Google
  role: Role;
};

export const ROLES: Role[] = ['Admin', 'Super Admin'];

export type PenggunaInput = Pengguna;
