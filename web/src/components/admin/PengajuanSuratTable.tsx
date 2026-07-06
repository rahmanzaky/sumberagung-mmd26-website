'use client';

import { useState, useTransition } from 'react';
import type { PengajuanSurat, StatusSurat } from '@/types/pengajuan-surat';
import StatusBadge from './StatusBadge';
import Spinner from '@/components/ui/Spinner';

const STATUS_OPTIONS: StatusSurat[] = ['Baru', 'Diproses', 'Selesai', 'Ditolak'];

function formatTanggal(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

type Props = {
  data: PengajuanSurat[];
  onUpdateStatus: (id: string, status: StatusSurat) => Promise<void>;
};

export default function PengajuanSuratTable({ data, onUpdateStatus }: Props) {
  const [filterStatus, setFilterStatus] = useState<StatusSurat | 'Semua'>('Semua');
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered =
    filterStatus === 'Semua' ? data : data.filter((row) => row.status === filterStatus);

  function handleStatusChange(id: string, status: StatusSurat) {
    setLoadingId(id);
    startTransition(async () => {
      await onUpdateStatus(id, status);
      setLoadingId(null);
    });
  }

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {(['Semua', ...STATUS_OPTIONS] as const).map((s) => (
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
              ({s === 'Semua' ? data.length : data.filter((r) => r.status === s).length})
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--color-surface-dark)] text-left">
              <th className="px-4 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                Nama
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                NIK
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                Jenis Surat
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                Keperluan
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                Tgl. Pengajuan
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                Ubah Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-[var(--color-text-muted)] italic"
                >
                  Tidak ada pengajuan dengan status ini.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id} className="hover:bg-[var(--color-surface)] transition-colors">
                  <td className="px-4 py-3 font-medium text-[var(--color-text-base)] whitespace-nowrap">
                    {row.nama}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)] font-mono text-xs">
                    {row.nik}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{row.jenisSurat}</td>
                  <td
                    className="px-4 py-3 text-[var(--color-text-muted)] max-w-[180px] truncate"
                    title={row.keperluan}
                  >
                    {row.keperluan}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)] whitespace-nowrap">
                    {formatTanggal(row.tanggalPengajuan)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-4 py-3">
                    {loadingId === row.id && isPending ? (
                      <Spinner />
                    ) : (
                      <select
                        value={row.status}
                        onChange={(e) => handleStatusChange(row.id, e.target.value as StatusSurat)}
                        disabled={isPending}
                        className="text-xs border border-gray-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] disabled:opacity-50"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-[var(--color-text-muted)]">
        Menampilkan {filtered.length} dari {data.length} pengajuan
      </p>
    </div>
  );
}
