type StatCardTone = 'default' | 'gold' | 'danger';

type StatCardProps = {
  icon: string;
  label: string; // deskripsi di bawah angka, mis. "Pengajuan Surat Baru"
  value: string | number;
  topLabel?: string; // chip kanan atas, mis. "Hari Ini" / "Hadir" / "Penting"
  tone?: StatCardTone;
};

const toneStyles: Record<StatCardTone, { value: string; chip: string; iconBg: string }> = {
  default: {
    value: 'text-[var(--color-primary)]',
    chip: 'bg-[var(--color-surface-dark)] text-[var(--color-text-muted)]',
    iconBg: 'bg-[var(--color-primary)]/10',
  },
  gold: {
    value: 'text-[var(--color-gold-dark)]',
    chip: 'bg-[var(--color-gold)]/15 text-[var(--color-gold-dark)]',
    iconBg: 'bg-[var(--color-gold)]/15',
  },
  danger: {
    value: 'text-red-600',
    chip: 'bg-red-50 text-red-600',
    iconBg: 'bg-red-50',
  },
};

export default function StatCard({
  icon,
  label,
  value,
  topLabel,
  tone = 'default',
}: StatCardProps) {
  const styles = toneStyles[tone];

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${styles.iconBg}`}
          aria-hidden
        >
          {icon}
        </div>
        {topLabel && (
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${styles.chip}`}>
            {topLabel}
          </span>
        )}
      </div>
      <p className={`text-3xl font-bold ${styles.value}`}>{value}</p>
      <p className="text-sm text-[var(--color-text-muted)] mt-1">{label}</p>
    </div>
  );
}
