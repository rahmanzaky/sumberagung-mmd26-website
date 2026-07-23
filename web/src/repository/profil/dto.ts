// Konten halaman Profil Desa — tab "Visi & Misi".
// Visi + teks halaman = satu record (Pola A). Misi = daftar (Pola B).

export type ProfilVisi = {
  halamanJudul: string;
  halamanSubteks: string;
  visiKutipan: string;
};

export const PROFIL_VISI_DEFAULT: ProfilVisi = {
  halamanJudul: 'Profil Desa',
  halamanSubteks:
    'Menyelami identitas Sumberagung melalui lanskap, masyarakat, dan cita-cita bersama di bawah naungan malam.',
  visiKutipan: 'Mewujudkan Sumberagung yang Berbudaya, Mandiri, dan Sejahtera.',
};

// Satu poin misi. `urutan` menentukan posisi tampil (kecil = atas).
export type Misi = {
  id: string;
  teks: string;
  urutan: number;
};

export type MisiInput = Omit<Misi, 'id'>;
