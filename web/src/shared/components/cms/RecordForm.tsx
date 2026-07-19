'use client';

import { useState, useTransition } from 'react';
import Button from '@/shared/components/ui/Button';
import Spinner from '@/shared/components/ui/Spinner';

// Definisi satu field dalam form. `key` harus salah satu kunci record T.
export type FieldDef<T> = {
  key: keyof T;
  label: string;
  multiline?: boolean;
  type?: 'text' | 'url' | 'number' | 'time';
  hint?: string;
  lebar?: 'penuh' | 'setengah'; // default: setengah
};

export type Seksi<T> = {
  judul?: string;
  keterangan?: string;
  fields: FieldDef<T>[];
};

type Props<T> = {
  awal: T;
  seksi: Seksi<T>[];
  bolehUbah?: boolean; // default true; false = hanya lihat
  pesanTakBolehUbah?: string;
  onSimpan: (input: T) => Promise<void>;
  // Validasi opsional: kembalikan pesan error, atau null jika lolos.
  validasi?: (form: T) => string | null;
};

/**
 * Form untuk konten "satu record" (Pola A). Dipakai lintas modul CMS —
 * Beranda, Geografi, Profil-visi, Pengaturan — supaya perangkat desa
 * menemui tata letak yang sama di mana pun.
 */
export default function RecordForm<T extends Record<string, string>>({
  awal,
  seksi,
  bolehUbah = true,
  pesanTakBolehUbah,
  onSimpan,
  validasi,
}: Props<T>) {
  const [form, setForm] = useState<T>(awal);
  const [pesan, setPesan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const berubah = JSON.stringify(form) !== JSON.stringify(awal);

  function submit() {
    setError(null);
    setPesan(null);

    const gagal = validasi?.(form);
    if (gagal) {
      setError(gagal);
      return;
    }

    startTransition(async () => {
      try {
        await onSimpan(form);
        setPesan('Perubahan tersimpan.');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal menyimpan.');
      }
    });
  }

  return (
    <div>
      {!bolehUbah && pesanTakBolehUbah && (
        <p className="mb-4 text-xs bg-amber-50 border border-amber-200 text-amber-800 rounded-lg px-3 py-2">
          {pesanTakBolehUbah}
        </p>
      )}
      {error && (
        <p className="mb-4 text-xs bg-red-50 border border-red-200 text-red-700 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
      {pesan && (
        <p className="mb-4 text-xs bg-green-50 border border-green-200 text-green-800 rounded-lg px-3 py-2">
          {pesan}
        </p>
      )}

      {seksi.map((s, i) => (
        <section key={i} className="mb-6">
          {s.judul && (
            <h3 className="text-sm font-semibold text-[var(--color-text-base)] mb-1">{s.judul}</h3>
          )}
          {s.keterangan && (
            <p className="text-xs text-[var(--color-text-muted)] mb-3">{s.keterangan}</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {s.fields.map((f) => (
              <label
                key={String(f.key)}
                className={`block ${f.lebar === 'penuh' || f.multiline ? 'sm:col-span-2' : ''}`}
              >
                <span className="text-xs font-medium text-[var(--color-text-muted)]">
                  {f.label}
                </span>
                {f.multiline ? (
                  <textarea
                    rows={3}
                    value={form[f.key]}
                    disabled={!bolehUbah}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="mt-1 w-full text-sm border border-gray-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] disabled:bg-gray-100 disabled:text-gray-500"
                  />
                ) : (
                  <input
                    type={f.type ?? 'text'}
                    value={form[f.key]}
                    disabled={!bolehUbah}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="mt-1 w-full text-sm border border-gray-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] disabled:bg-gray-100 disabled:text-gray-500"
                  />
                )}
                {f.hint && (
                  <span className="text-[10px] text-[var(--color-text-muted)]">{f.hint}</span>
                )}
              </label>
            ))}
          </div>
        </section>
      ))}

      {bolehUbah && (
        <div className="flex items-center gap-3">
          <Button onClick={submit} disabled={isPending || !berubah}>
            {isPending ? <Spinner /> : 'Simpan Perubahan'}
          </Button>
          {berubah && (
            <button
              type="button"
              onClick={() => {
                setForm(awal);
                setError(null);
                setPesan(null);
              }}
              className="text-sm text-[var(--color-text-muted)] hover:underline"
            >
              Kembalikan
            </button>
          )}
        </div>
      )}
    </div>
  );
}
