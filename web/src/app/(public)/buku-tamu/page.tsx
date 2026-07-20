import type { Metadata } from 'next';

import BukuTamuPublicContainer from '@/feature/public/buku-tamu/container/BukuTamuPublicContainer';

export const metadata: Metadata = {
  title: 'Buku Tamu | Desa Sumberagung',
  description: 'Isi buku tamu digital Pemerintah Desa Sumberagung untuk mencatat kunjungan Anda.',
};

export default function BukuTamuPage() {
  return <BukuTamuPublicContainer />;
}
