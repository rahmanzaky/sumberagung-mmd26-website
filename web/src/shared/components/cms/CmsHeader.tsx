import Link from 'next/link';

type Props = {
  judul: string;
  deskripsi: string;
  // Tautan ke halaman publik yang dikelola form ini, mis. "/profil-desa".
  lihatHref?: string;
};

/**
 * Header seragam untuk tiap halaman CMS. Tombol "Lihat Halaman" memberi admin
 * jalan langsung memeriksa hasil editnya di sisi publik — bagian dari alur
 * "ubah → simpan → periksa" di docs/cms-gap-analysis.md.
 */
export default function CmsHeader({ judul, deskripsi, lihatHref }: Props) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <h1 className="font-[var(--font-lora)] text-2xl font-bold text-[var(--color-primary)] mb-1">
          {judul}
        </h1>
        <p className="text-[var(--color-text-muted)] text-sm">{deskripsi}</p>
      </div>
      {lihatHref && (
        <Link
          href={lihatHref}
          target="_blank"
          className="shrink-0 inline-flex items-center gap-1.5 text-sm text-[var(--color-primary)] border border-gray-200 rounded-lg px-3 py-2 hover:border-[var(--color-primary)] hover:bg-[var(--color-surface)] transition-colors"
        >
          Lihat Halaman ↗
        </Link>
      )}
    </div>
  );
}
