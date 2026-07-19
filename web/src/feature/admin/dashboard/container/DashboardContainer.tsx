import { getBukuTamu } from '@/repository/buku-tamu/action';
import { getPengajuanSurat } from '@/repository/pengajuan-surat/action';
import StatCard from '../component/StatCard';
import PengajuanTerbaru from '../component/PengajuanTerbaru';
import KunjunganChart from '../component/KunjunganChart';
import PengajuanChart from '../component/PengajuanChart';

function tanggalHariIni() {
  return new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function DashboardContainer() {
  const [bukuTamu, pengajuan] = await Promise.all([getBukuTamu(), getPengajuanSurat()]);

  const pengajuanBaru = pengajuan.filter((p) => p.status === 'Baru').length;
  // Status kehadiran & peringatan sistem menunggu backend Presensi/Monitoring (TBD) —
  // sementara memakai nilai placeholder agar tata letak sesuai desain.
  const kehadiran = '45/48';
  const peringatanSistem = 3;

  return (
    <div>
      <h1 className="font-[var(--font-lora)] text-2xl font-bold text-[var(--color-gold-dark)] mb-1">
        Ringkasan Hari Ini
      </h1>
      <p className="text-[var(--color-text-muted)] text-sm mb-8 capitalize">{tanggalHariIni()}</p>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          icon="📥"
          label="Pengajuan Surat Baru"
          value={pengajuanBaru}
          topLabel="Hari Ini"
          tone="default"
        />
        <StatCard
          icon="👥"
          label="Status Kehadiran Perangkat"
          value={kehadiran}
          topLabel="Hadir"
          tone="gold"
        />
        <StatCard
          icon="⚠️"
          label="Peringatan Sistem Baru"
          value={peringatanSistem}
          topLabel="Penting"
          tone="danger"
        />
      </div>

      {/* Pengajuan Terbaru */}
      <div className="mb-8">
        <PengajuanTerbaru data={pengajuan} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <KunjunganChart data={bukuTamu} />
        <PengajuanChart data={pengajuan} />
      </div>
    </div>
  );
}
