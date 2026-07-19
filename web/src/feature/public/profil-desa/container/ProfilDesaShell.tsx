import { profilHeader } from '../data';
import ProfilDesaTabs from './ProfilDesaTabs';

/** Bintang samar sebagai latar kepala halaman. */
function BintangLatar() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      className="pointer-events-none absolute left-1/2 top-0 w-[420px] -translate-x-1/2 text-white/[0.04]"
    >
      <circle cx="100" cy="100" r="88" fill="currentColor" />
      <path
        d="M100 34l16.5 41.6 44.7 2.9-34.5 28.6 11.2 43.4L100 126.6l-37.9 23.9 11.2-43.4-34.5-28.6 44.7-2.9z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ProfilDesaShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-primary-deepdark)] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <BintangLatar />

      <div className="relative">
        <header className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl font-bold tracking-[-0.03em] text-white/90 sm:text-5xl lg:text-6xl">
            {profilHeader.judul}
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-[var(--font-lora)] text-sm leading-relaxed text-white/60 sm:text-base">
            {profilHeader.deskripsi}
          </p>
        </header>

        <ProfilDesaTabs />

        <div className="mt-14 lg:mt-16">{children}</div>
      </div>
    </section>
  );
}