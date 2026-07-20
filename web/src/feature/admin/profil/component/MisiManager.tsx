'use client';

import type { Misi, MisiInput } from '@/repository/profil/dto';
import OrderedListManager from '@/shared/components/cms/OrderedListManager';

type Props = {
  data: Misi[];
  onSimpan: (input: MisiInput, id: string | null) => Promise<void>;
  onHapus: (id: string) => Promise<void>;
  onPindah: (id: string, arah: 'naik' | 'turun') => Promise<void>;
};

export default function MisiManager({ data, onSimpan, onHapus, onPindah }: Props) {
  return (
    <OrderedListManager<Misi, MisiInput>
      data={data}
      labelTambah="+ Tambah Misi"
      kosong={() => ({ teks: '', urutan: 0 })}
      keItem={(_, item) => ({ teks: item.teks, urutan: item.urutan })}
      onSimpan={onSimpan}
      onHapus={onHapus}
      onPindah={onPindah}
      validasi={(d) => (d.teks.trim() ? null : 'Teks misi wajib diisi.')}
      barisRingkas={(item) => <p className="text-sm text-[var(--color-text-base)]">{item.teks}</p>}
      renderForm={(draft, setDraft) => (
        <label className="block">
          <span className="text-xs font-medium text-[var(--color-text-muted)]">Teks Misi</span>
          <textarea
            rows={3}
            value={draft.teks}
            onChange={(e) => setDraft({ ...draft, teks: e.target.value })}
            className="mt-1 w-full text-sm border border-gray-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </label>
      )}
    />
  );
}
