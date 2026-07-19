'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/guard';
import { tukarUrutan, urutanBerikutnya } from '@/lib/ordered';
import type { TimelineEntri, TimelineEntriInput } from './dto';

// Data contoh dipakai selama APPS_SCRIPT_SEJARAH_URL belum diisi.
const dummyTimeline: TimelineEntri[] = [
  {
    id: 'sj-001',
    era: 'Akhir Abad ke-18',
    subjudul: 'Awal Mula',
    narasi:
      'Pasca Perang Diponegoro yang dimenangkan Belanda, sebagian pengikut sang pangeran melarikan diri mencari tempat aman. Dari rombongan itulah Mbah Koncar, tiba di hutan belantara yang kelak menjadi Sumberagung, dan mulai membabat hutan.',
    urlFoto: '',
    sisi: 'kanan',
    urutan: 1,
  },
  {
    id: 'sj-002',
    era: 'Legenda Joko Koncor',
    subjudul: 'Cikal Bakal Desa',
    narasi:
      'Mbah Koncar wafat saat masih perjaka di tengah proses membuka hutan. Warga meyakini Joko Koncar dan Mbah Endran-lah cikal bakal desa; makam keduanya masih dijaga dan dianggap keramat hingga kini.',
    urlFoto: '',
    sisi: 'kiri',
    urutan: 2,
  },
  {
    id: 'sj-003',
    era: '1908',
    subjudul: 'Berdirinya Desa Bambangsoko',
    narasi:
      'Kaki Sopingi bersama rombongan melanjutkan babat hutan. Nama Bambangsoko lahir dari pohon bambang yang tumbuh di sepanjang sungai, dengan Karyotani sebagai kepala desa pertama.',
    urlFoto: '',
    sisi: 'kanan',
    urutan: 3,
  },
  {
    id: 'sj-004',
    era: '1917',
    subjudul: 'Desa Sumberagung',
    narasi:
      'Setelah desa sempat diwarnai kerusuhan dan pencurian, nama diubah menjadi Sumberagung karena banyaknya sumber mata air besar — membawa harapan baru akan desa yang aman dan makmur.',
    urlFoto: '',
    sisi: 'kiri',
    urutan: 4,
  },
];

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Apps Script request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export async function getTimeline(): Promise<TimelineEntri[]> {
  const url = process.env.APPS_SCRIPT_SEJARAH_URL;
  const data = url ? (await fetchJson<{ data: TimelineEntri[] }>(url)).data : dummyTimeline;
  return [...data].sort((a, b) => a.urutan - b.urutan);
}

async function postSejarah(body: unknown) {
  const url = process.env.APPS_SCRIPT_SEJARAH_URL;
  if (!url) {
    console.warn('[dev] postSejarah tanpa APPS_SCRIPT_SEJARAH_URL — dilewati', body);
    return;
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Sejarah request failed: ${res.status}`);
  const json = (await res.json()) as { success: boolean; error?: string };
  if (!json.success) throw new Error(json.error ?? 'Apps Script returned success: false');
}

function revalidasi() {
  revalidatePath('/dashboard/sejarah');
  revalidatePath('/sejarah-desa');
}

export async function simpanTimelineAction(input: TimelineEntriInput, id: string | null) {
  await requireAdmin();
  const urutan = id ? input.urutan : urutanBerikutnya(await getTimeline());
  await postSejarah({ aksi: 'simpan', id: id ?? '', ...input, urutan });
  revalidasi();
}

export async function hapusTimelineAction(id: string) {
  await requireAdmin();
  await postSejarah({ aksi: 'hapus', id });
  revalidasi();
}

export async function pindahTimelineAction(id: string, arah: 'naik' | 'turun') {
  await requireAdmin();
  const tukar = tukarUrutan(await getTimeline(), id, arah);
  if (!tukar) return;
  await postSejarah({ aksi: 'simpan', ...tukar.a });
  await postSejarah({ aksi: 'simpan', ...tukar.b });
  revalidasi();
}
