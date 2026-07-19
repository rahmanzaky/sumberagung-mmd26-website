'use client';

import type { TimelineEntri, TimelineEntriInput, SisiTimeline } from '@/repository/sejarah/dto';
import { SISI_TIMELINE } from '@/repository/sejarah/dto';
import OrderedListManager from '@/shared/components/cms/OrderedListManager';

type Props = {
  data: TimelineEntri[];
  onSimpan: (input: TimelineEntriInput, id: string | null) => Promise<void>;
  onHapus: (id: string) => Promise<void>;
  onPindah: (id: string, arah: 'naik' | 'turun') => Promise<void>;
};

const inputCls =
  'mt-1 w-full text-sm border border-gray-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]';

export default function TimelineManager({ data, onSimpan, onHapus, onPindah }: Props) {
  return (
    <OrderedListManager<TimelineEntri, TimelineEntriInput>
      data={data}
      labelTambah="+ Tambah Entri Timeline"
      kosong={() => ({ era: '', subjudul: '', narasi: '', urlFoto: '', sisi: 'kanan', urutan: 0 })}
      keItem={(_, item) => ({
        era: item.era,
        subjudul: item.subjudul,
        narasi: item.narasi,
        urlFoto: item.urlFoto,
        sisi: item.sisi,
        urutan: item.urutan,
      })}
      onSimpan={onSimpan}
      onHapus={onHapus}
      onPindah={onPindah}
      validasi={(d) => {
        if (!d.era.trim()) return 'Era wajib diisi.';
        if (!d.narasi.trim()) return 'Narasi wajib diisi.';
        return null;
      }}
      barisRingkas={(item) => (
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[var(--color-gold-dark)]">{item.era}</span>
            <span className="text-xs text-[var(--color-text-muted)]">· {item.subjudul}</span>
            <span className="text-[10px] uppercase tracking-wide text-[var(--color-text-muted)] border border-gray-200 rounded px-1">
              foto {item.sisi}
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 mt-0.5">
            {item.narasi}
          </p>
        </div>
      )}
      renderForm={(draft, setDraft) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs font-medium text-[var(--color-text-muted)]">Era / Tahun</span>
            <input
              type="text"
              value={draft.era}
              onChange={(e) => setDraft({ ...draft, era: e.target.value })}
              placeholder="1908 atau Akhir Abad ke-18"
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-[var(--color-text-muted)]">Subjudul</span>
            <input
              type="text"
              value={draft.subjudul}
              onChange={(e) => setDraft({ ...draft, subjudul: e.target.value })}
              className={inputCls}
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-xs font-medium text-[var(--color-text-muted)]">Narasi</span>
            <textarea
              rows={3}
              value={draft.narasi}
              onChange={(e) => setDraft({ ...draft, narasi: e.target.value })}
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-[var(--color-text-muted)]">URL Foto</span>
            <input
              type="url"
              value={draft.urlFoto}
              onChange={(e) => setDraft({ ...draft, urlFoto: e.target.value })}
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-[var(--color-text-muted)]">Posisi Foto</span>
            <select
              value={draft.sisi}
              onChange={(e) => setDraft({ ...draft, sisi: e.target.value as SisiTimeline })}
              className={inputCls}
            >
              {SISI_TIMELINE.map((s) => (
                <option key={s} value={s}>
                  {s === 'kiri' ? 'Kiri' : 'Kanan'}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
    />
  );
}
