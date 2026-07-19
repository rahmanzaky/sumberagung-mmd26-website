import { getKependudukan, getRingkasanKependudukan } from '@/repository/kependudukan/action';
import StatCard from '@/feature/admin/dashboard/component/StatCard';
import KependudukanTable from '../component/KependudukanTable';
import PiramidaUsiaChart from '../component/PiramidaUsiaChart';

function angka(n: number) {
  return n.toLocaleString('id-ID');
}

export default async function KependudukanContainer() {
  const [data, ringkasan] = await Promise.all([getKependudukan(), getRingkasanKependudukan()]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-[var(--font-lora)] text-2xl font-bold text-[var(--color-primary)] mb-1">
          Data Kependudukan
        </h1>
        <p className="text-[var(--color-text-muted)] text-sm">
          Kelola data demografi dan kependudukan warga desa.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          icon="🧑‍🤝‍🧑"
          label="Total Penduduk"
          value={angka(ringkasan.totalPenduduk)}
          topLabel="Jiwa"
          tone="default"
        />
        <StatCard
          icon="🏠"
          label="Kepala Keluarga"
          value={angka(ringkasan.totalKK)}
          topLabel="KK"
          tone="gold"
        />
        <StatCard
          icon="⚖️"
          label="Laki-laki / Perempuan"
          value={`${angka(ringkasan.lakiLaki)} / ${angka(ringkasan.perempuan)}`}
          topLabel="Rasio"
          tone="default"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-semibold text-[var(--color-text-base)] mb-4">
            Rekap per Dusun
          </h3>
          <KependudukanTable data={data} />
        </div>
        <PiramidaUsiaChart ringkasan={ringkasan} />
      </div>
    </div>
  );
}
