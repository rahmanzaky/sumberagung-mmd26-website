import type { Metadata } from 'next';

import PengajuanSuratPublicContainer from '@/feature/public/pengajuan-surat/container/PengajuanSuratPublicContainer';

export const metadata: Metadata = {
  title: 'Pengajuan Surat | Desa Sumberagung',
  description:
    'Ajukan permohonan surat secara online kepada Pemerintah Desa Sumberagung. Dilayani pada jam kerja 08.00-13.00 WIB.',
};

export default function PengajuanSuratPage() {
  return <PengajuanSuratPublicContainer />;
}
