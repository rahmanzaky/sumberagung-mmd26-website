export default function BerandaHeroSkeleton() {
  return (
    <section className="relative isolate min-h-[560px] overflow-hidden lg:min-h-[640px] bg-[var(--color-primary-dark)]">
      <div className="mx-auto flex min-h-[560px] max-w-6xl flex-col justify-center px-6 py-20 sm:px-8 lg:min-h-[640px] lg:px-12 animate-pulse">
        <div className="h-4 w-40 bg-white/20 rounded mb-6"></div>
        <div className="h-14 w-full max-w-xl bg-white/20 rounded mb-4"></div>
        <div className="h-14 w-3/4 max-w-lg bg-white/20 rounded mb-6"></div>
        <div className="h-4 w-full max-w-md bg-white/20 rounded mb-2"></div>
        <div className="h-4 w-5/6 max-w-md bg-white/20 rounded mb-8"></div>
        <div className="flex gap-4">
          <div className="h-12 w-40 bg-[var(--color-accent)]/50 rounded-md"></div>
          <div className="h-12 w-40 border border-[var(--color-accent)]/50 rounded-md"></div>
        </div>
      </div>
    </section>
  );
}
