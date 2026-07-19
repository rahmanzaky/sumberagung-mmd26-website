'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { RingkasanKependudukan } from '@/repository/kependudukan/dto';

export default function PiramidaUsiaChart({ ringkasan }: { ringkasan: RingkasanKependudukan }) {
  const chartData = [
    { kelompok: 'Balita', jumlah: ringkasan.balita },
    { kelompok: 'Anak', jumlah: ringkasan.anak },
    { kelompok: 'Dewasa', jumlah: ringkasan.dewasa },
    { kelompok: 'Lansia', jumlah: ringkasan.lansia },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-[var(--color-text-base)] mb-4">
        Sebaran Kelompok Usia
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="kelompok" tick={{ fontSize: 11 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
            formatter={(v) => [v, 'Jiwa']}
          />
          <Bar dataKey="jumlah" fill="#1A2D5D" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
