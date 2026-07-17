import Badge from '@/shared/components/ui/Badge';
import type { StatusSurat } from '@/repository/pengajuan-surat/dto';

const statusMap: Record<
  StatusSurat,
  { label: string; variant: 'gray' | 'yellow' | 'green' | 'red' | 'blue' }
> = {
  Baru: { label: 'Baru', variant: 'blue' },
  Diproses: { label: 'Diproses', variant: 'yellow' },
  Selesai: { label: 'Selesai', variant: 'green' },
  Ditolak: { label: 'Ditolak', variant: 'red' },
};

export default function StatusBadge({ status }: { status: StatusSurat }) {
  const { label, variant } = statusMap[status];
  return <Badge label={label} variant={variant} />;
}
