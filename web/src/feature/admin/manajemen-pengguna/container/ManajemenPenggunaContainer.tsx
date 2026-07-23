import {
  getPengguna,
  simpanPenggunaAction,
  hapusPenggunaAction,
} from '@/repository/pengguna/action';
import { requireAdmin } from '@/lib/guard';
import PenggunaManager from '../component/PenggunaManager';

export default async function ManajemenPenggunaContainer() {
  const [data, saya] = await Promise.all([getPengguna(), requireAdmin()]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-[var(--font-lora)] text-2xl font-bold text-[var(--color-primary)] mb-1">
          Manajemen Pengguna
        </h1>
        <p className="text-[var(--color-text-muted)] text-sm">
          Kelola hak akses dan akun admin/perangkat desa.
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <PenggunaManager
          data={data}
          bolehKelola={saya.role === 'Super Admin'}
          onSimpan={simpanPenggunaAction}
          onHapus={hapusPenggunaAction}
        />
      </div>
    </div>
  );
}
