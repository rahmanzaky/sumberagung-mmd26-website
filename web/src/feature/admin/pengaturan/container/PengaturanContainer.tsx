import { getPengaturan, simpanPengaturanAction } from '@/repository/pengaturan/action';
import { requireAdmin } from '@/lib/guard';
import PengaturanForm from '../component/PengaturanForm';

export default async function PengaturanContainer() {
  const [pengaturan, saya] = await Promise.all([getPengaturan(), requireAdmin()]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-[var(--font-lora)] text-2xl font-bold text-[var(--color-primary)] mb-1">
          Pengaturan Sistem
        </h1>
        <p className="text-[var(--color-text-muted)] text-sm">
          Identitas desa, kontak resmi, dan jam layanan pengajuan surat.
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <PengaturanForm
          awal={pengaturan}
          bolehUbah={saya.role === 'Super Admin'}
          onSimpan={simpanPengaturanAction}
        />
      </div>
    </div>
  );
}
