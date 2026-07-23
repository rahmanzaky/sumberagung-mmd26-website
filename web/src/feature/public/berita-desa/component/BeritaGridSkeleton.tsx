export default function BeritaGridSkeleton() {
    return (
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="flex flex-col overflow-hidden rounded-lg bg-[var(--color-primary-dark)]/60 ring-1 ring-white/10 animate-pulse">
                    <div className="h-48 w-full bg-white/5" />
                    <div className="flex flex-1 flex-col p-6">
                        <div className="flex gap-2">
                            <div className="h-5 w-16 rounded bg-white/10" />
                            <div className="h-5 w-24 rounded bg-white/5" />
                        </div>
                        <div className="mt-4 h-6 w-3/4 rounded bg-white/10" />
                        <div className="mt-2 h-6 w-1/2 rounded bg-white/10" />
                        <div className="mt-4 space-y-2">
                            <div className="h-4 w-full rounded bg-white/5" />
                            <div className="h-4 w-5/6 rounded bg-white/5" />
                        </div>
                        <div className="mt-6 flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-white/10" />
                            <div className="h-4 w-24 rounded bg-white/5" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
