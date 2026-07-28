import HeroSliderCmsContainer from '@/feature/admin/hero-slider/container/HeroSliderCmsContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kelola Hero Slider | CMS Desa',
};

export default function HeroSliderPage() {
  return <HeroSliderCmsContainer />;
}
