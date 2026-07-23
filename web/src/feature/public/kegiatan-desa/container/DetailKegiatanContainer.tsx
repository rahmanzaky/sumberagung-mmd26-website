import { Suspense } from 'react';
import DetailKegiatanDinamis from '../component/DetailKegiatanDinamis';
import DetailKegiatanSkeleton from '../component/DetailKegiatanSkeleton';

export default function DetailKegiatanContainer({ id }: { id: string }) {
    return (
        <Suspense fallback={<DetailKegiatanSkeleton />}>
            <DetailKegiatanDinamis id={id} />
        </Suspense>
    );
}
