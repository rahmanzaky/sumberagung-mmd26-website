export default function StatistikSkeleton() {
  return (
    <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 border-white/15 [&>*:nth-child(even)]:border-l lg:grid-cols-4 lg:[&>*]:border-l lg:[&>*:first-child]:border-l-0">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="border-white/15 text-center flex flex-col items-center justify-center space-y-3">
          <div className="h-10 w-24 rounded bg-white/5 animate-pulse" />
          <div className="h-3 w-16 rounded bg-white/5 animate-pulse" />
        </div>
      ))}
    </dl>
  );
}
