'use client';

import { useState } from 'react';
import type { RekapAbsensiRow } from '@/repository/presensi/dto';
import Button from '@/shared/components/ui/Button';

const TH =
  'px-4 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider';

function formatTanggal(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Bungkus nilai untuk CSV: escape kutip ganda dan selalu quote, supaya
 * koma di kolom keterangan tidak memecah kolom saat dibuka di Excel.
 */
function selCsv(nilai: string) {
  return `"${String(nilai).replace(/"/g, '""')}"`;
}

function unduhCsv(rows: RekapAbsensiRow[], namaFile: string) {
  const header = ['Tanggal', 'Username', 'Nama Lengkap', 'Jabatan', 'Jam Masuk', 'Keterangan'];
  const isi = rows.map((r) =>
    [r.tanggal, r.username, r.namaLengkap, r.jabatan, r.jamMasuk, r.keterangan]
      .map(selCsv)
      .join(','),
  );
  // BOM di depan supaya Excel membaca UTF-8 dengan benar.
  const csv = '﻿' + [header.map(selCsv).join(','), ...isi].join('\r\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = namaFile;
  a.click();
  URL.revokeObjectURL(url);
}

export default function RekapAbsensiTable({ data }: { data: RekapAbsensiRow[] }) {
  const tanggalTersedia = [...new Set(data.map((r) => r.tanggal))].sort((a, b) =>
    b.localeCompare(a),
  );
  const [filterTanggal, setFilterTanggal] = useState<string>('Semua');

  const filtered =
    filterTanggal === 'Semua' ? data : data.filter((r) => r.tanggal === filterTanggal);

  // Terbaru dulu, lalu jam masuk paling pagi di atas.
  const urut = [...filtered].sort(
    (a, b) => b.tanggal.localeCompare(a.tanggal) || a.jamMasuk.localeCompare(b.jamMasuk),
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <select
          value={filterTanggal}
          onChange={(e) => setFilterTanggal(e.target.value)}
          className="text-xs border border-gray-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        >
          <option value="Semua">Semua tanggal ({data.length})</option>
          {tanggalTersedia.map((t) => (
            <option key={t} value={t}>
              {formatTanggal(t)} ({data.filter((r) => r.tanggal === t).length})
            </option>
          ))}
        </select>

        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            unduhCsv(
              urut,
              `rekap-absensi-${filterTanggal === 'Semua' ? 'semua' : filterTanggal}.csv`,
            )
          }
          disabled={urut.length === 0}
        >
          ⬇ Unduh Rekap (.csv)
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--color-surface-dark)] text-left">
              <th className={TH}>Tanggal</th>
              <th className={TH}>Nama Lengkap</th>
              <th className={TH}>Jabatan</th>
              <th className={TH}>Jam Masuk</th>
              <th className={TH}>Keterangan</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
            {urut.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-[var(--color-text-muted)] italic"
                >
                  Belum ada data absensi untuk filter ini.
                </td>
              </tr>
            ) : (
              urut.map((row) => (
                <tr key={row.id} className="hover:bg-[var(--color-surface)] transition-colors">
                  <td className="px-4 py-3 text-[var(--color-text-muted)] whitespace-nowrap">
                    {formatTanggal(row.tanggal)}
                  </td>
                  <td className="px-4 py-3 font-medium text-[var(--color-text-base)] whitespace-nowrap">
                    {row.namaLengkap}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{row.jabatan}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)] font-mono text-xs">
                    {row.jamMasuk}
                  </td>
                  <td
                    className="px-4 py-3 text-[var(--color-text-muted)] max-w-[220px] truncate"
                    title={row.keterangan}
                  >
                    {row.keterangan || '—'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-[var(--color-text-muted)]">
        Menampilkan {urut.length} dari {data.length} catatan absensi
      </p>
    </div>
  );
}
