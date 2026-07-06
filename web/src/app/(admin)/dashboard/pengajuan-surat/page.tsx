import { getPengajuanSurat } from '@/lib/apps-script';
import PengajuanSuratTable from '@/components/admin/PengajuanSuratTable';
import { updateStatusAction } from '../actions';

export default async function PengajuanSuratPage() {
  const data = await getPengajuanSurat();

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-[var(--font-lora)] text-2xl font-bold text-[var(--color-primary)] mb-1">
          Pengajuan Surat
        </h1>
        <p className="text-[var(--color-text-muted)] text-sm">
          Kelola dan perbarui status pengajuan surat warga.
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <PengajuanSuratTable data={data} onUpdateStatus={updateStatusAction} />
      </div>
    </div>
  );
}
