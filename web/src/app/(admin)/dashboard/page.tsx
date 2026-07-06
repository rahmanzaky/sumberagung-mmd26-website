import { getBukuTamu } from '@/lib/apps-script';
import { getPengajuanSurat } from '@/lib/apps-script';
import StatCard from '@/components/admin/StatCard';
import KunjunganChart from '@/components/admin/charts/KunjunganChart';
import PengajuanChart from '@/components/admin/charts/PengajuanChart';

function getBulanIni() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

export default async function DashboardPage() {
  const [bukuTamu, pengajuan] = await Promise.all([getBukuTamu(), getPengajuanSurat()]);

  const bulanIni = getBulanIni();
  const kunjunganBulanIni = bukuTamu.filter((b) => b.tanggal.startsWith(bulanIni)).length;
  const pengajuanBaru = pengajuan.filter((p) => p.status === 'Baru').length;
  const pengajuanDiproses = pengajuan.filter((p) => p.status === 'Diproses').length;
  const pengajuanSelesai = pengajuan.filter((p) => p.status === 'Selesai').length;

  return (
    <div>
      <h1 className="font-[var(--font-lora)] text-2xl font-bold text-[var(--color-primary)] mb-1">
        Ringkasan
      </h1>
      <p className="text-[var(--color-text-muted)] text-sm mb-8">Data terkini Desa Sumberagung.</p>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Kunjungan Bulan Ini"
          value={kunjunganBulanIni}
          sub="Buku tamu digital"
          accent="primary"
        />
        <StatCard
          label="Pengajuan Baru"
          value={pengajuanBaru}
          sub="Menunggu diproses"
          accent="earth"
        />
        <StatCard
          label="Sedang Diproses"
          value={pengajuanDiproses}
          sub="Dalam penanganan"
          accent="accent"
        />
        <StatCard
          label="Selesai"
          value={pengajuanSelesai}
          sub="Surat selesai dikeluarkan"
          accent="primary"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <KunjunganChart data={bukuTamu} />
        <PengajuanChart data={pengajuan} />
      </div>
    </div>
  );
}
