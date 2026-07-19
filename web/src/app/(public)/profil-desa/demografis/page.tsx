import type { Metadata } from 'next';

import DemografisPublicContainer from '@/feature/public/profil-desa/container/DemografisPublicContainer';

export const metadata: Metadata = {
    title: 'Demografis',
    description:
        'Data kependudukan Desa Sumberagung: jumlah penduduk, distribusi usia dan gender, serta tingkat pendidikan.',
};

export default function DemografisPage() {
    return <DemografisPublicContainer />;
}