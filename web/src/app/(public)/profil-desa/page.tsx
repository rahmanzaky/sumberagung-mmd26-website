import type { Metadata } from 'next';
import ProfilHero from '@/components/public/profil/ProfilHero';
import Sejarah from '@/components/public/profil/Sejarah';
import VisiMisi from '@/components/public/profil/VisiMisi';
import StrukturOrganisasi from '@/components/public/profil/StrukturOrganisasi';
import Geografis from '@/components/public/profil/Geografis';

export const metadata: Metadata = {
  title: 'Profil Desa — Desa Sumberagung',
  description:
    'Sejarah, visi-misi, struktur pemerintahan, serta data geografis dan demografis Desa Sumberagung.',
};

export default function ProfilDesaPage() {
  return (
    <>
      <ProfilHero />
      <Sejarah />
      <VisiMisi />
      <StrukturOrganisasi />
      <Geografis />
    </>
  );
}
