import { berita, idBagianKegiatan, kegiatan } from '../data';
import Karusel from '../container/Karusel';

const lebarKartu = 'w-[80vw] shrink-0 snap-start sm:w-[46vw] lg:w-[368px]';

export default function BerandaKontenSkeleton() {
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
            {[1, 2, 3].map((item) => (
              <li key={item} data-kartu className={lebarKartu}>
                <div className="flex h-80 flex-col justify-end overflow-hidden rounded-lg bg-white/5 p-6 animate-pulse">
                  <div className="h-4 w-1/3 rounded bg-white/10 mb-2" />
                  <div className="h-6 w-2/3 rounded bg-white/10" />
                </div>
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
            <div className="h-4 w-32 rounded bg-white/5 animate-pulse" />
          </div>

          <Karusel label="Berita desa terbaru, dapat digeser ke samping">
            {[1, 2, 3].map((item) => (
              <li key={item} data-kartu className={lebarKartu}>
                 <div className="group flex h-[420px] flex-col overflow-hidden rounded-lg bg-[var(--color-primary-dark)]/60 p-5 ring-1 ring-white/10 animate-pulse">
                   <div className="relative mb-5 h-48 w-full shrink-0 overflow-hidden rounded-md bg-white/5" />
                   <div className="h-3 w-1/4 rounded bg-white/10 mb-3" />
                   <div className="h-5 w-3/4 rounded bg-white/10 mb-2" />
                   <div className="h-5 w-1/2 rounded bg-white/10" />
                 </div>
              </li>
            ))}
          </Karusel>
        </div>
      </section>
    </>
  );
}
