'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/guard';
import { ambilResource, kirimResource } from '@/lib/apps-script';
import { tukarUrutan, urutanBerikutnya } from '@/lib/ordered';
import type { HeroSliderDTO } from './dto';

// Data contoh dipakai selama backend belum dikonfigurasi.
const dummyHeroSlider: HeroSliderDTO[] = [
  {
    id: 'hs-001',
    judulAwal: 'Sumberagung, Desa yang ',
    judulSorot: 'Tumbuh',
    judulAkhir: ' dari Sumber Kehidupan.',
    deskripsi:
      'Terletak di kaki gunung dengan keindahan alam yang asri. Memadukan kearifan lokal, pelestarian budaya, dan pelayanan publik yang modern untuk kesejahteraan warga.',
    urlGambar: '/latar-sunset.png',
    tombolTeks: 'Ajukan Surat',
    tombolTautan: '/pengajuan-surat',
    urutan: 1,
  },
];

export async function getHeroSlider(): Promise<HeroSliderDTO[]> {
  const data = await ambilResource<HeroSliderDTO[]>('heroSlider', dummyHeroSlider);
  if (!data || !Array.isArray(data)) {
    return [...dummyHeroSlider].sort((a, b) => a.urutan - b.urutan);
  }
  return [...data].sort((a, b) => a.urutan - b.urutan);
}

async function postHeroSlider(body: object) {
  await kirimResource('heroSlider', body);
}

function revalidasi() {
  revalidatePath('/dashboard/hero-slider');
  revalidatePath('/');
}

export async function simpanHeroSliderAction(
  input: Omit<HeroSliderDTO, 'id' | 'urutan'>,
  id: string | null,
) {
  await requireAdmin();
  const urutan = id
    ? (await getHeroSlider()).find((s) => s.id === id)?.urutan || 1
    : urutanBerikutnya(await getHeroSlider());
  await postHeroSlider({ aksi: 'simpan', id: id ?? '', ...input, urutan });
  revalidasi();
}

export async function hapusHeroSliderAction(id: string) {
  await requireAdmin();
  await postHeroSlider({ aksi: 'hapus', id });
  revalidasi();
}

export async function pindahHeroSliderAction(id: string, arah: 'naik' | 'turun') {
  await requireAdmin();
  const tukar = tukarUrutan(await getHeroSlider(), id, arah);
  if (!tukar) return;
  await postHeroSlider({ aksi: 'simpan', ...tukar.a });
  await postHeroSlider({ aksi: 'simpan', ...tukar.b });
  revalidasi();
}
