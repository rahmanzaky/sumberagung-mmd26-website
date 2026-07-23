import Link from 'next/link';
import { berita, idBagianKegiatan, kegiatan } from '../data';
import { muatKontenDinamis } from '../loader';
import KartuBerita from '../container/KartuBerita';
import KartuKegiatan from '../container/KartuKegiatan';
import Karusel from '../container/Karusel';

function IkonPanahKanan({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

const lebarKartu = 'w-[80vw] shrink-0 snap-start sm:w-[46vw] lg:w-[368px]';

export default async function BerandaKontenDinamis() {
  const kontenPublik = await muatKontenDinamis();

  const daftarKegiatanDinamis = kontenPublik.filter((k) => k.jenis === 'kegiatan');
  const daftarBeritaDinamis = kontenPublik.filter((k) => k.jenis === 'berita');

  return (
    <>
      {/* ---------- Kegiatan ---------- */}
      <section
        id={idBagianKegiatan}
        className="scroll-mt-24 bg-[var(--color-primary)] px-6 py-20 sm:px-8 lg:px-12 lg:pt-24"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="font-serif text-4xl font-bold leading-tight tracking-[-0.02em] sm:text-5xl">
            <span className="block text-white">{kegiatan.judulAtas}</span>
            <span className="block text-[var(--color-accent)]">
              {kegiatan.judulBawah}
            </span>
          </h2>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
            {kegiatan.deskripsi}
          </p>

          <Karusel label="Galeri kegiatan desa, dapat digeser ke samping">
            {daftarKegiatanDinamis.map((item) => (
              <li key={item.slug} data-kartu className={lebarKartu}>
                <KartuKegiatan data={item} />
              </li>
            ))}
          </Karusel>
        </div>
      </section>

      {/* ---------- Berita ---------- */}
      <section className="bg-[var(--color-primary)] px-6 pb-20 sm:px-8 lg:px-12 lg:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
              {berita.judul}
            </h2>

            <Link
              href="/berita-desa"
              className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            >
              Lihat Semua Berita
              <IkonPanahKanan className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
            </Link>
          </div>

          <Karusel label="Berita desa terbaru, dapat digeser ke samping">
            {daftarBeritaDinamis.map((item) => (
              <li key={item.slug} data-kartu className={lebarKartu}>
                <KartuBerita data={item} />
              </li>
            ))}
          </Karusel>
        </div>
      </section>
    </>
  );
}
