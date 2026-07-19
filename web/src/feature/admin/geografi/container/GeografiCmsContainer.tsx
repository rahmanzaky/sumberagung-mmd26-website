import { getGeografi, simpanGeografiAction } from '@/repository/geografi/action';
import type { Geografi } from '@/repository/geografi/dto';
import RecordForm, { type Seksi } from '@/shared/components/cms/RecordForm';
import CmsHeader from '@/shared/components/cms/CmsHeader';

const seksi: Seksi<Geografi>[] = [
  {
    judul: 'Judul Halaman',
    fields: [
      { key: 'halamanJudul', label: 'Judul' },
      { key: 'halamanSubteks', label: 'Subteks', multiline: true },
    ],
  },
  {
    judul: 'Letak Astronomis & Topografi',
    keterangan:
      'Periksa ulang koordinat & angka luas — data awal diambil dari mockup dan belum tentu resmi.',
    fields: [
      { key: 'koordinat', label: 'Koordinat', lebar: 'penuh' },
      { key: 'ketinggian', label: 'Ketinggian' },
      { key: 'posisi', label: 'Posisi' },
      { key: 'narasiTopografi', label: 'Narasi Topografi', multiline: true },
      { key: 'urlPeta', label: 'URL Gambar Peta', type: 'url', lebar: 'penuh' },
    ],
  },
  {
    judul: 'Batas Wilayah',
    fields: [
      { key: 'batasUtara', label: 'Utara' },
      { key: 'batasSelatan', label: 'Selatan' },
      { key: 'batasTimur', label: 'Timur' },
      { key: 'batasBarat', label: 'Barat' },
    ],
  },
  {
    judul: 'Statistik Luas Wilayah',
    fields: [
      { key: 'luasTotal', label: 'Luas Total' },
      { key: 'luasTanahKering', label: 'Tanah Kering' },
      { key: 'luasHutanNegara', label: 'Hutan Negara' },
      { key: 'luasSawah', label: 'Tanah Sawah' },
    ],
  },
];

export default async function GeografiCmsContainer() {
  const data = await getGeografi();

  return (
    <div>
      <CmsHeader
        judul="Geografi Desa"
        deskripsi="Kelola letak, topografi, batas wilayah, dan statistik luas lahan."
        lihatHref="/profil-desa"
      />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <RecordForm awal={data} seksi={seksi} onSimpan={simpanGeografiAction} />
      </div>
    </div>
  );
}
