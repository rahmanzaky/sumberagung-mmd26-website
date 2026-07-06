'use client';

import { useEffect, useRef, useState } from 'react';

type Stat = {
  label: string;
  value: number;
  suffix?: string;
  icon: string;
};

const STATS: Stat[] = [
  { label: 'Jumlah Penduduk', value: 4820, suffix: ' jiwa', icon: '👥' },
  { label: 'Luas Wilayah', value: 12, suffix: ' km²', icon: '🗺️' },
  { label: 'Jumlah Dusun', value: 4, suffix: ' dusun', icon: '🏘️' },
  { label: 'Pelaku UMKM', value: 68, suffix: '+', icon: '🛒' },
];

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, duration]);

  return count;
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const count = useCountUp(stat.value, active);
  return (
    <div className="text-center group">
      <div className="text-4xl mb-3 transition-transform group-hover:scale-110">{stat.icon}</div>
      <p className="font-[var(--font-lora)] text-3xl md:text-4xl font-bold text-[var(--color-primary)]">
        {count.toLocaleString('id-ID')}
        <span className="text-xl text-[var(--color-earth)]">{stat.suffix}</span>
      </p>
      <p className="text-sm text-[var(--color-text-muted)] mt-1">{stat.label}</p>
    </div>
  );
}

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 -mt-12 relative z-10">
      <div
        ref={ref}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {STATS.map((stat) => (
          <StatItem key={stat.label} stat={stat} active={active} />
        ))}
      </div>
    </section>
  );
}
