'use client';

import { useState, useTransition } from 'react';
import type { KependudukanTahun } from '@/repository/kependudukan/dto';
import { FIELD_ANGKA, LABEL_FIELD } from '@/repository/kependudukan/dto';
import Button from '@/shared/components/ui/Button';
import Spinner from '@/shared/components/ui/Spinner';

const TH =
  'px-4 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider';
const TD_ANGKA = 'px-4 py-3 text-right text-[var(--color-text-muted)] tabular-nums';

function angka(n: number) {
  return n.toLocaleString('id-ID');
}

function barisKosong(): KependudukanTahun {
  return {
    tahun: new Date().getFullYear(),
    totalPenduduk: 0,
    lakiLaki: 0,
    perempuan: 0,
    jumlahKK: 0,
    jumlahRt: 0,
    jumlahRw: 0,
  };
}

type Props = {
  data: KependudukanTahun[];
  onSimpan: (input: KependudukanTahun) => Promise<void>;
};

export default function KependudukanManager({ data, onSimpan }: Props) {
  const [form, setForm] = useState<KependudukanTahun | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function submit() {
    if (!form) return;

    if (!form.tahun || String(form.tahun).length !== 4) {
      setError('Tahun harus 4 digit, mis. 2026.');
      return;
    }
    // Peringatan konsistensi — laki-laki + perempuan idealnya = total penduduk.
    if (form.lakiLaki + form.perempuan !== form.totalPenduduk) {
      setError(
        `Total penduduk (${angka(form.totalPenduduk)}) tidak sama dengan laki-laki + perempuan (${angka(
          form.lakiLaki + form.perempuan,
        )}). Perbaiki dulu sebelum menyimpan.`,
      );
      return;
    }

    startTransition(async () => {
      try {
        await onSimpan(form);
        setForm(null);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal menyimpan data.');
      }
    });
  }

  return (
    <div>
      {error && (
        <p className="mb-4 text-xs bg-red-50 border border-red-200 text-red-700 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {!form && (
        <div className="mb-4">
          <Button
            onClick={() => {
              setForm(barisKosong());
              setError(null);
            }}
          >
            + Tambah / Perbarui Tahun
          </Button>
        </div>
      )}

      {form && (
        <div className="mb-6 border border-gray-200 rounded-xl p-4 bg-[var(--color-surface)]">
          <h3 className="text-sm font-semibold text-[var(--color-text-base)] mb-3">
            Data Statistik Tahun {form.tahun}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <label className="block">
              <span className="text-xs font-medium text-[var(--color-text-muted)]">Tahun</span>
              <input
                type="number"
                value={form.tahun}
                onChange={(e) => setForm({ ...form, tahun: Number(e.target.value) })}
                className="mt-1 w-full text-sm border border-gray-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </label>
            {FIELD_ANGKA.map((f) => (
              <label key={f} className="block">
                <span className="text-xs font-medium text-[var(--color-text-muted)]">
                  {LABEL_FIELD[f]}
                </span>
                <input
                  type="number"
                  min={0}
                  value={form[f]}
                  onChange={(e) => setForm({ ...form, [f]: Number(e.target.value) })}
                  className="mt-1 w-full text-sm border border-gray-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </label>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-[var(--color-text-muted)]">
            Menyimpan tahun yang sudah ada akan menimpa datanya. Perubahan langsung tampil di
            halaman publik.
          </p>
          <div className="flex items-center gap-2 mt-3">
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
              <th className={TH}>Tahun</th>
              {FIELD_ANGKA.map((f) => (
                <th key={f} className={`${TH} text-right`}>
                  {LABEL_FIELD[f]}
                </th>
              ))}
              <th className={TH}>Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={FIELD_ANGKA.length + 2}
                  className="px-4 py-8 text-center text-[var(--color-text-muted)] italic"
                >
                  Belum ada data kependudukan.
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.tahun} className="hover:bg-[var(--color-surface)] transition-colors">
                  <td className="px-4 py-3 font-medium text-[var(--color-text-base)]">
                    {row.tahun}
                  </td>
                  {FIELD_ANGKA.map((f) => (
                    <td key={f} className={TD_ANGKA}>
                      {angka(row[f])}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => {
                        setForm({ ...row });
                        setError(null);
                      }}
                      disabled={isPending}
                      className="text-xs text-[var(--color-primary)] hover:underline disabled:opacity-50"
                    >
                      Ubah
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
