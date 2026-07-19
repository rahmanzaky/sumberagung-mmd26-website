import { getBukuTamu } from '@/repository/buku-tamu/action';
import BukuTamuManager from '../component/BukuTamuManager';

export default async function BukuTamuContainer() {
  const data = await getBukuTamu();

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-[var(--font-lora)] text-2xl font-bold text-[var(--color-gold-dark)] mb-1">
          Daftar Kunjungan Tamu
        </h1>
        <p className="text-[var(--color-text-muted)] text-sm">
          Total {data.length} kunjungan tercatat pada Buku Tamu Digital.
        </p>
      </div>
      <BukuTamuManager data={data} />
    </div>
  );
}
