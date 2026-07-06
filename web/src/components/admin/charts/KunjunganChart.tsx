'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { BukuTamuEntry } from '@/types/buku-tamu';

function buildChartData(data: BukuTamuEntry[]) {
  const counts: Record<string, number> = {};
  data.forEach(({ tanggal }) => {
    const label = new Date(tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    counts[label] = (counts[label] ?? 0) + 1;
  });
  return Object.entries(counts).map(([tanggal, jumlah]) => ({ tanggal, jumlah }));
}

export default function KunjunganChart({ data }: { data: BukuTamuEntry[] }) {
  const chartData = buildChartData(data);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-[var(--color-text-base)] mb-4">
        Kunjungan per Hari (Bulan Ini)
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="tanggal" tick={{ fontSize: 11 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
            formatter={(v) => [v, 'Kunjungan']}
          />
          <Bar dataKey="jumlah" fill="#2D6A4F" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
