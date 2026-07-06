'use client';

import { useState } from 'react';
import type { BukuTamuEntry } from '@/types/buku-tamu';

function formatTanggal(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BukuTamuTable({ data }: { data: BukuTamuEntry[] }) {
  const [search, setSearch] = useState('');

  const filtered = data.filter(
    (row) =>
      row.nama.toLowerCase().includes(search.toLowerCase()) ||
      row.keperluan.toLowerCase().includes(search.toLowerCase()) ||
      row.bertemuDengan.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Cari nama, keperluan, atau bertemu dengan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 max-w-sm px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
        />
        <span className="text-sm text-[var(--color-text-muted)]">
          {filtered.length} dari {data.length} data
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--color-surface-dark)] text-left">
              <th className="px-4 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                Nama
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                Keperluan
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                Bertemu Dengan
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                Tanggal
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                Jam
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-[var(--color-text-muted)] italic"
                >
                  Tidak ada data yang cocok.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id} className="hover:bg-[var(--color-surface)] transition-colors">
                  <td className="px-4 py-3 font-medium text-[var(--color-text-base)]">
                    {row.nama}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{row.keperluan}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{row.bertemuDengan}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)] whitespace-nowrap">
                    {formatTanggal(row.tanggal)}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{row.jam}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
