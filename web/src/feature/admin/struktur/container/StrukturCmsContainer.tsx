import {
  getStruktur,
  simpanJabatanAction,
  hapusJabatanAction,
  pindahJabatanAction,
} from '@/repository/struktur/action';
import CmsHeader from '@/shared/components/cms/CmsHeader';
import StrukturManager from '../component/StrukturManager';

export default async function StrukturCmsContainer() {
  const data = await getStruktur();

  return (
    <div>
      <CmsHeader
        judul="Struktur Organisasi"
        deskripsi="Kelola bagan perangkat desa. Dikelompokkan per tingkatan; ↑ ↓ menggeser dalam satu tingkatan."
        lihatHref="/struktur-organisasi"
      />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <p className="mb-4 text-xs bg-blue-50 border border-blue-200 text-blue-800 rounded-lg px-3 py-2">
          Data ini terpisah dari menu <strong>Pengguna</strong>. Di sini untuk bagan publik
          (termasuk orang tanpa akun login seperti BPD & Kamituwo); menu Pengguna khusus akun yang
          bisa masuk dashboard.
        </p>
        <StrukturManager
          data={data}
          onSimpan={simpanJabatanAction}
          onHapus={hapusJabatanAction}
          onPindah={pindahJabatanAction}
        />
      </div>
    </div>
  );
}
