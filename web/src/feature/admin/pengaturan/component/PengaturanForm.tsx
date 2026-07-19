'use client';

import { useState, useTransition } from 'react';
import type { Pengaturan } from '@/repository/pengaturan/dto';
import { LABEL_PENGATURAN } from '@/repository/pengaturan/dto';
import Button from '@/shared/components/ui/Button';
import Spinner from '@/shared/components/ui/Spinner';

const GRUP_IDENTITAS: (keyof Pengaturan)[] = [
  'namaDesa',
  'kecamatan',
  'kabupaten',
  'provinsi',
  'alamatKantor',
];
const GRUP_KONTAK: (keyof Pengaturan)[] = ['emailResmi', 'noWaResmi'];
const GRUP_JAM: (keyof Pengaturan)[] = ['jamLayananMulai', 'jamLayananSelesai'];

type Props = {
  awal: Pengaturan;
  bolehUbah: boolean; // hanya Super Admin
  onSimpan: (input: Pengaturan) => Promise<void>;
};

export default function PengaturanForm({ awal, bolehUbah, onSimpan }: Props) {
  const [form, setForm] = useState<Pengaturan>(awal);
  const [pesan, setPesan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const berubah = JSON.stringify(form) !== JSON.stringify(awal);

  function submit() {
    setError(null);
    setPesan(null);

    if (form.jamLayananMulai >= form.jamLayananSelesai) {
      setError('Jam layanan mulai harus lebih awal daripada jam selesai.');
      return;
    }

    startTransition(async () => {
      try {
        await onSimpan(form);
        setPesan('Pengaturan tersimpan.');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal menyimpan pengaturan.');
      }
    });
  }

  return (
    <div>
      {!bolehUbah && (
        <p className="mb-4 text-xs bg-amber-50 border border-amber-200 text-amber-800 rounded-lg px-3 py-2">
          Hanya <strong>Super Admin</strong> yang dapat mengubah konfigurasi sistem. Anda hanya
          dapat melihat pengaturan saat ini.
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

      <Seksi judul="Identitas Desa">
        {GRUP_IDENTITAS.map((k) => (
          <Field
            key={k}
            label={LABEL_PENGATURAN[k]}
            value={form[k]}
            disabled={!bolehUbah}
            onChange={(v) => setForm({ ...form, [k]: v })}
          />
        ))}
      </Seksi>

      <Seksi judul="Kontak Resmi">
        {GRUP_KONTAK.map((k) => (
          <Field
            key={k}
            label={LABEL_PENGATURAN[k]}
            value={form[k]}
            disabled={!bolehUbah}
            onChange={(v) => setForm({ ...form, [k]: v })}
          />
        ))}
      </Seksi>

      <Seksi
        judul="Jam Layanan Pengajuan Surat"
        keterangan="Pengajuan di luar jam ini tetap masuk antrian dan diproses pada hari kerja berikutnya."
      >
        {GRUP_JAM.map((k) => (
          <Field
            key={k}
            label={LABEL_PENGATURAN[k]}
            value={form[k]}
            type="time"
            disabled={!bolehUbah}
            onChange={(v) => setForm({ ...form, [k]: v })}
          />
        ))}
      </Seksi>

      {bolehUbah && (
        <div className="flex items-center gap-3 mt-6">
          <Button onClick={submit} disabled={isPending || !berubah}>
            {isPending ? <Spinner /> : 'Simpan Pengaturan'}
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

function Seksi({
  judul,
  keterangan,
  children,
}: {
  judul: string;
  keterangan?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6">
      <h3 className="text-sm font-semibold text-[var(--color-text-base)] mb-1">{judul}</h3>
      {keterangan && <p className="text-xs text-[var(--color-text-muted)] mb-3">{keterangan}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  disabled,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-[var(--color-text-muted)]">{label}</span>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full text-sm border border-gray-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] disabled:bg-gray-100 disabled:text-gray-500"
      />
    </label>
  );
}
