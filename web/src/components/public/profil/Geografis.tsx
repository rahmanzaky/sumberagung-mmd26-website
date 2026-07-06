const BATAS = [
  { arah: 'Utara', wilayah: 'Desa Tetangga Utara', icon: '⬆️' },
  { arah: 'Timur', wilayah: 'Desa Tetangga Timur', icon: '➡️' },
  { arah: 'Selatan', wilayah: 'Samudra Hindia', icon: '⬇️' },
  { arah: 'Barat', wilayah: 'Desa Tetangga Barat', icon: '⬅️' },
];

const DEMOGRAFI = [
  { label: 'Total Penduduk', value: '4.820 jiwa' },
  { label: 'Laki-laki', value: '2.430 jiwa' },
  { label: 'Perempuan', value: '2.390 jiwa' },
  { label: 'Kepala Keluarga', value: '1.510 KK' },
  { label: 'Luas Wilayah', value: '12 km²' },
  { label: 'Jumlah Dusun', value: '4 Dusun' },
];

export default function Geografis() {
  return (
    <section className="bg-[var(--color-surface-dark)] py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-[var(--color-earth)] uppercase tracking-wider">
            Wilayah
          </span>
          <h2 className="font-[var(--font-lora)] text-3xl font-bold text-[var(--color-primary)] mt-2">
            Geografis &amp; Demografis
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Batas wilayah */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-lg text-[var(--color-text-base)] mb-6">
              Batas Wilayah
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {BATAS.map((b) => (
                <div
                  key={b.arah}
                  className="flex items-center gap-3 p-4 rounded-xl bg-[var(--color-surface)] hover:bg-[var(--color-accent-light)] transition-colors"
                >
                  <span className="text-2xl" aria-hidden="true">
                    {b.icon}
                  </span>
                  <div>
                    <p className="text-xs text-[var(--color-earth)] font-medium">Sebelah {b.arah}</p>
                    <p className="text-sm font-semibold text-[var(--color-text-base)]">
                      {b.wilayah}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Demografi */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-lg text-[var(--color-text-base)] mb-6">
              Data Kependudukan
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              {DEMOGRAFI.map((d) => (
                <div key={d.label} className="border-l-2 border-[var(--color-accent)] pl-3">
                  <p className="font-[var(--font-lora)] text-xl font-bold text-[var(--color-primary)]">
                    {d.value}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">{d.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-[var(--color-text-muted)] mt-8 italic">
          Data merupakan ilustrasi dan akan disesuaikan dengan data resmi desa.
        </p>
      </div>
    </section>
  );
}
