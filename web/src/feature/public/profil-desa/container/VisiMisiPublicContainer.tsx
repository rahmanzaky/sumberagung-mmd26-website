import { muatVisiMisi } from '../loader';
import JudulSubHalaman from './JudulSubHalaman';

export default async function VisiMisiPublicContainer() {
    const visiMisi = await muatVisiMisi();

    return (
        <div>
            <JudulSubHalaman judul={visiMisi.judul} deskripsi={visiMisi.deskripsi} />

            <div className="mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-2">
                {/* Kartu visi */}
                <div className="relative overflow-hidden rounded-xl bg-[#0e1938] p-8 sm:p-10">
                    <p className="font-[var(--font-lora)] text-xl font-bold text-[var(--color-accent)]">
                        Visi
                    </p>
                    <blockquote className="mt-6 font-[var(--font-lora)] text-2xl font-bold leading-snug text-white sm:text-3xl">
                        &ldquo;{visiMisi.visi}&rdquo;
                    </blockquote>

                    {/* Lingkaran samar di pojok bawah */}
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-16 -right-10 h-56 w-56 rounded-full border border-[var(--color-accent)]/25"
                    />
                </div>

                {/* Daftar misi */}
                <ol className="flex flex-col gap-5">
                    {visiMisi.misi.map((misi) => (
                        <li
                            key={misi.nomor}
                            className="rounded-xl border-l-4 border-[var(--color-accent)] bg-[#0e1938] px-6 py-5"
                        >
                            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                                {misi.nomor}
                            </p>
                            <p className="mt-3 font-[var(--font-lora)] text-sm leading-relaxed text-white/80">
                                {misi.teks}
                            </p>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}