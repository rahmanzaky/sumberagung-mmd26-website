'use client';

import { useState, useTransition } from 'react';
import type { BukuTamuInput } from '@/repository/buku-tamu/dto';
import Button from '@/shared/components/ui/Button';
import { waValid, normalisasiWa } from '@/lib/validasi';

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function nowHHmm() {
  return new Date().toTimeString().slice(0, 5);
}

const emptyForm: BukuTamuInput = {
  nama: '',
  instansi: '',
  keperluan: '',
  noWhatsapp: '',
  tanggal: '',
  jam: '',
};

type Props = {
  onClose: () => void;
  onSubmit: (input: BukuTamuInput) => Promise<void>;
};

export default function InputTamuModal({ onClose, onSubmit }: Props) {
  const [form, setForm] = useState<BukuTamuInput>({
    ...emptyForm,
    tanggal: todayISO(),
    jam: nowHHmm(),
  });
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function update<K extends keyof BukuTamuInput>(key: K, value: BukuTamuInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nama.trim()) {
      setError('Nama tamu wajib diisi.');
      return;
    }
    if (form.noWhatsapp.trim() && !waValid(form.noWhatsapp)) {
      setError('Nomor WhatsApp tidak valid (contoh: 0812xxxxxxx).');
      return;
    }
    setError(null);
    // Rapikan nomor WA ke format 0… sebelum simpan.
    const bersih: BukuTamuInput = {
      ...form,
      noWhatsapp: form.noWhatsapp.trim() ? normalisasiWa(form.noWhatsapp) : form.noWhatsapp,
    };
    startTransition(async () => {
      try {
        await onSubmit(bersih);
        onClose();
      } catch {
        setError('Gagal menyimpan data. Coba lagi.');
      }
    });
  }

  const field =
    'w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent';
  const labelCls = 'block text-xs font-medium text-[var(--color-text-muted)] mb-1';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-[var(--font-lora)] text-lg font-semibold text-[var(--color-primary)] mb-4">
          Input Tamu Baru
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className={labelCls} htmlFor="nama">
              Nama Tamu <span className="text-red-500">*</span>
            </label>
            <input
              id="nama"
              className={field}
              value={form.nama}
              onChange={(e) => update('nama', e.target.value)}
              autoFocus
            />
          </div>

          <div>
            <label className={labelCls} htmlFor="instansi">
              Instansi / Asal
            </label>
            <input
              id="instansi"
              className={field}
              value={form.instansi}
              onChange={(e) => update('instansi', e.target.value)}
            />
          </div>

          <div>
            <label className={labelCls} htmlFor="keperluan">
              Keperluan
            </label>
            <input
              id="keperluan"
              className={field}
              value={form.keperluan}
              onChange={(e) => update('keperluan', e.target.value)}
            />
          </div>

          <div>
            <label className={labelCls} htmlFor="noWhatsapp">
              No. WhatsApp
            </label>
            <input
              id="noWhatsapp"
              className={field}
              value={form.noWhatsapp}
              onChange={(e) => update('noWhatsapp', e.target.value)}
              placeholder="0812-3456-7890"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls} htmlFor="tanggal">
                Tanggal
              </label>
              <input
                id="tanggal"
                type="date"
                className={field}
                value={form.tanggal}
                onChange={(e) => update('tanggal', e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="jam">
                Jam
              </label>
              <input
                id="jam"
                type="time"
                className={field}
                value={form.jam}
                onChange={(e) => update('jam', e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" onClick={onClose} disabled={isPending}>
              Batal
            </Button>
            <Button type="submit" variant="gold" disabled={isPending}>
              {isPending ? 'Menyimpan…' : 'Simpan'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
