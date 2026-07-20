// Sheet 5 — Konten Kegiatan (SRS 3.1).
export type StatusKonten = 'Tampil' | 'Tersembunyi';

export type Konten = {
  id: string;
  judul: string;
  deskripsi: string;
  tanggalKegiatan: string; // YYYY-MM-DD
  kategori: string;
  urlFoto: string;
  status: StatusKonten;
  dibuatOleh: string; // username perangkat desa
};

export const STATUS_KONTEN: StatusKonten[] = ['Tampil', 'Tersembunyi'];

export const KATEGORI_KONTEN = [
  'Berita',
  'Kegiatan',
  'Pengumuman',
  'Pembangunan',
  'Kesehatan',
  'Pendidikan',
];

// dibuatOleh diisi server dari sesi, jadi tidak dikirim dari form.
export type KontenInput = Omit<Konten, 'dibuatOleh'>;
