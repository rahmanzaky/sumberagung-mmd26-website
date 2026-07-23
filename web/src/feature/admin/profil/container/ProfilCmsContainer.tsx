import {
  getProfilVisi,
  getMisi,
  simpanProfilVisiAction,
  simpanMisiAction,
  hapusMisiAction,
  pindahMisiAction,
} from '@/repository/profil/action';
import type { ProfilVisi } from '@/repository/profil/dto';
import RecordForm, { type Seksi } from '@/shared/components/cms/RecordForm';
import CmsHeader from '@/shared/components/cms/CmsHeader';
import MisiManager from '../component/MisiManager';

const seksiVisi: Seksi<ProfilVisi>[] = [
  {
    judul: 'Judul Halaman',
    fields: [
      { key: 'halamanJudul', label: 'Judul' },
      { key: 'halamanSubteks', label: 'Subteks', multiline: true },
    ],
  },
  {
    judul: 'Visi',
    fields: [{ key: 'visiKutipan', label: 'Kutipan Visi', multiline: true }],
  },
];

export default async function ProfilCmsContainer() {
  const [visi, misi] = await Promise.all([getProfilVisi(), getMisi()]);

  return (
    <div>
      <CmsHeader
        judul="Profil Desa"
        deskripsi="Kelola judul halaman, visi, dan daftar misi desa."
        lihatHref="/profil-desa"
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <RecordForm awal={visi} seksi={seksiVisi} onSimpan={simpanProfilVisiAction} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-sm font-semibold text-[var(--color-text-base)] mb-1">Daftar Misi</h2>
        <p className="text-xs text-[var(--color-text-muted)] mb-4">
          Gunakan tombol ↑ ↓ untuk mengatur urutan tampil di halaman publik.
        </p>
        <MisiManager
          data={misi}
          onSimpan={simpanMisiAction}
          onHapus={hapusMisiAction}
          onPindah={pindahMisiAction}
        />
      </div>
    </div>
  );
}
