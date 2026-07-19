import { getGaleri, simpanFotoAction, hapusFotoAction } from '@/repository/galeri/action';
import GaleriManager from '../component/GaleriManager';

export default async function GaleriContainer() {
  const data = await getGaleri();

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-[var(--font-lora)] text-2xl font-bold text-[var(--color-primary)] mb-1">
          Galeri Desa
        </h1>
        <p className="text-[var(--color-text-muted)] text-sm">
          Kelola foto dan dokumentasi kegiatan desa.
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <GaleriManager data={data} onSimpan={simpanFotoAction} onHapus={hapusFotoAction} />
      </div>
    </div>
  );
}
