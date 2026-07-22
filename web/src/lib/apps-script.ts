// Klien tunggal untuk backend Apps Script yang sudah digabung jadi satu Web App.
// Semua modul memanggil endpoint yang sama (APPS_SCRIPT_URL), dibedakan oleh
// parameter/field `resource`. Bila URL kosong (mode dev), pemanggil memakai
// data contoh — website tetap jalan tanpa backend.
//
// PERFORMA: satu panggilan Apps Script ~2.5–3 detik. Dulu tiap GET memakai
// `no-store`, jadi tiap pindah halaman menembak backend berkali-kali (lambat).
// Sekarang GET di-cache per-resource dengan tag; tiap tulis (kirimResource)
// membatalkan tag resource itu, sehingga editan admin tetap langsung tampil
// tanpa membuat pembacaan lain jadi lambat.

import { revalidateTag } from 'next/cache';

const BASE = process.env.APPS_SCRIPT_URL;

// Umur cache maksimal (detik) sebelum data dianggap basi & disegarkan. Sejalan
// dengan SRS SK-NF-04 (jeda maksimal 60 detik). Penulisan tetap menyegarkan
// seketika lewat revalidateTag, jadi angka ini hanya batas atas saat tak ada edit.
const UMUR_CACHE = 60;

/** Tag cache untuk satu resource — dipakai membaca & membatalkan bersama. */
function tag(resource: string) {
  return `apps-script:${resource}`;
}

export function backendAktif(): boolean {
  return !!BASE;
}

/** GET satu resource (di-cache). Mengembalikan `fallback` bila backend kosong. */
export async function ambilResource<T>(resource: string, fallback: T): Promise<T> {
  if (!BASE) return fallback;
  const res = await fetch(`${BASE}?resource=${encodeURIComponent(resource)}`, {
    next: { revalidate: UMUR_CACHE, tags: [tag(resource)] },
  });
  if (!res.ok) throw new Error(`Apps Script GET ${resource} gagal: ${res.status}`);
  const json = (await res.json()) as { data: T };
  return json.data;
}

export type HasilKirim = { success: boolean; id?: string; url?: string; error?: string };

/**
 * POST ke satu resource. Field `resource` disisipkan otomatis. Setelah sukses,
 * cache resource itu dibatalkan agar pembacaan berikutnya melihat data terbaru.
 * Bila backend kosong (mode dev), dilewati dan mengembalikan `{ success: true }`.
 */
export async function kirimResource(resource: string, body: object): Promise<HasilKirim> {
  if (!BASE) {
    console.warn(`[dev] kirim ${resource} tanpa APPS_SCRIPT_URL — dilewati`, body);
    return { success: true };
  }
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resource, ...body }),
  });
  if (!res.ok) throw new Error(`Apps Script POST ${resource} gagal: ${res.status}`);
  const json = (await res.json()) as HasilKirim;
  if (!json.success) throw new Error(json.error ?? 'Apps Script returned success: false');

  // Tandai cache resource ini basi secara app-wide (stale-while-revalidate).
  // 'max' = wajib di Next 16; aman karena kirimResource hanya dipanggil dari
  // Server Action. Halaman yang sedang diedit tetap langsung segar lewat
  // revalidatePath di masing-masing action.
  revalidateTag(tag(resource), 'max');
  return json;
}
