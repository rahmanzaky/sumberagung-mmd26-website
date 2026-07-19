import { getPresensi, updateStatusPresensiAction } from '@/repository/presensi/action';
import PresensiTable from '../component/PresensiTable';

export default async function PresensiContainer() {
  const data = await getPresensi();

  // Tanggal unik, terbaru dulu — dipakai sebagai opsi filter di tabel.
  const tanggalTersedia = [...new Set(data.map((p) => p.tanggal))].sort((a, b) =>
    b.localeCompare(a),
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-[var(--font-lora)] text-2xl font-bold text-[var(--color-primary)] mb-1">
          Presensi Perangkat Desa
        </h1>
        <p className="text-[var(--color-text-muted)] text-sm">
          Kelola data absensi harian perangkat desa.
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <PresensiTable
          data={data}
          tanggalTersedia={tanggalTersedia}
          onUpdateStatus={updateStatusPresensiAction}
        />
      </div>
    </div>
  );
}
