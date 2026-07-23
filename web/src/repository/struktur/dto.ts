// Konten halaman Struktur Organisasi. Daftar berurut (Pola B).
//
// SENGAJA TERPISAH dari modul Pengguna: struktur memuat orang yang belum tentu
// punya akun login (mis. BPD, Kamituwo). Menggabungkannya akan membuat
// penghapusan akun ikut menghapus orang dari bagan publik.
//
// `level` = SLOT posisi di bagan (bukan sekadar tingkatan). Tiap kelompok punya
// nomor sendiri supaya penempatan pasti — tak lagi menebak dari nama jabatan:
//   1 = Kepala Desa · 2 = BPD · 3 = Sekretaris · 4 = Kasi · 5 = Kaur · 6 = Kamituwo
// `urutan` = posisi kiri→kanan dalam satu kelompok.
export type Jabatan = {
  id: string;
  namaJabatan: string; // mis. "Kepala Desa", "Kasi Pemerintahan"
  namaPejabat: string; // mis. "Slamet Riyadi"
  urlFoto: string;
  level: number; // slot bagan (1–6, lihat di atas)
  urutan: number; // urutan dalam kelompok yang sama
};

export type JabatanInput = Omit<Jabatan, 'id'>;

// Nomor slot bagan. Dipakai loader publik & guard rendering.
export const SLOT = {
  KEPALA_DESA: 1,
  BPD: 2,
  SEKRETARIS: 3,
  KASI: 4,
  KAUR: 5,
  KAMITUWO: 6,
} as const;

// Opsi dropdown "Kelompok / Posisi" di form admin. `nilai` = level/slot.
// Admin memilih posisi langsung, jadi tak mungkin salah-tempat karena penamaan.
export const KELOMPOK_JABATAN: { nilai: number; label: string }[] = [
  { nilai: SLOT.KEPALA_DESA, label: 'Kepala Desa' },
  { nilai: SLOT.BPD, label: 'BPD (Badan Permusyawaratan Desa)' },
  { nilai: SLOT.SEKRETARIS, label: 'Sekretaris Desa' },
  { nilai: SLOT.KASI, label: 'Kasi (Kepala Seksi)' },
  { nilai: SLOT.KAUR, label: 'Kaur (Kepala Urusan)' },
  { nilai: SLOT.KAMITUWO, label: 'Kamituwo (Kepala Dusun)' },
];
