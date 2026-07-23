// Helper murni untuk memindah item dalam daftar berurut.

export type Berurut = { id: string; urutan: number };

/**
 * Menghitung dua item yang nilai `urutan`-nya harus ditukar agar `id` bergerak
 * satu langkah ke `arah`. Mengembalikan null bila sudah di ujung (tidak ada
 * yang perlu diubah). Pemanggil yang menyimpan kedua item hasil tukar.
 */
export function tukarUrutan<T extends Berurut>(
  items: T[],
  id: string,
  arah: 'naik' | 'turun',
): { a: T; b: T } | null {
  const urut = [...items].sort((x, y) => x.urutan - y.urutan);
  const idx = urut.findIndex((it) => it.id === id);
  if (idx === -1) return null;

  const idxTetangga = arah === 'naik' ? idx - 1 : idx + 1;
  if (idxTetangga < 0 || idxTetangga >= urut.length) return null;

  const a = urut[idx];
  const b = urut[idxTetangga];
  // Tukar nilai urutan keduanya.
  return { a: { ...a, urutan: b.urutan }, b: { ...b, urutan: a.urutan } };
}

/** Nomor urutan berikutnya (untuk item baru) = maks + 1, mulai dari 1. */
export function urutanBerikutnya(items: Berurut[]): number {
  return items.reduce((maks, it) => Math.max(maks, it.urutan), 0) + 1;
}
