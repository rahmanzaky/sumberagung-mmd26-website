type StatCardTone = 'default' | 'gold' | 'danger';

type StatCardProps = {
  icon: React.ReactNode; // komponen ikon dari @/shared/components/icons
  label: string; // deskripsi di bawah angka, mis. "Pengajuan Surat Baru"
  value: string | number;
  topLabel?: string; // chip kanan atas, mis. "Hari Ini" / "Hadir" / "Penting"
  tone?: StatCardTone;
};

const toneStyles: Record<
  StatCardTone,
  { value: string; chip: string; iconBg: string; iconColor: string; cardBorder: string }
> = {
  default: {
    value: 'text-[var(--color-primary-deepdark)]',
    chip: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
    iconBg: 'bg-gradient-to-br from-[var(--color-primary)]/20 to-blue-50/10 shadow-inner',
    iconColor: 'text-[var(--color-primary)]',
    cardBorder: 'hover:border-[var(--color-primary)]/30',
  },
  gold: {
    value: 'text-[var(--color-gold-dark)]',
    chip: 'bg-[var(--color-gold)]/15 text-[var(--color-gold-dark)]',
    iconBg: 'bg-gradient-to-br from-[var(--color-gold)]/20 to-yellow-50/10 shadow-inner',
    iconColor: 'text-[var(--color-gold-dark)]',
    cardBorder: 'hover:border-[var(--color-gold)]/40',
  },
  danger: {
    value: 'text-red-700',
    chip: 'bg-red-50 text-red-600',
    iconBg: 'bg-gradient-to-br from-red-100 to-red-50/10 shadow-inner',
    iconColor: 'text-red-600',
    cardBorder: 'hover:border-red-200',
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
    <div
      className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${styles.cardBorder} group relative overflow-hidden`}
    >
      {/* Decorative background glow */}
      <div
        className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-2xl opacity-20 ${styles.iconBg} transition-transform duration-500 group-hover:scale-150`}
      />

      <div className="flex items-start justify-between mb-4 relative z-10">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${styles.iconBg} ${styles.iconColor} shadow-sm group-hover:scale-110 transition-transform duration-300`}
          aria-hidden
        >
          {icon}
        </div>
        {topLabel && (
          <span
            className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${styles.chip} uppercase tracking-wider`}
          >
            {topLabel}
          </span>
        )}
      </div>
      <div className="relative z-10">
        <p className={`text-4xl font-[var(--font-lora)] font-bold mb-1 ${styles.value}`}>{value}</p>
        <p className="text-sm font-medium text-[var(--color-text-muted)]">{label}</p>
      </div>
    </div>
  );
}
