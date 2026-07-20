'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { PengajuanSurat, StatusSurat } from '@/repository/pengajuan-surat/dto';
import StatusBadge from '@/feature/admin/pengajuan-surat/component/StatusBadge';
import Pagination from '@/shared/components/ui/Pagination';

const PAGE_SIZE = 5;
const STATUS_OPTIONS: (StatusSurat | 'Semua')[] = [
  'Semua',
  'Baru',
  'Diproses',
  'Selesai',
  'Ditolak',
];

// Label tombol aksi tergantung status (sesuai desain).
function aksiLabel(status: StatusSurat): string {
  if (status === 'Baru') return 'Tinjau';
  if (status === 'Diproses') return 'Detail';
  return 'Arsip';
}

function formatTanggal(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function PengajuanTerbaru({ data }: { data: PengajuanSurat[] }) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<StatusSurat | 'Semua'>('Semua');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return [...data]
      .sort((a, b) => b.tanggalPengajuan.localeCompare(a.tanggalPengajuan))
      .filter((row) => status === 'Semua' || row.status === status)
      .filter((row) => row.nama.toLowerCase().includes(q) || row.nik.includes(q));
  }, [data, search, status]);

  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function resetPage<T>(setter: (v: T) => void) {
    return (v: T) => {
      setter(v);
      setPage(1);
    };
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h3 className="font-[var(--font-lora)] text-lg font-semibold text-[var(--color-primary)]">
          Pengajuan Terbaru
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Cari nama atau NIK…"
            value={search}
            onChange={(e) => resetPage(setSearch)(e.target.value)}
            className="w-full sm:w-56 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
          />
          <select
            aria-label="Filter status"
            value={status}
            onChange={(e) => resetPage(setStatus)(e.target.value as StatusSurat | 'Semua')}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s === 'Semua' ? '⛃ Filter' : s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--color-surface-dark)] text-left">
              {['Pemohon', 'Jenis Surat', 'Tanggal', 'Status', 'Aksi'].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
            {pageItems.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-[var(--color-text-muted)] italic"
                >
                  Tidak ada pengajuan yang cocok.
                </td>
              </tr>
            ) : (
              pageItems.map((row) => (
                <tr key={row.id} className="hover:bg-[var(--color-surface)] transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-[var(--color-text-base)]">{row.nama}</p>
                    <p className="text-xs text-[var(--color-text-muted)] font-mono">{row.nik}</p>
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{row.jenisSurat}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)] whitespace-nowrap">
                    {formatTanggal(row.tanggalPengajuan)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href="/dashboard/pengajuan-surat"
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:bg-[var(--color-surface)] transition-colors"
                    >
                      {aksiLabel(row.status)}
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        totalItems={filtered.length}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />
    </div>
  );
}
