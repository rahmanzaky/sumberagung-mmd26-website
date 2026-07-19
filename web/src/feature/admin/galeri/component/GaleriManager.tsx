'use client';

import { useState, useTransition } from 'react';
import type { FotoGaleri, FotoGaleriInput } from '@/repository/galeri/dto';
import { KATEGORI_GALERI, urlFotoLangsung } from '@/repository/galeri/dto';
import Button from '@/shared/components/ui/Button';
import Spinner from '@/shared/components/ui/Spinner';

function formatTanggal(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function fotoKosong(): FotoGaleriInput {
  return { id: '', judul: '', urlFoto: '', kategori: KATEGORI_GALERI[0] };
}

type Props = {
  data: FotoGaleri[];
  onSimpan: (input: FotoGaleriInput) => Promise<void>;
  onHapus: (id: string) => Promise<void>;
};

export default function GaleriManager({ data, onSimpan, onHapus }: Props) {
  const [form, setForm] = useState<FotoGaleriInput | null>(null);
  const [filterKategori, setFilterKategori] = useState<string>('Semua');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const kategoriAda = [...new Set(data.map((f) => f.kategori))];
  const filtered =
    filterKategori === 'Semua' ? data : data.filter((f) => f.kategori === filterKategori);

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

  function submit() {
    if (!form) return;
    if (!form.judul.trim()) {
      setError('Judul foto wajib diisi.');
      return;
    }
    if (!form.urlFoto.trim()) {
      setError('URL foto wajib diisi.');
      return;
    }
    jalankan(async () => {
      await onSimpan(form);
      setForm(null);
    });
  }

  return (
    <div>
      {error && (
        <p className="mb-4 text-xs bg-red-50 border border-red-200 text-red-700 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          {['Semua', ...kategoriAda].map((k) => (
            <button
              key={k}
              onClick={() => setFilterKategori(k)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filterKategori === k
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-white border border-gray-200 text-[var(--color-text-muted)] hover:border-[var(--color-primary)]'
              }`}
            >
              {k}
              <span className="ml-1.5 opacity-70">
                ({k === 'Semua' ? data.length : data.filter((f) => f.kategori === k).length})
              </span>
            </button>
          ))}
        </div>

        {!form && (
          <Button
            onClick={() => {
              setForm(fotoKosong());
              setError(null);
            }}
          >
            + Tambah Foto
          </Button>
        )}
      </div>

      {form && (
        <div className="mb-6 border border-gray-200 rounded-xl p-4 bg-[var(--color-surface)]">
          <h3 className="text-sm font-semibold text-[var(--color-text-base)] mb-3">
            Tambah Foto Kegiatan
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="text-xs font-medium text-[var(--color-text-muted)]">Judul Foto</span>
              <input
                type="text"
                value={form.judul}
                onChange={(e) => setForm({ ...form, judul: e.target.value })}
                className="mt-1 w-full text-sm border border-gray-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[var(--color-text-muted)]">Kategori</span>
              <select
                value={form.kategori}
                onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                className="mt-1 w-full text-sm border border-gray-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              >
                {KATEGORI_GALERI.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="text-xs font-medium text-[var(--color-text-muted)]">
                URL Foto (Google Drive)
              </span>
              <input
                type="url"
                value={form.urlFoto}
                onChange={(e) => setForm({ ...form, urlFoto: e.target.value })}
                placeholder="https://drive.google.com/file/d/.../view"
                className="mt-1 w-full text-sm border border-gray-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
              <span className="text-[10px] text-[var(--color-text-muted)]">
                Pastikan file di Drive di-set &quot;Anyone with the link can view&quot;, kalau tidak
                foto tidak akan tampil di halaman publik.
              </span>
            </label>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Button onClick={submit} disabled={isPending}>
              {isPending ? <Spinner /> : 'Simpan'}
            </Button>
            <button
              type="button"
              onClick={() => {
                setForm(null);
                setError(null);
              }}
              className="text-sm text-[var(--color-text-muted)] hover:underline"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-sm text-[var(--color-text-muted)] italic py-8 text-center border border-gray-100 rounded-xl">
          Belum ada foto untuk kategori ini.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((foto) => (
            <figure
              key={foto.id}
              className="border border-gray-100 rounded-xl overflow-hidden bg-white group"
            >
              <div className="aspect-video bg-[var(--color-surface-dark)] flex items-center justify-center overflow-hidden">
                {foto.urlFoto ? (
                  // eslint-disable-next-line @next/next/no-img-element -- URL Google Drive bersifat dinamis, tidak bisa dikonfigurasi di next.config images.remotePatterns
                  <img
                    src={urlFotoLangsung(foto.urlFoto)}
                    alt={foto.judul}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl opacity-30" aria-hidden>
                    🖼️
                  </span>
                )}
              </div>
              <figcaption className="p-3">
                <p
                  className="text-sm font-medium text-[var(--color-text-base)] truncate"
                  title={foto.judul}
                >
                  {foto.judul}
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {foto.kategori} · {formatTanggal(foto.tanggalUnggah)}
                </p>
                <button
                  onClick={() => jalankan(() => onHapus(foto.id))}
                  disabled={isPending}
                  className="mt-2 text-xs text-red-600 hover:underline disabled:opacity-50"
                >
                  Hapus
                </button>
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      <p className="mt-4 text-xs text-[var(--color-text-muted)]">
        Menampilkan {filtered.length} dari {data.length} foto
      </p>
    </div>
  );
}
