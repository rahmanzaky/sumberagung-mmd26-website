type StatCardProps = {
  label: string;
  value: string | number;
  sub?: string;
  accent?: 'primary' | 'earth' | 'accent';
};

const accentColor = {
  primary: 'text-[var(--color-primary)]',
  earth: 'text-[var(--color-earth)]',
  accent: 'text-[var(--color-accent)]',
};

export default function StatCard({ label, value, sub, accent = 'primary' }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className={`text-3xl font-bold ${accentColor[accent]}`}>{value}</p>
      {sub && <p className="text-xs text-[var(--color-text-muted)] mt-1">{sub}</p>}
    </div>
  );
}
