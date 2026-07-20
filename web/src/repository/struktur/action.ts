'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/guard';
import { ambilResource, kirimResource } from '@/lib/apps-script';
import { tukarUrutan, urutanBerikutnya } from '@/lib/ordered';
import type { Jabatan, JabatanInput } from './dto';

// Data contoh dipakai selama backend belum dikonfigurasi.
// CATATAN: mockup menulis Slamet Riyadi = Kepala Desa; sebagian data contoh
// modul lain menulis Sutrisno. Angka & nama di sini mengikuti mockup dan perlu
// diverifikasi ke data resmi desa (docs/cms-gap-analysis.md §5).
const dummyStruktur: Jabatan[] = [
  {
    id: 'jb-001',
    namaJabatan: 'BPD',
    namaPejabat: 'Badan Permusyawaratan Desa',
    urlFoto: '',
    level: 1,
    urutan: 1,
  },
  {
    id: 'jb-002',
    namaJabatan: 'Kepala Desa',
    namaPejabat: 'Slamet Riyadi',
    urlFoto: '',
    level: 1,
    urutan: 2,
  },
  {
    id: 'jb-003',
    namaJabatan: 'Sekretaris Desa',
    namaPejabat: 'Dewi Lestari',
    urlFoto: '',
    level: 2,
    urutan: 1,
  },
  {
    id: 'jb-004',
    namaJabatan: 'Kasi Pelayanan',
    namaPejabat: 'Agus Setiawan',
    urlFoto: '',
    level: 3,
    urutan: 1,
  },
  {
    id: 'jb-005',
    namaJabatan: 'Kasi Pemerintahan',
    namaPejabat: 'Andi Pratama',
    urlFoto: '',
    level: 3,
    urutan: 2,
  },
  {
    id: 'jb-006',
    namaJabatan: 'Kasi Kesejahteraan',
    namaPejabat: 'Sutrisno',
    urlFoto: '',
    level: 3,
    urutan: 3,
  },
  {
    id: 'jb-007',
    namaJabatan: 'Kaur Keuangan',
    namaPejabat: 'Rina Wulandari',
    urlFoto: '',
    level: 3,
    urutan: 4,
  },
  {
    id: 'jb-008',
    namaJabatan: 'Kaur Perencanaan',
    namaPejabat: 'Novi Rahmawati',
    urlFoto: '',
    level: 3,
    urutan: 5,
  },
  {
    id: 'jb-009',
    namaJabatan: 'Kaur Tata Usaha dan Umum',
    namaPejabat: 'Lilis Setyowati',
    urlFoto: '',
    level: 3,
    urutan: 6,
  },
  {
    id: 'jb-010',
    namaJabatan: 'Kamituwo Dusun Sumbersoko',
    namaPejabat: 'Budi Santoso',
    urlFoto: '',
    level: 4,
    urutan: 1,
  },
  {
    id: 'jb-011',
    namaJabatan: 'Kamituwo Dusun Panggungwinong',
    namaPejabat: 'Mulyono',
    urlFoto: '',
    level: 4,
    urutan: 2,
  },
];

export async function getStruktur(): Promise<Jabatan[]> {
  const data = await ambilResource<Jabatan[]>('struktur', dummyStruktur);
  // Urut per level dulu, lalu per urutan dalam level.
  return [...data].sort((a, b) => a.level - b.level || a.urutan - b.urutan);
}

async function postStruktur(body: object) {
  await kirimResource('struktur', body);
}

function revalidasi() {
  revalidatePath('/dashboard/struktur');
  revalidatePath('/struktur-organisasi');
}

export async function simpanJabatanAction(input: JabatanInput, id: string | null) {
  await requireAdmin();
  const urutan = id ? input.urutan : urutanBerikutnya(await getStruktur());
  await postStruktur({ aksi: 'simpan', id: id ?? '', ...input, urutan });
  revalidasi();
}

export async function hapusJabatanAction(id: string) {
  await requireAdmin();
  await postStruktur({ aksi: 'hapus', id });
  revalidasi();
}

export async function pindahJabatanAction(id: string, arah: 'naik' | 'turun') {
  await requireAdmin();
  // Pindah hanya menukar urutan DALAM level yang sama, supaya tombol ↑↓ tidak
  // memindah orang lintas tingkatan secara tak sengaja.
  const semua = await getStruktur();
  const ini = semua.find((j) => j.id === id);
  if (!ini) return;
  const seLevel = semua.filter((j) => j.level === ini.level);
  const tukar = tukarUrutan(seLevel, id, arah);
  if (!tukar) return;
  await postStruktur({ aksi: 'simpan', ...tukar.a });
  await postStruktur({ aksi: 'simpan', ...tukar.b });
  revalidasi();
}
