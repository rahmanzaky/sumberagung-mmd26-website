// Konten halaman Struktur Organisasi. Daftar berurut (Pola B).
//
// SENGAJA TERPISAH dari modul Pengguna: struktur memuat orang yang belum tentu
// punya akun login (mis. BPD, Kamituwo). Menggabungkannya akan membuat
// penghapusan akun ikut menghapus orang dari bagan publik.
//
// Hierarki dimodelkan lewat `level` (tingkatan, kecil = atas) + `urutan` (posisi
// kiri→kanan dalam satu level), bukan pohon penuh — cukup untuk bagan desa yang
// dangkal dan jauh lebih mudah dikelola perangkat desa.
export type Jabatan = {
  id: string;
  namaJabatan: string; // mis. "Kepala Desa", "Kasi Pemerintahan"
  namaPejabat: string; // mis. "Slamet Riyadi"
  urlFoto: string;
  level: number; // 1 = Kepala Desa / BPD, 2 = Sekretaris, 3 = Kasi/Kaur, 4 = Kamituwo
  urutan: number; // urutan dalam level yang sama
};

export type JabatanInput = Omit<Jabatan, 'id'>;

// Label bantu untuk dropdown level di form admin.
export const LEVEL_JABATAN: { nilai: number; label: string }[] = [
  { nilai: 1, label: 'Level 1 — Pimpinan (Kepala Desa / BPD)' },
  { nilai: 2, label: 'Level 2 — Sekretaris Desa' },
  { nilai: 3, label: 'Level 3 — Kasi / Kaur' },
  { nilai: 4, label: 'Level 4 — Kepala Dusun (Kamituwo)' },
];
