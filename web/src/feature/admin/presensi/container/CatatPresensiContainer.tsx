import { getAbsensi, absenSekarangAction } from '@/repository/presensi/action';
import { requireAdmin } from '@/lib/guard';
import TombolAbsen from '../component/TombolAbsen';
import Link from 'next/link';

export default async function CatatPresensiContainer() {
  const [absensi, saya] = await Promise.all([getAbsensi(), requireAdmin()]);

  const hariIni = new Date().toLocaleDateString('en-CA');
  const absenSaya = absensi.find((a) => a.username === saya.username && a.tanggal === hariIni);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-[var(--font-lora)] text-2xl font-bold text-[var(--color-primary)] mb-1">
            Catat Kehadiran
          </h1>
          <p className="text-[var(--color-text-muted)] text-sm">
            Catat kehadiran harian dengan melampirkan foto bukti dan lokasi terkini.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="text-sm font-medium text-[var(--color-primary)] hover:underline"
        >
          &larr; Kembali ke Dashboard
        </Link>
      </div>

      <div className="max-w-2xl mx-auto mt-10">
        <TombolAbsen
          namaLengkap={saya.namaLengkap}
          sudahAbsen={!!absenSaya}
          jamAbsen={absenSaya?.jamMasuk ?? null}
          onAbsen={absenSekarangAction}
        />
      </div>
    </div>
  );
}
