import { getBukuTamu } from '@/repository/buku-tamu/action';
import BukuTamuTable from '../component/BukuTamuTable';

export default async function BukuTamuContainer() {
  const data = await getBukuTamu();

  const totalBulanIni = data.filter((b) => {
    const bulanIni = new Date().toISOString().slice(0, 7);
    return b.tanggal.startsWith(bulanIni);
  }).length;

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-[var(--font-lora)] text-2xl font-bold text-[var(--color-primary)] mb-1">
            Buku Tamu Digital
          </h1>
          <p className="text-[var(--color-text-muted)] text-sm">
            Total {data.length} kunjungan tercatat &mdash; {totalBulanIni} kunjungan bulan ini.
          </p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <BukuTamuTable data={data} />
      </div>
    </div>
  );
}
