import { getBukuTamu } from '@/repository/buku-tamu/action';
import { getPengajuanSurat } from '@/repository/pengajuan-surat/action';
import { getRekapKehadiran } from '@/repository/presensi/action';
import StatCard from '../component/StatCard';
import { IconMasuk, IconPengguna, IconPeringatan } from '@/shared/components/icons';
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
  const [bukuTamu, pengajuan, rekap] = await Promise.all([
    getBukuTamu(),
    getPengajuanSurat(),
    getRekapKehadiran(),
  ]);

  const pengajuanBaru = pengajuan.filter((p) => p.status === 'Baru').length;
  const kehadiran = `${rekap.sudahAbsen}/${rekap.totalPerangkat}`;
  // Peringatan sistem = hal yang butuh perhatian admin hari ini:
  // perangkat yang belum absen + pengajuan surat yang masih berstatus "Baru".
  const belumAbsen = rekap.totalPerangkat - rekap.sudahAbsen;
  const peringatanSistem = belumAbsen + pengajuanBaru;

  return (
    <div>
      <h1 className="font-[var(--font-lora)] text-2xl font-bold text-[var(--color-gold-dark)] mb-1">
        Ringkasan Hari Ini
      </h1>
      <p className="text-[var(--color-text-muted)] text-sm mb-8 capitalize">{tanggalHariIni()}</p>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          icon={<IconMasuk className="w-5 h-5" />}
          label="Pengajuan Surat Baru"
          value={pengajuanBaru}
          topLabel="Hari Ini"
          tone="default"
        />
        <StatCard
          icon={<IconPengguna className="w-5 h-5" />}
          label="Status Kehadiran Perangkat"
          value={kehadiran}
          topLabel="Hadir"
          tone="gold"
        />
        <StatCard
          icon={<IconPeringatan className="w-5 h-5" />}
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
