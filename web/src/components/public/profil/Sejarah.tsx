const TIMELINE = [
  {
    tahun: '1901',
    judul: 'Awal Mula Permukiman',
    desc: 'Wilayah Sumberagung mulai dihuni oleh para pendatang yang membuka lahan pertanian di sekitar sumber mata air.',
  },
  {
    tahun: '1950',
    judul: 'Penetapan Nama Desa',
    desc: 'Nama "Sumberagung" resmi digunakan, bermakna sumber (mata air) yang agung dan melimpah bagi kehidupan warga.',
  },
  {
    tahun: '1980',
    judul: 'Pembangunan Infrastruktur',
    desc: 'Pembangunan jalan desa, saluran irigasi, dan fasilitas umum mulai digalakkan secara bertahap.',
  },
  {
    tahun: '2015',
    judul: 'Era Dana Desa',
    desc: 'Pemanfaatan Dana Desa mendorong percepatan pembangunan dan pemberdayaan ekonomi masyarakat.',
  },
  {
    tahun: '2026',
    judul: 'Transformasi Digital',
    desc: 'Desa Sumberagung menghadirkan layanan digital untuk pelayanan publik yang lebih transparan dan modern.',
  },
];

export default function Sejarah() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="max-w-3xl mb-12">
        <span className="text-sm font-medium text-[var(--color-earth)] uppercase tracking-wider">
          Sejarah
        </span>
        <h2 className="font-[var(--font-lora)] text-3xl font-bold text-[var(--color-primary)] mt-2 mb-4">
          Perjalanan Desa Sumberagung
        </h2>
        <p className="text-[var(--color-text-muted)] leading-relaxed">
          Desa Sumberagung memiliki sejarah panjang yang berakar dari kehidupan agraris
          masyarakat di sekitar sumber mata air. Dari generasi ke generasi, desa ini terus
          berkembang menjadi wilayah yang mandiri dan berbudaya.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--color-accent-light)] md:-translate-x-1/2" />
        <ul className="space-y-8">
          {TIMELINE.map((item, i) => (
            <li
              key={item.tahun}
              className={`relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8 ${
                i % 2 === 0 ? '' : 'md:[direction:rtl]'
              }`}
            >
              {/* Titik */}
              <span className="absolute left-4 md:left-1/2 top-1.5 w-4 h-4 rounded-full bg-[var(--color-primary)] border-4 border-[var(--color-surface)] md:-translate-x-1/2 z-10" />

              <div
                className={`md:[direction:ltr] group bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-[var(--color-accent)] transition-all ${
                  i % 2 === 0 ? 'md:text-right md:col-start-1' : 'md:col-start-2'
                }`}
              >
                <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold mb-2">
                  {item.tahun}
                </span>
                <h3 className="font-semibold text-[var(--color-text-base)] mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                  {item.judul}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
