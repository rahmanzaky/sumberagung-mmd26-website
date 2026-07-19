'use client';

import { useState, useTransition } from 'react';
import type { PresensiEntry, StatusHadir } from '@/repository/presensi/dto';
import { STATUS_HADIR } from '@/repository/presensi/dto';
import StatusHadirBadge from './StatusHadirBadge';
import Spinner from '@/shared/components/ui/Spinner';

function formatTanggal(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

const TH =
  'px-4 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider';

type Props = {
  data: PresensiEntry[];
  tanggalTersedia: string[];
  onUpdateStatus: (id: string, status: StatusHadir, keterangan: string) => Promise<void>;
};

export default function PresensiTable({ data, tanggalTersedia, onUpdateStatus }: Props) {
  const [filterTanggal, setFilterTanggal] = useState<string>(tanggalTersedia[0] ?? '');
  const [filterStatus, setFilterStatus] = useState<StatusHadir | 'Semua'>('Semua');
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Optimistic local status map — sama polanya dengan PengajuanSuratTable
  const [localStatuses, setLocalStatuses] = useState<Record<string, StatusHadir>>(() =>
    Object.fromEntries(data.map((r) => [r.id, r.status])),
  );

  const enriched = data.map((row) => ({ ...row, status: localStatuses[row.id] ?? row.status }));
  const perTanggal = filterTanggal
    ? enriched.filter((row) => row.tanggal === filterTanggal)
    : enriched;
  const filtered =
    filterStatus === 'Semua' ? perTanggal : perTanggal.filter((row) => row.status === filterStatus);

  function handleStatusChange(id: string, status: StatusHadir) {
    setLocalStatuses((prev) => ({ ...prev, [id]: status }));
    setLoadingId(id);

    startTransition(async () => {
      try {
        const keterangan = data.find((r) => r.id === id)?.keterangan ?? '';
        await onUpdateStatus(id, status, keterangan);
      } catch {
        // Rollback jika server gagal
        setLocalStatuses((prev) => ({ ...prev, [id]: data.find((r) => r.id === id)!.status }));
      } finally {
        setLoadingId(null);
      }
    });
  }

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <select
          value={filterTanggal}
          onChange={(e) => setFilterTanggal(e.target.value)}
          className="text-xs border border-gray-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        >
          {tanggalTersedia.map((t) => (
            <option key={t} value={t}>
              {formatTanggal(t)}
            </option>
          ))}
        </select>

        {(['Semua', ...STATUS_HADIR] as const).map((s) => (
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
              ({s === 'Semua' ? perTanggal.length : perTanggal.filter((r) => r.status === s).length}
              )
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--color-surface-dark)] text-left">
              <th className={TH}>Nama</th>
              <th className={TH}>Jabatan</th>
              <th className={TH}>Jam Masuk</th>
              <th className={TH}>Jam Pulang</th>
              <th className={TH}>Keterangan</th>
              <th className={TH}>Status</th>
              <th className={TH}>Ubah Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-[var(--color-text-muted)] italic"
                >
                  Tidak ada data presensi untuk filter ini.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id} className="hover:bg-[var(--color-surface)] transition-colors">
                  <td className="px-4 py-3 font-medium text-[var(--color-text-base)] whitespace-nowrap">
                    {row.nama}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{row.jabatan}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)] font-mono text-xs">
                    {row.jamMasuk || '—'}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)] font-mono text-xs">
                    {row.jamPulang || '—'}
                  </td>
                  <td
                    className="px-4 py-3 text-[var(--color-text-muted)] max-w-[180px] truncate"
                    title={row.keterangan}
                  >
                    {row.keterangan || '—'}
                  </td>
                  <td className="px-4 py-3">
                    <StatusHadirBadge status={row.status} />
                  </td>
                  <td className="px-4 py-3">
                    {loadingId === row.id && isPending ? (
                      <Spinner />
                    ) : (
                      <select
                        value={localStatuses[row.id] ?? row.status}
                        onChange={(e) => handleStatusChange(row.id, e.target.value as StatusHadir)}
                        disabled={isPending}
                        className="text-xs border border-gray-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] disabled:opacity-50"
                      >
                        {STATUS_HADIR.map((s) => (
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
        Menampilkan {filtered.length} dari {perTanggal.length} perangkat desa
      </p>
    </div>
  );
}
