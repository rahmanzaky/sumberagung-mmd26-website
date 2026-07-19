'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/guard';
import { getKvContent, postKvContent } from '@/lib/kv-content';
import { tukarUrutan, urutanBerikutnya } from '@/lib/ordered';
import type { Misi, MisiInput, ProfilVisi } from './dto';
import { PROFIL_VISI_DEFAULT } from './dto';

// Data contoh dipakai selama APPS_SCRIPT_PROFIL_URL belum diisi.
const dummyMisi: Misi[] = [
  {
    id: 'ms-001',
    teks: 'Melestarikan kearifan lokal dan tradisi leluhur sebagai pondasi identitas desa di tengah arus modernisasi.',
    urutan: 1,
  },
  {
    id: 'ms-002',
    teks: 'Meningkatkan kemandirian ekonomi masyarakat melalui optimalisasi potensi agrikultur dan pariwisata berkelanjutan.',
    urutan: 2,
  },
  {
    id: 'ms-003',
    teks: 'Menyelenggarakan tata kelola pemerintahan desa yang transparan, akuntabel, dan berbasis pelayanan publik prima.',
    urutan: 3,
  },
];

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Apps Script request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

// --- Visi (record tunggal) ---

export async function getProfilVisi(): Promise<ProfilVisi> {
  return getKvContent(process.env.APPS_SCRIPT_PROFIL_VISI_URL, PROFIL_VISI_DEFAULT);
}

export async function simpanProfilVisiAction(input: ProfilVisi) {
  await requireAdmin();
  await postKvContent(process.env.APPS_SCRIPT_PROFIL_VISI_URL, input);
  revalidatePath('/dashboard/profil');
  revalidatePath('/profil-desa');
}

// --- Misi (daftar berurut) ---

export async function getMisi(): Promise<Misi[]> {
  const url = process.env.APPS_SCRIPT_MISI_URL;
  const data = url ? (await fetchJson<{ data: Misi[] }>(url)).data : dummyMisi;
  return [...data].sort((a, b) => a.urutan - b.urutan);
}

async function postMisi(body: unknown) {
  const url = process.env.APPS_SCRIPT_MISI_URL;
  if (!url) {
    console.warn('[dev] postMisi tanpa APPS_SCRIPT_MISI_URL — dilewati', body);
    return;
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Misi request failed: ${res.status}`);
  const json = (await res.json()) as { success: boolean; error?: string };
  if (!json.success) throw new Error(json.error ?? 'Apps Script returned success: false');
}

function revalidasiProfil() {
  revalidatePath('/dashboard/profil');
  revalidatePath('/profil-desa');
}

export async function simpanMisiAction(input: MisiInput, id: string | null) {
  await requireAdmin();
  // id null = tambah; urutan item baru = paling bawah.
  const urutan = id ? input.urutan : urutanBerikutnya(await getMisi());
  await postMisi({ aksi: 'simpan', id: id ?? '', ...input, urutan });
  revalidasiProfil();
}

export async function hapusMisiAction(id: string) {
  await requireAdmin();
  await postMisi({ aksi: 'hapus', id });
  revalidasiProfil();
}

export async function pindahMisiAction(id: string, arah: 'naik' | 'turun') {
  await requireAdmin();
  const tukar = tukarUrutan(await getMisi(), id, arah);
  if (!tukar) return;
  await postMisi({ aksi: 'simpan', ...tukar.a });
  await postMisi({ aksi: 'simpan', ...tukar.b });
  revalidasiProfil();
}
