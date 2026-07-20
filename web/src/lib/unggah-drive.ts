// Helper server: teruskan gambar base64 (sudah dikompres di browser) ke Apps
// Script upload endpoint, kembalikan URL Drive. Sheet menyimpan URL ini;
// Drive hanya menyimpan filenya.

export type GambarUnggah = {
  dataBase64: string;
  mimeType: string;
  namaFile: string;
};

/**
 * Mengunggah satu gambar ke Drive lewat APPS_SCRIPT_UPLOAD_URL.
 * Mengembalikan URL Drive, atau string kosong bila endpoint belum dikonfigurasi
 * (mode dev) supaya alur tetap jalan tanpa backend.
 */
export async function unggahGambar(gambar: GambarUnggah): Promise<string> {
  const url = process.env.APPS_SCRIPT_UPLOAD_URL;
  if (!url) {
    console.warn('[dev] unggahGambar tanpa APPS_SCRIPT_UPLOAD_URL — dilewati');
    return '';
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(gambar),
  });

  if (!res.ok) throw new Error(`Unggah gambar gagal: ${res.status}`);
  const json = (await res.json()) as { success: boolean; url?: string; error?: string };
  if (!json.success || !json.url) {
    throw new Error(json.error ?? 'Unggah gambar gagal di Apps Script.');
  }
  return json.url;
}
