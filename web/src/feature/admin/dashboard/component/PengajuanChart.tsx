'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { PengajuanSurat } from '@/repository/pengajuan-surat/dto';

const COLORS = ['#2D6A4F', '#74C69D', '#B5835A', '#40916C', '#D4A373', '#1B4332'];

function buildChartData(data: PengajuanSurat[]) {
  const counts: Record<string, number> = {};
  data.forEach(({ jenisSurat }) => {
    counts[jenisSurat] = (counts[jenisSurat] ?? 0) + 1;
  });
  return Object.entries(counts).map(([jenis, jumlah]) => ({ jenis, jumlah }));
}

export default function PengajuanChart({ data }: { data: PengajuanSurat[] }) {
  const chartData = buildChartData(data);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-[var(--color-text-base)] mb-4">
        Pengajuan per Jenis Surat
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 4, right: 8, left: 8, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
          <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
          <YAxis
            type="category"
            dataKey="jenis"
            width={160}
            tick={{ fontSize: 10 }}
            tickFormatter={(v: string) => (v.length > 22 ? v.slice(0, 22) + '…' : v)}
          />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
            formatter={(v) => [v, 'Pengajuan']}
          />
          <Bar dataKey="jumlah" radius={[0, 4, 4, 0]}>
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
