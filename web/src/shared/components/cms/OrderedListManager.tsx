'use client';

import { useState, useTransition, type ReactNode } from 'react';
import Button from '@/shared/components/ui/Button';
import Spinner from '@/shared/components/ui/Spinner';

// Item apa pun yang punya id + urutan.
export type ItemBerurut = { id: string; urutan: number };

type Props<T extends ItemBerurut, TInput> = {
  data: T[];
  labelTambah: string;
  kosong: () => TInput; // draft untuk item baru
  keItem: (draft: TInput, item: T) => TInput; // isi draft dari item saat "Ubah"
  onSimpan: (draft: TInput, id: string | null) => Promise<void>;
  onHapus: (id: string) => Promise<void>;
  onPindah: (id: string, arah: 'naik' | 'turun') => Promise<void>;
  // Render baris ringkas di daftar (mode baca).
  barisRingkas: (item: T) => ReactNode;
  // Render isi form (mode tambah/ubah). draft + setter disediakan manager.
  renderForm: (draft: TInput, setDraft: (d: TInput) => void) => ReactNode;
  // Validasi opsional sebelum simpan.
  validasi?: (draft: TInput) => string | null;
};

/**
 * Manajer daftar berurut (Pola B) dipakai lintas modul CMS: Misi, Sejarah,
 * Struktur Organisasi. Menangani tambah/ubah/hapus + tombol naik/turun untuk
 * urutan, sehingga tiap modul cukup mendefinisikan tampilan baris & form-nya.
 */
export default function OrderedListManager<T extends ItemBerurut, TInput>({
  data,
  labelTambah,
  kosong,
  keItem,
  onSimpan,
  onHapus,
  onPindah,
  barisRingkas,
  renderForm,
  validasi,
}: Props<T, TInput>) {
  const [draft, setDraft] = useState<TInput | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const urut = [...data].sort((a, b) => a.urutan - b.urutan);

  function jalankan(fn: () => Promise<void>) {
    setError(null);
    startTransition(async () => {
      try {
        await fn();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
      }
    });
  }

  function simpan() {
    if (draft === null) return;
    const gagal = validasi?.(draft);
    if (gagal) {
      setError(gagal);
      return;
    }
    jalankan(async () => {
      await onSimpan(draft, editId);
      setDraft(null);
      setEditId(null);
    });
  }

  return (
    <div>
      {error && (
        <p className="mb-4 text-xs bg-red-50 border border-red-200 text-red-700 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {draft === null && (
        <div className="mb-4">
          <Button
            onClick={() => {
              setDraft(kosong());
              setEditId(null);
              setError(null);
            }}
          >
            {labelTambah}
          </Button>
        </div>
      )}

      {draft !== null && (
        <div className="mb-6 border border-gray-200 rounded-xl p-4 bg-[var(--color-surface)]">
          <h3 className="text-sm font-semibold text-[var(--color-text-base)] mb-3">
            {editId ? 'Ubah' : 'Tambah'}
          </h3>
          {renderForm(draft, setDraft)}
          <div className="flex items-center gap-2 mt-4">
            <Button onClick={simpan} disabled={isPending}>
              {isPending ? <Spinner /> : 'Simpan'}
            </Button>
            <button
              type="button"
              onClick={() => {
                setDraft(null);
                setEditId(null);
                setError(null);
              }}
              className="text-sm text-[var(--color-text-muted)] hover:underline"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {urut.length === 0 ? (
        <p className="text-sm text-[var(--color-text-muted)] italic py-8 text-center border border-gray-100 rounded-xl">
          Belum ada data.
        </p>
      ) : (
        <ul className="space-y-2">
          {urut.map((item, i) => (
            <li
              key={item.id}
              className="border border-gray-100 rounded-xl p-3 flex items-start justify-between gap-3 bg-white"
            >
              <div className="min-w-0 flex-1">{barisRingkas(item)}</div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => jalankan(() => onPindah(item.id, 'naik'))}
                  disabled={isPending || i === 0}
                  title="Naikkan"
                  className="w-7 h-7 rounded-md text-[var(--color-text-muted)] hover:bg-gray-100 disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  onClick={() => jalankan(() => onPindah(item.id, 'turun'))}
                  disabled={isPending || i === urut.length - 1}
                  title="Turunkan"
                  className="w-7 h-7 rounded-md text-[var(--color-text-muted)] hover:bg-gray-100 disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  onClick={() => {
                    setDraft(keItem(kosong(), item));
                    setEditId(item.id);
                    setError(null);
                  }}
                  disabled={isPending}
                  className="text-xs text-[var(--color-primary)] hover:underline disabled:opacity-50 px-2"
                >
                  Ubah
                </button>
                <button
                  onClick={() => jalankan(() => onHapus(item.id))}
                  disabled={isPending}
                  className="text-xs text-red-600 hover:underline disabled:opacity-50 px-1"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
