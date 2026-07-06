export default function Spinner({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-gray-200 border-t-[var(--color-primary)] w-5 h-5 ${className}`}
      role="status"
      aria-label="Memuat..."
    />
  );
}
