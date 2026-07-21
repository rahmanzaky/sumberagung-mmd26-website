import Link from 'next/link';
import { IconCentang } from '@/shared/components/icons';

type Props = {
  namaLengkap: string;
  sudahAbsen: boolean;
  jamAbsen: string | null;
};

export default function NoticeAbsen({ namaLengkap, sudahAbsen, jamAbsen }: Props) {
  if (sudahAbsen) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
            <IconCentang className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--color-text-base)]">
              Absensi hari ini sudah tercatat
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">
              {namaLengkap}
              {jamAbsen ? ` — masuk pukul ${jamAbsen} WIB` : ''}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href="/dashboard/presensi/catat"
      className="block relative bg-white rounded-xl shadow-lg border border-[var(--color-primary)]/20 p-6 overflow-hidden transition-all duration-300 hover:shadow-xl group"
    >
      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[var(--color-primary)] to-blue-400" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
          <span className="text-xl">👋</span>
        </div>
        <p className="text-lg font-bold text-[var(--color-text-base)]">Yuk, Absen Dulu!</p>
      </div>
      <p className="text-sm text-[var(--color-text-muted)] pl-13">
        Halo <strong className="text-[var(--color-text-base)]">{namaLengkap}</strong>, kamu belum
        mencatat kehadiran hari ini.
      </p>
      <div className="mt-4 pl-13 flex items-center text-sm font-medium text-[var(--color-primary)]">
        Klik di sini untuk absen{' '}
        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </Link>
  );
}
