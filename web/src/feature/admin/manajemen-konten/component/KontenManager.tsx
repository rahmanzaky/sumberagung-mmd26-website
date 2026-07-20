'use client';

import { useState, useTransition } from 'react';
import type { Konten, KontenInput, StatusKonten } from '@/repository/konten/dto';
import { KATEGORI_KONTEN } from '@/repository/konten/dto';
import Badge from '@/shared/components/ui/Badge';
import Button from '@/shared/components/ui/Button';
import Spinner from '@/shared/components/ui/Spinner';
import ImageUploadField from '@/shared/components/cms/ImageUploadField';

const TH =
  'px-4 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider';

function formatTanggal(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function kontenKosong(): KontenInput {
  return {
    id: '',
    judul: '',
    deskripsi: '',
    tanggalKegiatan: new Date().toLocaleDateString('en-CA'),
    kategori: KATEGORI_KONTEN[0],
    urlFoto: '',
    status: 'Tampil',
  };
}

type Props = {
  data: Konten[];
  onSimpan: (input: KontenInput) => Promise<void>;
  onHapus: (id: string) => Promise<void>;
  onToggleStatus: (id: string, status: StatusKonten) => Promise<void>;
};

export default function KontenManager({ data, onSimpan, onHapus, onToggleStatus }: Props) {
  const [form, setForm] = useState<KontenInput | null>(null);
  const [filterStatus, setFilterStatus] = useState<StatusKonten | 'Semua'>('Semua');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered = filterStatus === 'Semua' ? data : data.filter((k) => k.status === filterStatus);

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
      setError('Judul wajib diisi.');
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
          {(['Semua', 'Tampil', 'Tersembunyi'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filterStatus === s
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-white border border-gray-200 text-[var(--color-text-muted)] hover:border-[var(--color-primary)]'
              }`}
            >
              {s}
              <span className="ml-1.5 opacity-70">
                ({s === 'Semua' ? data.length : data.filter((k) => k.status === s).length})
              </span>
            </button>
          ))}
        </div>

        {!form && (
          <Button
            onClick={() => {
              setForm(kontenKosong());
              setError(null);
            }}
          >
            + Tambah Konten
          </Button>
        )}
      </div>

      {form && (
        <div className="mb-6 border border-gray-200 rounded-xl p-4 bg-[var(--color-surface)]">
          <h3 className="text-sm font-semibold text-[var(--color-text-base)] mb-3">
            {form.id ? 'Ubah Konten' : 'Tambah Konten Baru'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="block sm:col-span-2">
              <span className="text-xs font-medium text-[var(--color-text-muted)]">Judul</span>
              <input
                type="text"
                value={form.judul}
                onChange={(e) => setForm({ ...form, judul: e.target.value })}
                className="mt-1 w-full text-sm border border-gray-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="text-xs font-medium text-[var(--color-text-muted)]">Deskripsi</span>
              <textarea
                rows={3}
                value={form.deskripsi}
                onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                className="mt-1 w-full text-sm border border-gray-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </label>

            <label className="block">
              <span className="text-xs font-medium text-[var(--color-text-muted)]">
                Tanggal Kegiatan
              </span>
              <input
                type="date"
                value={form.tanggalKegiatan}
                onChange={(e) => setForm({ ...form, tanggalKegiatan: e.target.value })}
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
                {KATEGORI_KONTEN.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </label>

            <div className="sm:col-span-2">
              <ImageUploadField
                label="Foto Konten"
                value={form.urlFoto}
                onChange={(url) => setForm({ ...form, urlFoto: url })}
                prefixNama="konten"
                hint="Unggah dari perangkat (otomatis dikompres) atau tempel URL Drive."
              />
            </div>

            <label className="block">
              <span className="text-xs font-medium text-[var(--color-text-muted)]">Status</span>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as StatusKonten })}
                className="mt-1 w-full text-sm border border-gray-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              >
                <option value="Tampil">Tampil di halaman publik</option>
                <option value="Tersembunyi">Tersembunyi (draf)</option>
              </select>
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

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--color-surface-dark)] text-left">
              <th className={TH}>Judul</th>
              <th className={TH}>Kategori</th>
              <th className={TH}>Tanggal</th>
              <th className={TH}>Status</th>
              <th className={TH}>Dibuat Oleh</th>
              <th className={TH}>Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-[var(--color-text-muted)] italic"
                >
                  Belum ada konten untuk filter ini.
                </td>
              </tr>
            ) : (
              filtered.map((k) => (
                <tr key={k.id} className="hover:bg-[var(--color-surface)] transition-colors">
                  <td className="px-4 py-3 max-w-[260px]">
                    <p
                      className="font-medium text-[var(--color-text-base)] truncate"
                      title={k.judul}
                    >
                      {k.judul}
                    </p>
                    <p
                      className="text-xs text-[var(--color-text-muted)] truncate"
                      title={k.deskripsi}
                    >
                      {k.deskripsi}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{k.kategori}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)] whitespace-nowrap">
                    {formatTanggal(k.tanggalKegiatan)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge label={k.status} variant={k.status === 'Tampil' ? 'green' : 'gray'} />
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)] font-mono text-xs">
                    {k.dibuatOleh}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button
                      onClick={() =>
                        jalankan(() =>
                          onToggleStatus(k.id, k.status === 'Tampil' ? 'Tersembunyi' : 'Tampil'),
                        )
                      }
                      disabled={isPending}
                      className="text-xs text-[var(--color-primary)] hover:underline disabled:opacity-50"
                    >
                      {k.status === 'Tampil' ? 'Sembunyikan' : 'Tampilkan'}
                    </button>
                    <span className="mx-2 text-gray-300">|</span>
                    <button
                      onClick={() => {
                        // dibuatOleh tidak ikut form — server mengisinya dari sesi.
                        setForm({
                          id: k.id,
                          judul: k.judul,
                          deskripsi: k.deskripsi,
                          tanggalKegiatan: k.tanggalKegiatan,
                          kategori: k.kategori,
                          urlFoto: k.urlFoto,
                          status: k.status,
                        });
                        setError(null);
                      }}
                      disabled={isPending}
                      className="text-xs text-[var(--color-primary)] hover:underline disabled:opacity-50"
                    >
                      Ubah
                    </button>
                    <span className="mx-2 text-gray-300">|</span>
                    <button
                      onClick={() => jalankan(() => onHapus(k.id))}
                      disabled={isPending}
                      className="text-xs text-red-600 hover:underline disabled:opacity-50"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-[var(--color-text-muted)]">
        Menampilkan {filtered.length} dari {data.length} konten
      </p>
    </div>
  );
}
