'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/guard';
import { getKvContent, postKvContent } from '@/lib/kv-content';
import { ambilResource, kirimResource } from '@/lib/apps-script';
import { tukarUrutan, urutanBerikutnya } from '@/lib/ordered';
import type { Misi, MisiInput, ProfilVisi } from './dto';
import { PROFIL_VISI_DEFAULT } from './dto';

// Data contoh dipakai selama backend belum dikonfigurasi.
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

// --- Visi (record tunggal) ---

export async function getProfilVisi(): Promise<ProfilVisi> {
  return getKvContent('profilVisi', PROFIL_VISI_DEFAULT);
}

export async function simpanProfilVisiAction(input: ProfilVisi) {
  await requireAdmin();
  await postKvContent('profilVisi', input);
  revalidatePath('/dashboard/profil');
  revalidatePath('/profil-desa');
}

// --- Misi (daftar berurut) ---

export async function getMisi(): Promise<Misi[]> {
  const data = await ambilResource<Misi[]>('misi', dummyMisi);
  const arr = Array.isArray(data) ? data : dummyMisi;
  return [...arr].sort((a, b) => a.urutan - b.urutan);
}

async function postMisi(body: object) {
  await kirimResource('misi', body);
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
