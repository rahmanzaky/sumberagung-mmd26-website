'use client';

type PaginationProps = {
  page: number; // halaman aktif (1-based)
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  /** Kata satuan untuk teks "Menampilkan X–Y dari N {itemLabel}" */
  itemLabel?: string;
};

// Membuat daftar nomor halaman ringkas dengan elipsis: 1 … 4 5 6 … 12
function buildPageList(page: number, totalPages: number): (number | 'ellipsis')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | 'ellipsis')[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);
  if (start > 2) pages.push('ellipsis');
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < totalPages - 1) pages.push('ellipsis');
  pages.push(totalPages);
  return pages;
}

export default function Pagination({
  page,
  totalItems,
  pageSize,
  onPageChange,
  itemLabel = 'data',
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const from = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);
  const pageList = buildPageList(page, totalPages);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4">
      <p className="text-xs text-[var(--color-text-muted)]">
        Menampilkan <span className="font-medium text-[var(--color-text-base)]">{from}</span>–
        <span className="font-medium text-[var(--color-text-base)]">{to}</span> dari{' '}
        <span className="font-medium text-[var(--color-text-base)]">{totalItems}</span> {itemLabel}
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Halaman sebelumnya"
          className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-sm text-[var(--color-text-muted)] hover:border-[var(--color-primary)] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ‹
        </button>

        {pageList.map((p, i) =>
          p === 'ellipsis' ? (
            <span
              key={`e-${i}`}
              className="w-8 h-8 flex items-center justify-center text-xs text-[var(--color-text-muted)]"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              aria-current={p === page ? 'page' : undefined}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-sm transition-colors ${
                p === page
                  ? 'bg-[var(--color-primary)] text-white font-medium'
                  : 'border border-gray-200 text-[var(--color-text-muted)] hover:border-[var(--color-primary)]'
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Halaman berikutnya"
          className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-sm text-[var(--color-text-muted)] hover:border-[var(--color-primary)] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ›
        </button>
      </div>
    </div>
  );
}
