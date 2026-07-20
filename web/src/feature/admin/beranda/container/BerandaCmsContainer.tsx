import { getBeranda, simpanBerandaAction } from '@/repository/beranda/action';
import type { Beranda } from '@/repository/beranda/dto';
import RecordForm, { type Seksi } from '@/shared/components/cms/RecordForm';
import CmsHeader from '@/shared/components/cms/CmsHeader';

const seksi: Seksi<Beranda>[] = [
  {
    judul: 'Hero',
    keterangan:
      'Bagian paling atas halaman utama. Judul boleh memakai <em>kata</em> untuk memberi warna emas pada kata tertentu.',
    fields: [
      { key: 'heroEyebrow', label: 'Teks Kecil di Atas Judul' },
      { key: 'heroUrlGambar', label: 'Gambar Latar Hero', foto: true },
      { key: 'heroJudul', label: 'Judul Utama', multiline: true },
      { key: 'heroSubteks', label: 'Subteks', multiline: true },
      { key: 'heroCtaPrimerLabel', label: 'Tombol Utama — Teks' },
      { key: 'heroCtaPrimerHref', label: 'Tombol Utama — Tautan' },
      { key: 'heroCtaSekunderLabel', label: 'Tombol Kedua — Teks' },
      { key: 'heroCtaSekunderHref', label: 'Tombol Kedua — Tautan' },
    ],
  },
  {
    judul: 'Seksi Kegiatan',
    keterangan: 'Judul di atas 3 kartu kegiatan. Isi kartunya diatur di menu Konten & Berita.',
    fields: [
      { key: 'kegiatanJudul', label: 'Judul' },
      { key: 'kegiatanSubteks', label: 'Subteks', multiline: true },
    ],
  },
  {
    judul: 'Seksi Video Profil',
    fields: [
      { key: 'videoJudul', label: 'Judul' },
      { key: 'videoUrl', label: 'URL Video (embed)', type: 'url' },
      { key: 'videoSubteks', label: 'Subteks', multiline: true },
    ],
  },
  {
    judul: 'Footer',
    fields: [{ key: 'footerTagline', label: 'Tagline', multiline: true }],
  },
];

export default async function BerandaCmsContainer() {
  const data = await getBeranda();

  return (
    <div>
      <CmsHeader
        judul="Beranda"
        deskripsi="Kelola isi halaman utama: hero, seksi kegiatan, video profil, dan footer."
        lihatHref="/"
      />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <RecordForm awal={data} seksi={seksi} onSimpan={simpanBerandaAction} />
      </div>
    </div>
  );
}
