// Konten halaman Sejarah Desa — timeline. Daftar berurut (Pola B).
export type SisiTimeline = 'kiri' | 'kanan';

export type TimelineEntri = {
  id: string;
  era: string; // mis. "Akhir Abad ke-18", "1908"
  subjudul: string; // mis. "Awal Mula"
  narasi: string;
  urlFoto: string;
  sisi: SisiTimeline; // posisi foto di halaman: kiri atau kanan
  urutan: number;
};

export type TimelineEntriInput = Omit<TimelineEntri, 'id'>;

export const SISI_TIMELINE: SisiTimeline[] = ['kiri', 'kanan'];
