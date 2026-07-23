import { muatStatistik } from '../loader';

export default async function StatistikDinamis() {
  const statistikDinamis = await muatStatistik();

  return (
    <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 border-white/15 [&>*:nth-child(even)]:border-l lg:grid-cols-4 lg:[&>*]:border-l lg:[&>*:first-child]:border-l-0">
      {statistikDinamis.map((item) => (
        <div key={item.id} className="border-white/15 text-center">
          <dd className="font-serif text-3xl font-bold text-[var(--color-accent)] sm:text-4xl">
            {item.nilai}
          </dd>
          <dt className="mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/80">
            {item.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
