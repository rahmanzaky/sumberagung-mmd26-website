'use client';

import type { DistribusiUsia, DistribusiUsiaInput } from '@/repository/kependudukan/dto';
import OrderedListManager from '@/shared/components/cms/OrderedListManager';

type Props = {
  data: DistribusiUsia[];
  onSimpan: (input: DistribusiUsiaInput, id: string | null) => Promise<void>;
  onHapus: (id: string) => Promise<void>;
  onPindah: (id: string, arah: 'naik' | 'turun') => Promise<void>;
};

const inputCls =
  'mt-1 w-full text-sm border border-gray-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]';

export default function DistribusiUsiaManager({ data, onSimpan, onHapus, onPindah }: Props) {
  return (
    <OrderedListManager<DistribusiUsia, DistribusiUsiaInput>
      data={data}
      labelTambah="+ Tambah Rentang Usia"
      kosong={() => ({ rentang: '', wilayah: 'Sumberagung', lakiLaki: 0, perempuan: 0, urutan: 0 })}
      keItem={(_, item) => ({
        rentang: item.rentang,
        wilayah: item.wilayah,
        lakiLaki: item.lakiLaki,
        perempuan: item.perempuan,
        urutan: item.urutan,
      })}
      onSimpan={onSimpan}
      onHapus={onHapus}
      onPindah={onPindah}
      validasi={(d) => (d.rentang.trim() ? null : 'Rentang usia wajib diisi.')}
      barisRingkas={(item) => (
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-[var(--color-text-base)]">{item.rentang}</span>
          <span className="text-xs text-[var(--color-text-muted)] tabular-nums">
            L {item.lakiLaki} · P {item.perempuan} · Jml {item.lakiLaki + item.perempuan}
          </span>
        </div>
      )}
      renderForm={(draft, setDraft) => (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <label className="block col-span-2">
            <span className="text-xs font-medium text-[var(--color-text-muted)]">Rentang Usia</span>
            <input
              type="text"
              value={draft.rentang}
              onChange={(e) => setDraft({ ...draft, rentang: e.target.value })}
              placeholder="0 - 5 Tahun"
              className={inputCls}
            />
          </label>
          <label className="block col-span-2">
            <span className="text-xs font-medium text-[var(--color-text-muted)]">Wilayah</span>
            <input
              type="text"
              value={draft.wilayah}
              onChange={(e) => setDraft({ ...draft, wilayah: e.target.value })}
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-[var(--color-text-muted)]">Laki-laki</span>
            <input
              type="number"
              min={0}
              value={draft.lakiLaki}
              onChange={(e) => setDraft({ ...draft, lakiLaki: Number(e.target.value) })}
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-[var(--color-text-muted)]">Perempuan</span>
            <input
              type="number"
              min={0}
              value={draft.perempuan}
              onChange={(e) => setDraft({ ...draft, perempuan: Number(e.target.value) })}
              className={inputCls}
            />
          </label>
        </div>
      )}
    />
  );
}
