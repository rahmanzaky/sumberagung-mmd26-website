export default function DetailKegiatanSkeleton() {
    return (
        <>
            <div className="relative flex h-[50vh] min-h-[400px] w-full items-center justify-center bg-white/5 animate-pulse overflow-hidden">
                <div className="text-center px-6">
                    <div className="mx-auto h-8 w-64 rounded bg-white/10 mb-4" />
                    <div className="mx-auto h-12 w-3/4 max-w-2xl rounded bg-white/10 mb-6" />
                    <div className="mx-auto h-4 w-48 rounded bg-white/5" />
                </div>
            </div>

            <section className="bg-[var(--color-primary)] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-10 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-3">
                                <span className="h-6 w-1 rounded-full bg-white/10 animate-pulse" />
                                <div className="h-6 w-48 rounded bg-white/10 animate-pulse" />
                            </div>
                            <div className="mt-5 space-y-4 animate-pulse">
                                <div className="h-4 w-full rounded bg-white/5" />
                                <div className="h-4 w-11/12 rounded bg-white/5" />
                                <div className="h-4 w-full rounded bg-white/5" />
                                <div className="h-4 w-5/6 rounded bg-white/5" />
                            </div>
                        </div>

                        <aside className="lg:col-span-1">
                            <div className="rounded-lg bg-[var(--color-primary-dark)]/60 p-5 animate-pulse">
                                <div className="h-5 w-32 rounded bg-white/10 mb-4" />
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="h-4 w-4 rounded bg-white/10" />
                                        <div className="flex-1 space-y-1">
                                            <div className="h-3 w-16 rounded bg-white/5" />
                                            <div className="h-4 w-24 rounded bg-white/10" />
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="h-4 w-4 rounded bg-white/10" />
                                        <div className="flex-1 space-y-1">
                                            <div className="h-3 w-16 rounded bg-white/5" />
                                            <div className="h-4 w-32 rounded bg-white/10" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>

                    <div className="mt-14 grid gap-10 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <div className="h-8 w-64 rounded bg-white/10 animate-pulse mb-5" />
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 animate-pulse">
                                <div className="aspect-[3/4] rounded-lg bg-white/5 sm:col-span-1 sm:row-span-2" />
                                <div className="aspect-square rounded-lg bg-white/5" />
                                <div className="aspect-square rounded-lg bg-white/5" />
                                <div className="aspect-[21/9] rounded-lg bg-white/5 sm:col-span-2" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
