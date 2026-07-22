// Klien tunggal untuk backend Apps Script yang sudah digabung jadi satu Web App.
// Semua modul memanggil endpoint yang sama (APPS_SCRIPT_URL), dibedakan oleh
// parameter/field `resource`. Bila URL kosong (mode dev), pemanggil memakai
// data contoh — website tetap jalan tanpa backend.

const BASE = process.env.APPS_SCRIPT_URL;
const TOKEN = process.env.APPS_SCRIPT_TOKEN;

export function backendAktif(): boolean {
  return !!BASE;
}

type OpsiAmbil = {
  /**
   * Detik penyegaran cache. Diisi untuk halaman publik agar tidak
   * memanggil Apps Script pada setiap kunjungan. Dikosongkan untuk
   * halaman admin yang butuh data terbaru.
   */
  revalidate?: number;
};

/** GET satu resource. Mengembalikan `fallback` bila backend belum dikonfigurasi. */
export async function ambilResource<T>(
  resource: string,
  fallback: T,
  opsi: OpsiAmbil = {},
): Promise<T> {
  if (!BASE) return fallback;

  const url = new URL(BASE);
  url.searchParams.set('resource', resource);
  if (TOKEN) url.searchParams.set('token', TOKEN);

  const res = await fetch(url.toString(), {
    ...(opsi.revalidate
      ? { next: { revalidate: opsi.revalidate } }
      : { cache: 'no-store' as const }),
  });

  if (!res.ok) throw new Error(`Apps Script GET ${resource} gagal: ${res.status}`);

  const json = (await res.json()) as { data: T };
  return json.data;
}

export type HasilKirim = { success: boolean; id?: string; url?: string; error?: string };

/**
 * POST ke satu resource. Field `resource` disisipkan otomatis.
 * Bila backend belum dikonfigurasi, dilewati (mode dev) dan mengembalikan
 * `{ success: true }` supaya alur UI tidak error.
 */
export async function kirimResource(resource: string, body: object): Promise<HasilKirim> {
  if (!BASE) {
    console.warn(`[dev] kirim ${resource} tanpa APPS_SCRIPT_URL — dilewati`, body);
    return { success: true };
  }

  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resource, ...(TOKEN ? { token: TOKEN } : {}), ...body }),
  });

  if (!res.ok) throw new Error(`Apps Script POST ${resource} gagal: ${res.status}`);

  const json = (await res.json()) as HasilKirim;
  if (!json.success) throw new Error(json.error ?? 'Apps Script returned success: false');
  return json;
}