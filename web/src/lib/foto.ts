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
