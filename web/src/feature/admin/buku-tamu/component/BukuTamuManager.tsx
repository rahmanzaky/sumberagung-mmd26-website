'use client';

import { useMemo, useState, useTransition } from 'react';
import type { BukuTamuEntry, BukuTamuInput } from '@/repository/buku-tamu/dto';
import { createBukuTamuAction } from '@/repository/buku-tamu/action';
import Button from '@/shared/components/ui/Button';
import Pagination from '@/shared/components/ui/Pagination';
import InputTamuModal from './InputTamuModal';

const PAGE_SIZE = 8;

function formatTanggal(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// Ubah daftar entri → string CSV (dengan escaping tanda kutip & koma).
function toCsv(rows: BukuTamuEntry[]): string {
  const header = [
    'No',
    'Tanggal',
    'Jam',
    'Nama Tamu',
    'Instansi/Asal',
    'Keperluan',
    'No. WhatsApp',
  ];
  const esc = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
  const lines = rows.map((r, i) =>
    [i + 1, r.tanggal, r.jam, r.nama, r.instansi, r.keperluan, r.noWhatsapp]
      .map(String)
      .map(esc)
      .join(','),
  );
  return [header.map(esc).join(','), ...lines].join('\n');
}

export default function BukuTamuManager({ data }: { data: BukuTamuEntry[] }) {
  // Entri hasil "Input Tamu Baru" ditampilkan optimistik sampai server merevalidasi.
  const [extra, setExtra] = useState<BukuTamuEntry[]>([]);
  // Saat data server berganti (revalidatePath), buang entri optimistik agar tak dobel.
  // Pola resmi React "reset state saat prop berubah" — set state saat render.
  const [prevData, setPrevData] = useState(data);
  if (prevData !== data) {
    setPrevData(data);
    setExtra([]);
  }

  const [search, setSearch] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [page, setPage] = useState(1);
  const [showInput, setShowInput] = useState(false);
  const [detail, setDetail] = useState<BukuTamuEntry | null>(null);
  const [, startTransition] = useTransition();

  const allData = useMemo(() => [...extra, ...data], [extra, data]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return allData
      .filter((r) => r.nama.toLowerCase().includes(q) || r.instansi.toLowerCase().includes(q))
      .filter((r) => (from ? r.tanggal >= from : true))
      .filter((r) => (to ? r.tanggal <= to : true))
      .sort((a, b) => `${b.tanggal} ${b.jam}`.localeCompare(`${a.tanggal} ${a.jam}`));
  }, [allData, search, from, to]);

  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleExport() {
    const csv = toCsv(filtered);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `buku-tamu-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleCreate(input: BukuTamuInput) {
    // Optimistik: tampilkan langsung sebelum revalidasi server.
    setExtra((prev) => [{ ...input, id: `bt-local-${Date.now()}` }, ...prev]);
    setPage(1);
    return new Promise<void>((resolve, reject) => {
      startTransition(async () => {
        try {
          await createBukuTamuAction(input);
          resolve();
        } catch (err) {
          setExtra((prev) => prev.slice(1)); // rollback
          reject(err);
        }
      });
    });
  }

  const inputCls =
    'px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-5">
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Cari nama atau instansi…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className={`${inputCls} w-full sm:w-64`}
          />
          <div className="flex items-center gap-1 text-sm text-[var(--color-text-muted)]">
            <input
              type="date"
              value={from}
              onChange={(e) => {
                setFrom(e.target.value);
                setPage(1);
              }}
              aria-label="Dari tanggal"
              className={inputCls}
            />
            <span>–</span>
            <input
              type="date"
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
                setPage(1);
              }}
              aria-label="Sampai tanggal"
              className={inputCls}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="md" onClick={handleExport}>
            ⬇ Ekspor Laporan
          </Button>
          <Button variant="gold" size="md" onClick={() => setShowInput(true)}>
            + Input Tamu Baru
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--color-surface-dark)] text-left">
              {[
                'No',
                'Waktu Kunjungan',
                'Nama Tamu',
                'Instansi / Asal',
                'Keperluan',
                'No. WhatsApp',
                'Aksi',
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider whitespace-nowrap"
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
                  colSpan={7}
                  className="px-4 py-8 text-center text-[var(--color-text-muted)] italic"
                >
                  Tidak ada kunjungan yang cocok.
                </td>
              </tr>
            ) : (
              pageItems.map((row, i) => (
                <tr key={row.id} className="hover:bg-[var(--color-surface)] transition-colors">
                  <td className="px-4 py-3 text-[var(--color-text-muted)] font-mono text-xs">
                    {String((page - 1) * PAGE_SIZE + i + 1).padStart(3, '0')}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <p className="text-[var(--color-text-base)]">{formatTanggal(row.tanggal)}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{row.jam} WIB</p>
                  </td>
                  <td className="px-4 py-3 font-medium text-[var(--color-text-base)]">
                    {row.nama}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{row.instansi}</td>
                  <td
                    className="px-4 py-3 text-[var(--color-text-muted)] max-w-[220px] truncate"
                    title={row.keperluan}
                  >
                    {row.keperluan}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)] font-mono text-xs whitespace-nowrap">
                    {row.noWhatsapp || '–'}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setDetail(row)}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:bg-[var(--color-surface)] transition-colors"
                    >
                      Detail
                    </button>
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
        itemLabel="kunjungan"
      />

      {showInput && <InputTamuModal onClose={() => setShowInput(false)} onSubmit={handleCreate} />}

      {detail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setDetail(null)}
        >
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-[var(--font-lora)] text-lg font-semibold text-[var(--color-primary)] mb-4">
              Detail Kunjungan
            </h2>
            <dl className="space-y-2 text-sm">
              {[
                ['Nama Tamu', detail.nama],
                ['Instansi / Asal', detail.instansi],
                ['Keperluan', detail.keperluan],
                ['No. WhatsApp', detail.noWhatsapp || '–'],
                ['Tanggal', formatTanggal(detail.tanggal)],
                ['Jam', `${detail.jam} WIB`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <dt className="text-[var(--color-text-muted)]">{k}</dt>
                  <dd className="text-[var(--color-text-base)] text-right font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="flex justify-end mt-5">
              <Button variant="secondary" onClick={() => setDetail(null)}>
                Tutup
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
