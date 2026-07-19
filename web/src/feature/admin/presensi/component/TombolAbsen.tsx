'use client';

import { useState, useTransition } from 'react';
import Button from '@/shared/components/ui/Button';
import Spinner from '@/shared/components/ui/Spinner';
import { IconCentang } from '@/shared/components/icons';

type Props = {
  namaLengkap: string;
  sudahAbsen: boolean;
  jamAbsen: string | null;
  onAbsen: (keterangan: string) => Promise<void>;
};

export default function TombolAbsen({ namaLengkap, sudahAbsen, jamAbsen, onAbsen }: Props) {
  const [keterangan, setKeterangan] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function absen() {
    setError(null);
    startTransition(async () => {
      try {
        await onAbsen(keterangan);
        setKeterangan('');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal mencatat absensi.');
      }
    });
  }

  if (sudahAbsen) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
            <IconCentang className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--color-text-base)]">
              Absensi hari ini sudah tercatat
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">
              {namaLengkap}
              {jamAbsen ? ` — masuk pukul ${jamAbsen} WIB` : ''}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <p className="text-sm font-medium text-[var(--color-text-base)] mb-1">Belum absen hari ini</p>
      <p className="text-xs text-[var(--color-text-muted)] mb-4">
        Absensi hanya dapat dilakukan satu kali per hari, atas nama {namaLengkap}.
      </p>

      {error && (
        <p className="mb-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
          placeholder="Keterangan (opsional), mis. tugas lapangan"
          className="flex-1 text-sm border border-gray-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
        <Button variant="gold" onClick={absen} disabled={isPending}>
          {isPending ? <Spinner /> : 'Absen Sekarang'}
        </Button>
      </div>
    </div>
  );
}
