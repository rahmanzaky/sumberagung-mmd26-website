import { Suspense } from 'react';
import KepalaBeritaDesa from './KepalaBeritaDesa';
import DetailBeritaDinamis from '../component/DetailBeritaDinamis';
import DetailBeritaSkeleton from '../component/DetailBeritaSkeleton';

export default function DetailBeritaContainer({ id }: { id: string }) {
    return (
        <>
            <KepalaBeritaDesa />
            <Suspense fallback={<DetailBeritaSkeleton />}>
                <DetailBeritaDinamis id={id} />
            </Suspense>
        </>
    );
}
