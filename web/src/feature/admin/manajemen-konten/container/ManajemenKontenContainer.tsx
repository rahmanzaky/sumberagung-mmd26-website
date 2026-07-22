import {
  getKonten,
  simpanKontenAction,
  hapusKontenAction,
  toggleStatusKontenAction,
} from '@/repository/konten/action';
import KontenManager from '../component/KontenManager';

export default async function ManajemenKontenContainer() {
  const data = await getKonten();

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-[var(--font-lora)] text-2xl font-bold text-[var(--color-primary)] mb-1">
          Manajemen Konten
        </h1>
        <p className="text-[var(--color-text-muted)] text-sm">
          Kelola berita dan kegiatan desa yang tampil di halaman publik.
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <KontenManager
          data={data}
          onSimpan={simpanKontenAction}
          onHapus={hapusKontenAction}
          onToggleStatus={toggleStatusKontenAction}
        />
      </div>
    </div>
  );
}
