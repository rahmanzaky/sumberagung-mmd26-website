'use client';

import { useRef, useState, useTransition } from 'react';
import { kompresGambar } from '@/lib/kompres-gambar';
import { urlFotoLangsung } from '@/lib/foto';
import { unggahFotoAction } from '@/repository/upload/action';
import Spinner from '@/shared/components/ui/Spinner';

type Props = {
  label: string;
  value: string; // URL Drive tersimpan
  onChange: (url: string) => void;
  prefixNama?: string; // untuk nama file, mis. "galeri"
  hint?: string;
};

/**
 * Field foto CMS: unggah dari perangkat (kompres di browser → Drive) ATAU
 * tempel URL manual. Menyimpan URL Drive, bukan filenya — Sheet tetap database.
 */
export default function ImageUploadField({
  label,
  value,
  onChange,
  prefixNama = 'foto',
  hint,
}: Props) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  function pilih(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    startTransition(async () => {
      try {
        const hasil = await kompresGambar(file, { prefixNama });
        const url = await unggahFotoAction({
          dataBase64: hasil.dataBase64,
          mimeType: hasil.mimeType,
          namaFile: hasil.namaFile,
          publik: true,
        });
        // Dev tanpa endpoint mengembalikan '' — beri pesan, jangan hapus nilai lama.
        if (!url) {
          setError('Endpoint upload belum dikonfigurasi (mode dev). URL tidak berubah.');
          return;
        }
        onChange(url);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal mengunggah foto.');
      }
    });
  }

  return (
    <div className="block">
      <span className="text-xs font-medium text-[var(--color-text-muted)]">{label}</span>
      <div className="mt-1 flex items-start gap-3">
        <div className="w-16 h-16 shrink-0 rounded-md border border-gray-200 bg-[var(--color-surface-dark)] overflow-hidden flex items-center justify-center">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element -- URL Drive dinamis, tidak bisa diatur di next.config
            <img
              src={urlFotoLangsung(value)}
              alt="Pratinjau"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-[10px] text-[var(--color-text-muted)]">kosong</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <input ref={inputRef} type="file" accept="image/*" onChange={pilih} className="hidden" />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={isPending}
              className="text-xs px-3 py-1.5 rounded-md border border-gray-200 hover:border-[var(--color-primary)] hover:bg-[var(--color-surface)] disabled:opacity-50 inline-flex items-center gap-1.5"
            >
              {isPending ? <Spinner /> : '⬆ Unggah Foto'}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                disabled={isPending}
                className="text-xs text-red-600 hover:underline disabled:opacity-50"
              >
                Hapus
              </button>
            )}
          </div>
          {/* Fallback: tempel URL manual (mis. sudah diunggah ke Drive sendiri). */}
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="atau tempel URL Drive…"
            className="mt-2 w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
          {hint && <p className="mt-1 text-[10px] text-[var(--color-text-muted)]">{hint}</p>}
          {error && <p className="mt-1 text-[10px] text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
