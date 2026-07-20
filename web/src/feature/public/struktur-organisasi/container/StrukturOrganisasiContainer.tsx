import { kelompokPerangkat, struktur, strukturHeader } from '../data';
import type { Perangkat } from '../types';
import { KartuMendatar, KartuMenegak } from './KartuPerangkat';

/** Warna garis penghubung. Ketebalan diatur lewat w-0.5 / h-0.5. */
const garis = 'bg-[var(--color-accent)]/70';

function GrupKartu({
  anggota,
  varian,
}: {
  anggota: Perangkat[];
  varian: 'menegak' | 'mendatar';
}) {
  const inset = `${100 / (anggota.length * 2)}%`;

  return (
    <div className="relative w-full pt-8">
      <div
        aria-hidden="true"
        style={{ left: inset, right: inset }}
        className={`absolute top-0 h-0.5 ${garis}`}
      />

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${anggota.length}, minmax(0, 1fr))`,
        }}
      >
        {anggota.map((orang) => (
          <div key={orang.id} className="relative flex justify-center">
            <div
              aria-hidden="true"
              className={`absolute -top-8 left-1/2 h-8 w-0.5 -translate-x-1/2 ${garis}`}
            />
            {varian === 'menegak' ? (
              <KartuMenegak data={orang} />
            ) : (
              <KartuMendatar data={orang} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StrukturOrganisasiContainer() {
  return (
    <section className="bg-[var(--color-primary-deepdark)] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      {/* Kepala halaman */}
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="font-serif text-4xl font-bold tracking-[-0.03em] text-[var(--color-accent)] sm:text-5xl lg:text-6xl">
          {strukturHeader.judul}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-white/70">
          {strukturHeader.deskripsi}
        </p>
      </header>

      <div className="mx-auto mt-14 max-w-6xl rounded-xl border border-white/10 bg-[var(--color-primary)]/15 p-6 sm:p-10 lg:mt-20">
        {/* ---------- Bagan untuk layar besar ---------- */}
        <div className="hidden lg:flex lg:flex-col lg:items-center">
          {/* Kepala Desa di tengah, BPD menempel di kiri */}
          <div className="relative flex w-full justify-center">
            <KartuMendatar data={struktur.kepalaDesa} />

            <div className="absolute right-1/2 top-1/2 mr-[120px] flex -translate-y-1/2 items-center">
              <KartuMendatar data={struktur.bpd} />
              <div
                aria-hidden="true"
                className="w-14 border-t-2 border-dashed border-[var(--color-accent)]/70"
              />
            </div>
          </div>

          {/* Turun dari Kepala Desa menuju titik percabangan */}
          <div aria-hidden="true" className={`h-10 w-0.5 ${garis}`} />

          {/* Percabangan: Kasi di kiri, Sekretaris lalu Kaur di kanan */}
          <div className="relative grid w-full grid-cols-2 gap-x-12">
            {/* Tulang punggung menerus di tengah */}
            <div
              aria-hidden="true"
              className={`absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 ${garis}`}
            />
            {/* Palang pemisah dua rumpun */}
            <div
              aria-hidden="true"
              className={`absolute left-1/4 right-1/4 top-0 h-0.5 ${garis}`}
            />

            {/* Rumpun kiri: langsung ke Kasi */}
            <div className="flex flex-col items-center">
              <div
                aria-hidden="true"
                className={`min-h-10 w-0.5 flex-1 ${garis}`}
              />
              <GrupKartu anggota={struktur.kasi} varian="menegak" />
            </div>

            {/* Rumpun kanan: Sekretaris dulu, baru Kaur */}
            <div className="flex flex-col items-center">
              <div aria-hidden="true" className={`h-10 w-0.5 ${garis}`} />
              <KartuMendatar data={struktur.sekretaris} />
              <div
                aria-hidden="true"
                className={`min-h-10 w-0.5 flex-1 ${garis}`}
              />
              <GrupKartu anggota={struktur.kaur} varian="menegak" />
            </div>
          </div>

          {/* Lanjutan tulang punggung menuju Kamituwo */}
          <div aria-hidden="true" className={`h-14 w-0.5 ${garis}`} />

          <div className="w-full max-w-3xl">
            <GrupKartu anggota={struktur.kamituwo} varian="mendatar" />
          </div>
        </div>

        {/* ---------- Daftar bertingkat untuk layar kecil ---------- */}
        <div className="flex flex-col gap-10 lg:hidden">
          {kelompokPerangkat.map((kelompok) => (
            <div key={kelompok.label}>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                {kelompok.label}
              </h2>
              <div className="mt-4 flex flex-col gap-3 border-l-2 border-[var(--color-accent)]/40 pl-4">
                {kelompok.anggota.map((orang) => (
                  <KartuMendatar key={orang.id} data={orang} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}