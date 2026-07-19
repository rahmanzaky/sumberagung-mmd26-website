'use client';

import { useState, useTransition } from 'react';
import type { Jabatan, JabatanInput } from '@/repository/struktur/dto';
import { LEVEL_JABATAN } from '@/repository/struktur/dto';
import Button from '@/shared/components/ui/Button';
import Spinner from '@/shared/components/ui/Spinner';

const inputCls =
  'mt-1 w-full text-sm border border-gray-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]';

function kosong(): JabatanInput {
  return { namaJabatan: '', namaPejabat: '', urlFoto: '', level: 3, urutan: 0 };
}

function labelLevel(level: number) {
  return LEVEL_JABATAN.find((l) => l.nilai === level)?.label ?? `Level ${level}`;
}

type Props = {
  data: Jabatan[];
  onSimpan: (input: JabatanInput, id: string | null) => Promise<void>;
  onHapus: (id: string) => Promise<void>;
  onPindah: (id: string, arah: 'naik' | 'turun') => Promise<void>;
};

export default function StrukturManager({ data, onSimpan, onHapus, onPindah }: Props) {
  const [draft, setDraft] = useState<JabatanInput | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Kelompokkan per level agar bagan mudah dibaca; dalam level urut per urutan.
  const perLevel = new Map<number, Jabatan[]>();
  for (const j of [...data].sort((a, b) => a.level - b.level || a.urutan - b.urutan)) {
    if (!perLevel.has(j.level)) perLevel.set(j.level, []);
    perLevel.get(j.level)!.push(j);
  }

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
    if (!draft) return;
    if (!draft.namaJabatan.trim()) {
      setError('Nama jabatan wajib diisi.');
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

      {!draft && (
        <div className="mb-4">
          <Button
            onClick={() => {
              setDraft(kosong());
              setEditId(null);
              setError(null);
            }}
          >
            + Tambah Jabatan
          </Button>
        </div>
      )}

      {draft && (
        <div className="mb-6 border border-gray-200 rounded-xl p-4 bg-[var(--color-surface)]">
          <h3 className="text-sm font-semibold text-[var(--color-text-base)] mb-3">
            {editId ? 'Ubah Jabatan' : 'Tambah Jabatan'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="text-xs font-medium text-[var(--color-text-muted)]">
                Nama Jabatan
              </span>
              <input
                type="text"
                value={draft.namaJabatan}
                onChange={(e) => setDraft({ ...draft, namaJabatan: e.target.value })}
                placeholder="Kepala Desa"
                className={inputCls}
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[var(--color-text-muted)]">
                Nama Pejabat
              </span>
              <input
                type="text"
                value={draft.namaPejabat}
                onChange={(e) => setDraft({ ...draft, namaPejabat: e.target.value })}
                className={inputCls}
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[var(--color-text-muted)]">URL Foto</span>
              <input
                type="url"
                value={draft.urlFoto}
                onChange={(e) => setDraft({ ...draft, urlFoto: e.target.value })}
                className={inputCls}
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[var(--color-text-muted)]">
                Tingkatan (Level)
              </span>
              <select
                value={draft.level}
                onChange={(e) => setDraft({ ...draft, level: Number(e.target.value) })}
                className={inputCls}
              >
                {LEVEL_JABATAN.map((l) => (
                  <option key={l.nilai} value={l.nilai}>
                    {l.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
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

      {perLevel.size === 0 ? (
        <p className="text-sm text-[var(--color-text-muted)] italic py-8 text-center border border-gray-100 rounded-xl">
          Belum ada data jabatan.
        </p>
      ) : (
        <div className="space-y-5">
          {[...perLevel.entries()].map(([level, orang]) => (
            <div key={level}>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-2">
                {labelLevel(level)}
              </p>
              <ul className="space-y-2">
                {orang.map((j, i) => (
                  <li
                    key={j.id}
                    className="border border-gray-100 rounded-xl p-3 flex items-center justify-between gap-3 bg-white"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[var(--color-text-base)] truncate">
                        {j.namaJabatan}
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)] truncate">
                        {j.namaPejabat || '—'}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => jalankan(() => onPindah(j.id, 'naik'))}
                        disabled={isPending || i === 0}
                        title="Geser kiri/atas"
                        className="w-7 h-7 rounded-md text-[var(--color-text-muted)] hover:bg-gray-100 disabled:opacity-30"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => jalankan(() => onPindah(j.id, 'turun'))}
                        disabled={isPending || i === orang.length - 1}
                        title="Geser kanan/bawah"
                        className="w-7 h-7 rounded-md text-[var(--color-text-muted)] hover:bg-gray-100 disabled:opacity-30"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => {
                          setDraft({
                            namaJabatan: j.namaJabatan,
                            namaPejabat: j.namaPejabat,
                            urlFoto: j.urlFoto,
                            level: j.level,
                            urutan: j.urutan,
                          });
                          setEditId(j.id);
                          setError(null);
                        }}
                        disabled={isPending}
                        className="text-xs text-[var(--color-primary)] hover:underline disabled:opacity-50 px-2"
                      >
                        Ubah
                      </button>
                      <button
                        onClick={() => jalankan(() => onHapus(j.id))}
                        disabled={isPending}
                        className="text-xs text-red-600 hover:underline disabled:opacity-50 px-1"
                      >
                        Hapus
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
