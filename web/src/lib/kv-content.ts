// Helper untuk konten "satu record" yang disimpan sebagai sheet kunci-nilai
// (Beranda, Geografi, Profil-visi, Pengaturan). Menyatukan pola fetch + overlay
// di atas default supaya tidak diulang di tiap modul.

async function fetchKv<T>(url: string): Promise<Partial<T>> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Apps Script request failed: ${res.status}`);
  const json = (await res.json()) as { data: Partial<T> };
  return json.data;
}

/**
 * Ambil satu record kunci-nilai. Nilai dari sheet ditimpa DI ATAS default,
 * jadi kunci yang belum pernah diisi tetap punya nilai wajar dan menambah
 * kunci baru di kode tidak membuat halaman kosong.
 */
export async function getKvContent<T extends object>(
  envUrl: string | undefined,
  fallback: T,
): Promise<T> {
  if (!envUrl) return fallback;
  const data = await fetchKv<T>(envUrl);
  return { ...fallback, ...data };
}

/** Kirim record kunci-nilai (POST). Melempar jika Apps Script balas gagal. */
export async function postKvContent(envUrl: string | undefined, body: object): Promise<void> {
  if (!envUrl) {
    console.warn('[dev] postKvContent tanpa URL Apps Script — dilewati', body);
    return;
  }

  const res = await fetch(envUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`Simpan konten gagal: ${res.status}`);
  const json = (await res.json()) as { success: boolean; error?: string };
  if (!json.success) throw new Error(json.error ?? 'Apps Script returned success: false');
}
