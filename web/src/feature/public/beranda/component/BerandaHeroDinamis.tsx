import { getHeroSlider } from '@/repository/hero-slider/action';
import BerandaHero from '../container/BerandaHero';
import { hero as staticHeroData } from '../data';
import type { HeroSliderDTO } from '@/repository/hero-slider/dto';

export default async function BerandaHeroDinamis() {
  let slides: HeroSliderDTO[] = [];
  try {
    slides = await getHeroSlider();
  } catch (error) {
    console.error('Gagal mengambil data hero slider:', error);
  }

  // Fallback to static data if CMS is empty or error
  if (!slides || slides.length === 0) {
    slides = [
      {
        id: 'fallback-static',
        judulAwal: staticHeroData.judulAwal,
        judulSorot: staticHeroData.judulSorot,
        judulAkhir: staticHeroData.judulAkhir,
        deskripsi: staticHeroData.deskripsi,
        urlGambar: staticHeroData.gambar.src,
        tombolTeks: staticHeroData.tombolUtama.label,
        tombolTautan: staticHeroData.tombolUtama.href,
        urutan: 1,
      },
    ];
  }

  return <BerandaHero slides={slides} />;
}
