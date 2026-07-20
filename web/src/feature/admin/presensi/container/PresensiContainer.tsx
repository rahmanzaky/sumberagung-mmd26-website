import { getRekapAbsensi } from '@/repository/presensi/action';
import RekapAbsensiTable from '../component/RekapAbsensiTable';

// Halaman Absensi Staf kini KHUSUS riwayat/rekap. Tombol absen dipindah ke
// Dashboard (shortcut) sesuai permintaan desa.
export default async function PresensiContainer() {
  const rekap = await getRekapAbsensi();

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-[var(--font-lora)] text-2xl font-bold text-[var(--color-primary)] mb-1">
          Riwayat Absensi
        </h1>
        <p className="text-[var(--color-text-muted)] text-sm">
          Rekap kehadiran perangkat desa. Untuk mencatat absensi, gunakan tombol di Dashboard.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <RekapAbsensiTable data={rekap} />
      </div>
    </div>
  );
}
