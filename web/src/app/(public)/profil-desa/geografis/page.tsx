import type { Metadata } from 'next';

import GeografisPublicContainer from '@/feature/public/profil-desa/container/GeografisPublicContainer';

export const metadata: Metadata = {
    title: 'Geografis',
    description:
        'Letak astronomis, topografi, batas wilayah, dan statistik pemanfaatan lahan Desa Sumberagung.',
};

export default function GeografisPage() {
    return <GeografisPublicContainer />;
}