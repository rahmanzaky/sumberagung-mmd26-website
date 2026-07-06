import Link from 'next/link';

export default function ProfilHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-primary-dark)] text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-primary-light)]" />
      <div className="absolute top-8 right-8 w-40 h-40 rounded-full bg-[var(--color-accent)] opacity-10 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-20">
        <nav className="text-sm text-[var(--color-accent-light)] mb-4 flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">
            Beranda
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-white">Profil Desa</span>
        </nav>
        <h1 className="font-[var(--font-lora)] text-4xl md:text-5xl font-bold mb-3">Profil Desa</h1>
        <p className="text-[var(--color-accent-light)] max-w-2xl text-lg">
          Mengenal lebih dekat sejarah, visi-misi, dan struktur pemerintahan Desa Sumberagung.
        </p>
      </div>
    </section>
  );
}
