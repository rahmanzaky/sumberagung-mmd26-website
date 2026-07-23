import Link from 'next/link';

export default function DetailBeritaSkeleton() {
    return (
        <section className="bg-[var(--color-primary)] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <div className="mx-auto max-w-6xl">
                {/* Breadcrumb Skeleton */}
                <nav className="flex items-center gap-2">
                    <div className="h-4 w-12 rounded bg-white/5 animate-pulse" />
                    <span aria-hidden="true" className="text-white/60">›</span>
                    <div className="h-4 w-20 rounded bg-white/5 animate-pulse" />
                    <span aria-hidden="true" className="text-white/60">›</span>
                    <div className="h-4 w-40 rounded bg-white/10 animate-pulse" />
                </nav>

                <div className="mt-8 grid gap-12 lg:grid-cols-3 lg:gap-10">
                    {/* Artikel Skeleton */}
                    <article className="lg:col-span-2">
                        <div className="flex flex-wrap items-center gap-4 animate-pulse">
                            <div className="h-6 w-20 rounded-full bg-[var(--color-accent)]/20" />
                            <div className="h-4 w-24 rounded bg-white/5" />
                            <div className="h-4 w-32 rounded bg-white/5" />
                        </div>

                        <div className="mt-5 h-10 w-3/4 rounded bg-white/10 animate-pulse" />
                        <div className="mt-2 h-10 w-1/2 rounded bg-white/10 animate-pulse" />

                        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-lg bg-white/5 animate-pulse" />

                        <div className="mt-8 space-y-4 animate-pulse">
                            <div className="h-4 w-full rounded bg-white/5" />
                            <div className="h-4 w-full rounded bg-white/5" />
                            <div className="h-4 w-11/12 rounded bg-white/5" />
                            <div className="h-4 w-full rounded bg-white/5" />
                            <div className="h-4 w-10/12 rounded bg-white/5" />
                            <br />
                            <div className="h-4 w-full rounded bg-white/5" />
                            <div className="h-4 w-9/12 rounded bg-white/5" />
                        </div>
                    </article>

                    {/* Sidebar Skeleton */}
                    <aside className="space-y-6 lg:col-span-1 animate-pulse">
                        <div className="rounded-lg bg-[var(--color-primary-dark)]/60 p-5">
                            <div className="h-6 w-24 rounded bg-white/10 mb-3" />
                            <div className="h-10 w-full rounded-md bg-white/5" />
                        </div>

                        <div>
                            <div className="flex items-center gap-2">
                                <span className="h-px w-5 bg-white/10" />
                                <div className="h-6 w-32 rounded bg-white/10" />
                            </div>

                            <ul className="mt-4 space-y-4">
                                {[1, 2, 3].map((item) => (
                                    <li key={item} className="flex gap-3">
                                        <div className="h-16 w-20 shrink-0 rounded-md bg-white/5" />
                                        <div className="w-full space-y-2 py-1">
                                            <div className="h-3 w-16 rounded bg-[var(--color-accent)]/20" />
                                            <div className="h-4 w-full rounded bg-white/10" />
                                            <div className="h-3 w-20 rounded bg-white/5" />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}
