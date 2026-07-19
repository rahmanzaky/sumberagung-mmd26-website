'use client';

import type { TingkatPendidikan, TingkatPendidikanInput } from '@/repository/kependudukan/dto';
import OrderedListManager from '@/shared/components/cms/OrderedListManager';

type Props = {
  data: TingkatPendidikan[];
  onSimpan: (input: TingkatPendidikanInput, id: string | null) => Promise<void>;
  onHapus: (id: string) => Promise<void>;
  onPindah: (id: string, arah: 'naik' | 'turun') => Promise<void>;
};

const inputCls =
  'mt-1 w-full text-sm border border-gray-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]';

export default function PendidikanManager({ data, onSimpan, onHapus, onPindah }: Props) {
  return (
    <OrderedListManager<TingkatPendidikan, TingkatPendidikanInput>
      data={data}
      labelTambah="+ Tambah Jenjang"
      kosong={() => ({ jenjang: '', persentase: 0, urutan: 0 })}
      keItem={(_, item) => ({
        jenjang: item.jenjang,
        persentase: item.persentase,
        urutan: item.urutan,
      })}
      onSimpan={onSimpan}
      onHapus={onHapus}
      onPindah={onPindah}
      validasi={(d) => {
        if (!d.jenjang.trim()) return 'Jenjang wajib diisi.';
        if (d.persentase < 0 || d.persentase > 100) return 'Persentase harus 0–100.';
        return null;
      }}
      barisRingkas={(item) => (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-[var(--color-text-base)] w-40 shrink-0">
            {item.jenjang}
          </span>
          <span className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
            <span
              className="block h-full bg-[var(--color-gold)]"
              style={{ width: `${Math.min(100, Math.max(0, item.persentase))}%` }}
            />
          </span>
          <span className="text-xs text-[var(--color-text-muted)] tabular-nums w-10 text-right">
            {item.persentase}%
          </span>
        </div>
      )}
      renderForm={(draft, setDraft) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs font-medium text-[var(--color-text-muted)]">Jenjang</span>
            <input
              type="text"
              value={draft.jenjang}
              onChange={(e) => setDraft({ ...draft, jenjang: e.target.value })}
              placeholder="SD / Sederajat"
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-[var(--color-text-muted)]">
              Persentase (0–100)
            </span>
            <input
              type="number"
              min={0}
              max={100}
              value={draft.persentase}
              onChange={(e) => setDraft({ ...draft, persentase: Number(e.target.value) })}
              className={inputCls}
            />
          </label>
        </div>
      )}
    />
  );
}
