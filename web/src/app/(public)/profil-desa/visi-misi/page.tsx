import type { Metadata } from 'next';

import VisiMisiPublicContainer from '@/feature/public/profil-desa/container/VisiMisiPublicContainer';

export const metadata: Metadata = {
    title: 'Visi & Misi',
    description:
        'Visi dan misi Pemerintah Desa Sumberagung dalam membangun desa yang berbudaya, mandiri, dan sejahtera.',
};

export default function VisiMisiPage() {
    return <VisiMisiPublicContainer />;
}