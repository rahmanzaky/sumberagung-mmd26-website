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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-gold)] rounded-full"></div>
          <h3 className="font-[var(--font-lora)] text-xl font-bold text-[var(--color-primary-deepdark)]">
            Pengajuan Terbaru
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
              🔍
            </span>
            <input
              type="text"
              placeholder="Cari nama atau NIK…"
              value={search}
              onChange={(e) => resetPage(setSearch)(e.target.value)}
              className="w-full sm:w-64 pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-inner"
            />
          </div>
          <select
            aria-label="Filter status"
            value={status}
            onChange={(e) => resetPage(setStatus)(e.target.value as StatusSurat | 'Semua')}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all cursor-pointer font-medium text-gray-600"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s === 'Semua' ? 'Filter Status' : s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-white text-left border-b border-gray-100">
              {['Pemohon', 'Jenis Surat', 'Tanggal', 'Status', 'Aksi'].map((h) => (
                <th
                  key={h}
                  className="px-5 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider"
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
                  className="px-5 py-12 text-center text-[var(--color-text-muted)] bg-gray-50/30"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-3xl opacity-50">📭</span>
                    <p className="italic">Tidak ada pengajuan yang cocok.</p>
                  </div>
                </td>
              </tr>
            ) : (
              pageItems.map((row) => (
                <tr key={row.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-[var(--color-primary-deepdark)] group-hover:text-[var(--color-primary)] transition-colors">
                      {row.nama}
                    </p>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">{row.nik}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-600 font-medium">{row.jenisSurat}</td>
                  <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                    {formatTanggal(row.tanggalPengajuan)}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href="/dashboard/pengajuan-surat"
                      className="inline-flex items-center px-4 py-1.5 text-xs font-semibold rounded-lg border border-[var(--color-primary)]/20 text-[var(--color-primary)] bg-[var(--color-primary)]/5 hover:bg-[var(--color-primary)] hover:text-white transition-all shadow-sm"
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

      <div className="mt-4">
        <Pagination
          page={page}
          totalItems={filtered.length}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
