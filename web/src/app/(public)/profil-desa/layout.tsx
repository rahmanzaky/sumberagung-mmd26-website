import type { Metadata } from 'next';

import ProfilDesaShell from '@/feature/public/profil-desa/container/ProfilDesaShell';

export const metadata: Metadata = {
  title: {
    default: 'Profil Desa | Desa Sumberagung',
    template: '%s | Profil Desa Sumberagung',
  },
  description:
    'Identitas Desa Sumberagung: visi dan misi, kondisi demografis, serta gambaran geografis wilayah.',
};

export default function ProfilDesaLayout({ children }: { children: React.ReactNode }) {
  return <ProfilDesaShell>{children}</ProfilDesaShell>;
}
