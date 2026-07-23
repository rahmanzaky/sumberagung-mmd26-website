import { beritaHeader } from '../data';

export default function KepalaBeritaDesa() {
    return (
        <section className="bg-[var(--color-primary-deepdark)] px-4 py-16 text-center sm:px-6 lg:px-8">
            <h1 className="font-serif text-4xl font-bold tracking-[-0.03em] text-[var(--color-accent)] sm:text-5xl lg:text-6xl">
                {beritaHeader.judul}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                {beritaHeader.deskripsi}
            </p>
        </section>
    );
}
