export default function JudulSubHalaman({
    judul,
    deskripsi,
}: {
    judul: string;
    deskripsi: string;
}) {
    return (
        <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-4xl font-bold tracking-[-0.03em] text-[var(--color-accent)] sm:text-5xl">
                {judul}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/70 sm:text-base">
                {deskripsi}
            </p>
        </div>
    );
}