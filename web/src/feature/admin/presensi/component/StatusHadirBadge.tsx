import Badge from '@/shared/components/ui/Badge';
import type { StatusHadir } from '@/repository/presensi/dto';

const statusMap: Record<
  StatusHadir,
  { label: string; variant: 'gray' | 'yellow' | 'green' | 'red' | 'blue' }
> = {
  Hadir: { label: 'Hadir', variant: 'green' },
  Izin: { label: 'Izin', variant: 'blue' },
  Sakit: { label: 'Sakit', variant: 'yellow' },
  Alpha: { label: 'Alpha', variant: 'red' },
};

export default function StatusHadirBadge({ status }: { status: StatusHadir }) {
  const { label, variant } = statusMap[status];
  return <Badge label={label} variant={variant} />;
}
