import { getRekapAbsensi, getAbsensi, absenSekarangAction } from '@/repository/presensi/action';
import { requireAdmin } from '@/lib/guard';
import TombolAbsen from '../component/TombolAbsen';
import RekapAbsensiTable from '../component/RekapAbsensiTable';

export default async function PresensiContainer() {
  const [rekap, absensi, saya] = await Promise.all([
    getRekapAbsensi(),
    getAbsensi(),
    requireAdmin(),
  ]);

  const hariIni = new Date().toLocaleDateString('en-CA');
  const absenSaya = absensi.find((a) => a.username === saya.username && a.tanggal === hariIni);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-[var(--font-lora)] text-2xl font-bold text-[var(--color-primary)] mb-1">
          Presensi Perangkat Desa
        </h1>
        <p className="text-[var(--color-text-muted)] text-sm">
          Catat absensi harian Anda dan lihat rekap kehadiran perangkat desa.
        </p>
      </div>

      <div className="mb-6">
        <TombolAbsen
          namaLengkap={saya.namaLengkap}
          sudahAbsen={!!absenSaya}
          jamAbsen={absenSaya?.jamMasuk ?? null}
          onAbsen={absenSekarangAction}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-sm font-semibold text-[var(--color-text-base)] mb-4">Rekap Absensi</h2>
        <RekapAbsensiTable data={rekap} />
      </div>
    </div>
  );
}
