type BadgeVariant = 'green' | 'yellow' | 'blue' | 'red' | 'gray';

const variantStyles: Record<BadgeVariant, string> = {
  green: 'bg-green-100 text-green-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  blue: 'bg-blue-100 text-blue-800',
  red: 'bg-red-100 text-red-800',
  gray: 'bg-gray-100 text-gray-600',
};

type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
};

export default function Badge({ label, variant = 'gray' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]}`}
    >
      {label}
    </span>
  );
}
