'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { KependudukanTahun } from '@/repository/kependudukan/dto';

export default function TrenPendudukChart({ data }: { data: KependudukanTahun[] }) {
  // Chart dibaca kiri→kanan dari tahun terlama, sedangkan tabel terbaru dulu.
  const chartData = [...data]
    .sort((a, b) => a.tahun - b.tahun)
    .map((d) => ({
      tahun: String(d.tahun),
      'Laki-laki': d.lakiLaki,
      Perempuan: d.perempuan,
    }));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-[var(--color-text-base)] mb-4">
        Tren Penduduk per Tahun
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="tahun" tick={{ fontSize: 11 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
            formatter={(v) => Number(v ?? 0).toLocaleString('id-ID')}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="Laki-laki" fill="#1A2D5D" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Perempuan" fill="#C9A227" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
