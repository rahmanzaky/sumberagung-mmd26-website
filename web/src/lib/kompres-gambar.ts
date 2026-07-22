// Kompresi gambar di sisi browser sebelum diunggah ke Drive.
// Tujuan: hemat kuota 15 GB akun Google desa & mempercepat unggah dari HP.
//
// Memakai <canvas>: gambar diperkecil sampai sisi terpanjang <= maxDimensi,
// lalu di-encode ulang jadi JPEG dengan kualitas tertentu. Menangkap foto lewat
// <input capture> umumnya menghasilkan JPEG, jadi HEIC iPhone jarang jadi
// masalah — tetapi jika file HEIC lolos & tak bisa didecode, fungsi melempar.

export type HasilKompres = {
  dataBase64: string; // tanpa prefix data URI
  mimeType: string; // selalu image/jpeg
  namaFile: string;
  ukuranKb: number;
};

function bacaSebagaiDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Gagal membaca berkas gambar.'));
    reader.readAsDataURL(file);
  });
}

function muatGambar(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Format gambar tidak didukung browser (mis. HEIC).'));
    img.src = src;
  });
}

export async function kompresGambar(
  file: File,
  { maxDimensi = 1280, kualitas = 0.7, prefixNama = 'foto' } = {},
): Promise<HasilKompres> {
  const dataUrl = await bacaSebagaiDataUrl(file);
  const img = await muatGambar(dataUrl);

  const skala = Math.min(1, maxDimensi / Math.max(img.width, img.height));
  const w = Math.round(img.width * skala);
  const h = Math.round(img.height * skala);

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Browser tidak mendukung pemrosesan gambar.');
  ctx.drawImage(img, 0, 0, w, h);

  const jpeg = canvas.toDataURL('image/jpeg', kualitas);
  const dataBase64 = jpeg.split(',')[1] ?? '';
  // Perkiraan ukuran byte dari panjang base64 (4 char = 3 byte).
  const ukuranKb = Math.round((dataBase64.length * 3) / 4 / 1024);

  return {
    dataBase64,
    mimeType: 'image/jpeg',
    namaFile: `${prefixNama}-${Date.now()}.jpg`,
    ukuranKb,
  };
}
