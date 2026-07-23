import { muatDaftarBerita } from '../loader';
import BeritaCard from '../container/BeritaCard';

export default async function BeritaGridDinamis() {
    const daftarBerita = await muatDaftarBerita();

    if (daftarBerita.length === 0) {
        return (
            <p className="mt-10 text-center text-sm text-white/60">
                Belum ada berita untuk ditampilkan.
            </p>
        );
    }

    return (
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {daftarBerita.map((item) => (
                <BeritaCard key={item.id} berita={item} />
            ))}
        </div>
    );
}
