// Galeri & Media (SK-F-15).
// Tidak ada di daftar 6 sheet SRS 3.1, jadi skema ini turunan dari kebutuhan
// fitur "mengunggah dan mengelola foto kegiatan desa" (SRS 2.1 bagian C).
//
// Foto disimpan di Google Drive desa; sheet hanya menyimpan tautannya, supaya
// tidak membebani Spreadsheet dan tetap gratis (SRS 5.3 — tanpa biaya hosting).
export type FotoGaleri = {
  id: string;
  judul: string;
  urlFoto: string;
  kategori: string;
  tanggalUnggah: string; // YYYY-MM-DD
  diunggahOleh: string; // username perangkat desa
};

export type FotoGaleriInput = Omit<FotoGaleri, 'diunggahOleh' | 'tanggalUnggah'>;

export const KATEGORI_GALERI = [
  'Kegiatan Desa',
  'Pembangunan',
  'Posyandu',
  'Olahraga',
  'Keagamaan',
  'Lainnya',
];

/**
 * Mengubah tautan "share" Google Drive menjadi tautan yang bisa dipakai
 * langsung di tag <img>. Link share biasa mengembalikan halaman HTML, bukan
 * gambar, sehingga kalau tidak dikonversi thumbnail-nya kosong.
 */
export function urlFotoLangsung(url: string): string {
  const cocok = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (cocok) return `https://drive.google.com/thumbnail?id=${cocok[1]}&sz=w800`;

  const cocokOpen = url.match(/drive\.google\.com\/open\?id=([^&]+)/);
  if (cocokOpen) return `https://drive.google.com/thumbnail?id=${cocokOpen[1]}&sz=w800`;

  return url;
}
