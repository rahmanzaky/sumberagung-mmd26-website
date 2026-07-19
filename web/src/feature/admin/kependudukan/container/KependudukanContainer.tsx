import { getKependudukan, simpanKependudukanAction } from '@/repository/kependudukan/action';
import StatCard from '@/feature/admin/dashboard/component/StatCard';
import { IconPengguna, IconRumah, IconPeta } from '@/shared/components/icons';
import KependudukanManager from '../component/KependudukanManager';
import TrenPendudukChart from '../component/TrenPendudukChart';

function angka(n: number) {
  return n.toLocaleString('id-ID');
}

export default async function KependudukanContainer() {
  const data = await getKependudukan();
  const terbaru = data[0] ?? null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-[var(--font-lora)] text-2xl font-bold text-[var(--color-primary)] mb-1">
          Data Kependudukan
        </h1>
        <p className="text-[var(--color-text-muted)] text-sm">
          Kelola data statistik warga yang ditampilkan di halaman publik.
        </p>
      </div>

      {terbaru && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard
            icon={<IconPengguna className="w-5 h-5" />}
            label="Total Penduduk"
            value={angka(terbaru.totalPenduduk)}
            topLabel={`Tahun ${terbaru.tahun}`}
            tone="default"
          />
          <StatCard
            icon={<IconRumah className="w-5 h-5" />}
            label="Kepala Keluarga"
            value={angka(terbaru.jumlahKK)}
            topLabel="KK"
            tone="gold"
          />
          <StatCard
            icon={<IconPeta className="w-5 h-5" />}
            label="Jumlah RT / RW"
            value={`${terbaru.jumlahRt} / ${terbaru.jumlahRw}`}
            topLabel="Wilayah"
            tone="default"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <TrenPendudukChart data={data} />
        {terbaru && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-[var(--color-text-base)] mb-4">
              Komposisi Tahun {terbaru.tahun}
            </h3>
            <Komposisi
              lakiLaki={terbaru.lakiLaki}
              perempuan={terbaru.perempuan}
              total={terbaru.totalPenduduk}
            />
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-sm font-semibold text-[var(--color-text-base)] mb-4">
          Riwayat Data per Tahun
        </h3>
        <KependudukanManager data={data} onSimpan={simpanKependudukanAction} />
      </div>
    </div>
  );
}

function Komposisi({
  lakiLaki,
  perempuan,
  total,
}: {
  lakiLaki: number;
  perempuan: number;
  total: number;
}) {
  // Bagi berdasarkan total laki-laki + perempuan supaya bar selalu penuh 100%,
  // meski totalPenduduk sempat tidak sinkron.
  const jumlah = lakiLaki + perempuan || 1;
  const persenL = (lakiLaki / jumlah) * 100;

  return (
    <div>
      <div className="flex h-4 rounded-full overflow-hidden mb-3">
        <div className="bg-[var(--color-primary)]" style={{ width: `${persenL}%` }} />
        <div className="bg-[var(--color-gold)]" style={{ width: `${100 - persenL}%` }} />
      </div>
      <dl className="space-y-2 text-sm">
        <Baris
          warna="bg-[var(--color-primary)]"
          label="Laki-laki"
          nilai={lakiLaki}
          total={jumlah}
        />
        <Baris warna="bg-[var(--color-gold)]" label="Perempuan" nilai={perempuan} total={jumlah} />
        <div className="pt-2 border-t border-gray-100 flex justify-between">
          <dt className="text-[var(--color-text-muted)]">Total penduduk</dt>
          <dd className="font-semibold text-[var(--color-text-base)] tabular-nums">
            {total.toLocaleString('id-ID')}
          </dd>
        </div>
      </dl>
    </div>
  );
}

function Baris({
  warna,
  label,
  nilai,
  total,
}: {
  warna: string;
  label: string;
  nilai: number;
  total: number;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className="flex items-center gap-2 text-[var(--color-text-muted)]">
        <span className={`w-2.5 h-2.5 rounded-full ${warna}`} />
        {label}
      </dt>
      <dd className="tabular-nums text-[var(--color-text-base)]">
        {nilai.toLocaleString('id-ID')}{' '}
        <span className="text-[var(--color-text-muted)] text-xs">
          ({((nilai / total) * 100).toFixed(1)}%)
        </span>
      </dd>
    </div>
  );
}
