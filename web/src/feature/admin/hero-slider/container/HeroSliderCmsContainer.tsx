import {
  getHeroSlider,
  simpanHeroSliderAction,
  hapusHeroSliderAction,
  pindahHeroSliderAction,
} from '@/repository/hero-slider/action';
import CmsHeader from '@/shared/components/cms/CmsHeader';
import HeroSliderManager from '../component/HeroSliderManager';

export default async function HeroSliderCmsContainer() {
  const data = await getHeroSlider();

  return (
    <div>
      <CmsHeader
        judul="Hero Slider"
        deskripsi="Kelola gambar dan teks untuk slider di bagian paling atas (hero) halaman utama. Gunakan ↑ ↓ untuk mengatur urutan."
        lihatHref="/"
      />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <HeroSliderManager
          data={data}
          onSimpan={simpanHeroSliderAction}
          onHapus={hapusHeroSliderAction}
          onPindah={pindahHeroSliderAction}
        />
      </div>
    </div>
  );
}
