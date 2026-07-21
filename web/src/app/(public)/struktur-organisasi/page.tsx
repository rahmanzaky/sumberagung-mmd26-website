import type { Metadata } from 'next';

import StrukturOrganisasiPublicContainer from '@/feature/public/struktur-organisasi/container/StrukturOrganisasiContainer';

export const metadata: Metadata = {
  title: 'Struktur Organisasi | Desa Sumberagung',
  description:
    'Susunan pemerintahan dan perangkat Desa Sumberagung, dari Kepala Desa hingga Kamituwo.',
};

// Konten dari CMS; segarkan tiap 60 detik (SRS SK-NF-04).
export const revalidate = 60;

export default function StrukturOrganisasiPage() {
  return <StrukturOrganisasiPublicContainer />;
}
