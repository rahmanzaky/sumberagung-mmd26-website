'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/guard';
import type { KependudukanTahun } from './dto';

// Data contoh dipakai selama APPS_SCRIPT_KEPENDUDUKAN_URL belum diisi.
// Angka di bawah ini ILUSTRATIF — ganti dengan data resmi desa sebelum publikasi.
const dummyKependudukan: KependudukanTahun[] = [
  {
    tahun: 2026,
    totalPenduduk: 4364,
    lakiLaki: 2154,
    perempuan: 2210,
    jumlahKK: 1300,
    jumlahRt: 28,
    jumlahRw: 7,
  },
  {
    tahun: 2025,
    totalPenduduk: 4318,
    lakiLaki: 2131,
    perempuan: 2187,
    jumlahKK: 1284,
    jumlahRt: 28,
    jumlahRw: 7,
  },
  {
    tahun: 2024,
    totalPenduduk: 4270,
    lakiLaki: 2108,
    perempuan: 2162,
    jumlahKK: 1265,
    jumlahRt: 27,
    jumlahRw: 7,
  },
];

async function fetchAppsScript<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Apps Script request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

/** Semua tahun, terbaru dulu. */
export async function getKependudukan(): Promise<KependudukanTahun[]> {
  const url = process.env.APPS_SCRIPT_KEPENDUDUKAN_URL;
  const data = url
    ? (await fetchAppsScript<{ data: KependudukanTahun[] }>(url)).data
    : dummyKependudukan;

  return [...data].sort((a, b) => b.tahun - a.tahun);
}

/** Statistik tahun terbaru — dipakai card angka di halaman Home publik (SK-F-02). */
export async function getKependudukanTerbaru(): Promise<KependudukanTahun | null> {
  const semua = await getKependudukan();
  return semua[0] ?? null;
}

export async function simpanKependudukanAction(input: KependudukanTahun) {
  await requireAdmin();

  const url = process.env.APPS_SCRIPT_KEPENDUDUKAN_URL;
  if (!url) {
    console.warn('[dev] simpanKependudukanAction tanpa APPS_SCRIPT_KEPENDUDUKAN_URL — dilewati');
    return;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!res.ok) throw new Error(`Simpan kependudukan gagal: ${res.status}`);
  const json = (await res.json()) as { success: boolean; error?: string };
  if (!json.success) throw new Error(json.error ?? 'Apps Script returned success: false');

  revalidatePath('/dashboard/kependudukan');
  revalidatePath('/'); // card angka di halaman Home ikut diperbarui
}
