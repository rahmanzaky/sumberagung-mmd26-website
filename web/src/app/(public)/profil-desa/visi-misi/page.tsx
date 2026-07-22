import type { Metadata } from 'next';

import VisiMisiPublicContainer from '@/feature/public/profil-desa/container/VisiMisiPublicContainer';

export const metadata: Metadata = {
  title: 'Visi & Misi',
  description:
    'Visi dan misi Pemerintah Desa Sumberagung dalam membangun desa yang berbudaya, mandiri, dan sejahtera.',
};

// Konten dari CMS; segarkan tiap 60 detik (SRS SK-NF-04).
export const revalidate = 60;

export default function VisiMisiPage() {
  return <VisiMisiPublicContainer />;
}
