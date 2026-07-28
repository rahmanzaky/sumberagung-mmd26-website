'use client';

import type { HeroSliderDTO } from '@/repository/hero-slider/dto';
import OrderedListManager from '@/shared/components/cms/OrderedListManager';
import ImageUploadField from '@/shared/components/cms/ImageUploadField';

type HeroSliderInput = Omit<HeroSliderDTO, 'id' | 'urutan'>;

type Props = {
  data: HeroSliderDTO[];
  onSimpan: (input: HeroSliderInput, id: string | null) => Promise<void>;
  onHapus: (id: string) => Promise<void>;
  onPindah: (id: string, arah: 'naik' | 'turun') => Promise<void>;
};

const inputCls =
  'mt-1 w-full text-sm border border-gray-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]';

export default function HeroSliderManager({ data, onSimpan, onHapus, onPindah }: Props) {
  return (
    <OrderedListManager<HeroSliderDTO, HeroSliderInput>
      data={data}
      labelTambah="+ Tambah Slide"
      kosong={() => ({
        judulAwal: '',
        judulSorot: '',
        judulAkhir: '',
        deskripsi: '',
        urlGambar: '',
        tombolTeks: '',
        tombolTautan: '',
      })}
      keItem={(_, item) => ({
        judulAwal: item.judulAwal,
        judulSorot: item.judulSorot,
        judulAkhir: item.judulAkhir,
        deskripsi: item.deskripsi,
        urlGambar: item.urlGambar,
        tombolTeks: item.tombolTeks,
        tombolTautan: item.tombolTautan,
      })}
      onSimpan={onSimpan}
      onHapus={onHapus}
      onPindah={onPindah}
      validasi={(d) => {
        if (!d.urlGambar.trim()) return 'Gambar wajib diunggah.';
        if (!d.judulSorot.trim() && !d.judulAwal.trim() && !d.judulAkhir.trim())
          return 'Setidaknya salah satu bagian judul wajib diisi.';
        return null;
      }}
      barisRingkas={(item) => (
        <div className="flex items-center gap-3">
          {item.urlGambar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.urlGambar}
              alt="Thumbnail"
              className="h-10 w-16 object-cover rounded shadow-sm"
            />
          ) : (
            <div className="h-10 w-16 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
              <span className="text-[10px] text-gray-400">No Img</span>
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[var(--color-primary-dark)]">
                {item.judulAwal}{' '}
                <span className="text-[var(--color-accent)]">{item.judulSorot}</span>{' '}
                {item.judulAkhir}
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] line-clamp-1 mt-0.5 max-w-lg">
              {item.deskripsi || '-'}
            </p>
          </div>
        </div>
      )}
      renderForm={(draft, setDraft) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block sm:col-span-2">
            <span className="text-xs font-medium text-[var(--color-text-muted)]">Judul Awal</span>
            <input
              type="text"
              value={draft.judulAwal}
              onChange={(e) => setDraft({ ...draft, judulAwal: e.target.value })}
              placeholder="Contoh: Sumberagung, Desa yang"
              className={inputCls}
            />
          </label>
          <label className="block sm:col-span-1">
            <span className="text-xs font-medium text-[var(--color-text-muted)]">
              Judul Sorot (Aksen)
            </span>
            <input
              type="text"
              value={draft.judulSorot}
              onChange={(e) => setDraft({ ...draft, judulSorot: e.target.value })}
              placeholder="Contoh: Tumbuh"
              className={inputCls}
            />
          </label>
          <label className="block sm:col-span-1">
            <span className="text-xs font-medium text-[var(--color-text-muted)]">Judul Akhir</span>
            <input
              type="text"
              value={draft.judulAkhir}
              onChange={(e) => setDraft({ ...draft, judulAkhir: e.target.value })}
              placeholder="Contoh: dari Sumber Kehidupan."
              className={inputCls}
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-xs font-medium text-[var(--color-text-muted)]">Deskripsi</span>
            <textarea
              rows={3}
              value={draft.deskripsi}
              onChange={(e) => setDraft({ ...draft, deskripsi: e.target.value })}
              className={inputCls}
            />
          </label>
          <label className="block sm:col-span-1">
            <span className="text-xs font-medium text-[var(--color-text-muted)]">Label Tombol</span>
            <input
              type="text"
              value={draft.tombolTeks}
              onChange={(e) => setDraft({ ...draft, tombolTeks: e.target.value })}
              placeholder="Contoh: Ajukan Surat"
              className={inputCls}
            />
          </label>
          <label className="block sm:col-span-1">
            <span className="text-xs font-medium text-[var(--color-text-muted)]">
              Tautan Tombol
            </span>
            <input
              type="text"
              value={draft.tombolTautan}
              onChange={(e) => setDraft({ ...draft, tombolTautan: e.target.value })}
              placeholder="Contoh: /pengajuan-surat"
              className={inputCls}
            />
          </label>
          <div className="block sm:col-span-2">
            <ImageUploadField
              label="Gambar Hero"
              value={draft.urlGambar}
              onChange={(url) => setDraft({ ...draft, urlGambar: url })}
              prefixNama="heroslider"
            />
          </div>
        </div>
      )}
    />
  );
}
