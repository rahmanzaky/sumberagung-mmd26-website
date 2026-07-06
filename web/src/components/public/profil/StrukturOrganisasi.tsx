type Perangkat = {
  jabatan: string;
  nama: string;
};

const KEPALA: Perangkat = { jabatan: 'Kepala Desa', nama: 'Nama Kepala Desa' };
const SEKRETARIS: Perangkat = { jabatan: 'Sekretaris Desa', nama: 'Nama Sekretaris' };

const KAUR: Perangkat[] = [
  { jabatan: 'Kaur Keuangan', nama: 'Nama Perangkat' },
  { jabatan: 'Kaur Umum & TU', nama: 'Nama Perangkat' },
  { jabatan: 'Kaur Perencanaan', nama: 'Nama Perangkat' },
];

const KASI: Perangkat[] = [
  { jabatan: 'Kasi Pemerintahan', nama: 'Nama Perangkat' },
  { jabatan: 'Kasi Kesejahteraan', nama: 'Nama Perangkat' },
  { jabatan: 'Kasi Pelayanan', nama: 'Nama Perangkat' },
];

const KADUS: Perangkat[] = [
  { jabatan: 'Kepala Dusun I', nama: 'Nama Perangkat' },
  { jabatan: 'Kepala Dusun II', nama: 'Nama Perangkat' },
  { jabatan: 'Kepala Dusun III', nama: 'Nama Perangkat' },
  { jabatan: 'Kepala Dusun IV', nama: 'Nama Perangkat' },
];

function Card({ perangkat, highlight }: { perangkat: Perangkat; highlight?: boolean }) {
  return (
    <div
      className={`group rounded-xl p-4 text-center border transition-all hover:-translate-y-1 hover:shadow-md ${
        highlight
          ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-lg'
          : 'bg-white border-gray-100 shadow-sm hover:border-[var(--color-accent)]'
      }`}
    >
      <div
        className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-xl ${
          highlight ? 'bg-white/20' : 'bg-[var(--color-surface)]'
        }`}
        aria-hidden="true"
      >
        👤
      </div>
      <p
        className={`text-xs font-medium mb-0.5 ${
          highlight ? 'text-[var(--color-accent-light)]' : 'text-[var(--color-earth)]'
        }`}
      >
        {perangkat.jabatan}
      </p>
      <p
        className={`text-sm font-semibold ${highlight ? 'text-white' : 'text-[var(--color-text-base)]'}`}
      >
        {perangkat.nama}
      </p>
    </div>
  );
}

function Group({ title, items }: { title: string; items: Perangkat[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4 text-center">
        {title}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((p) => (
          <Card key={p.jabatan} perangkat={p} />
        ))}
      </div>
    </div>
  );
}

export default function StrukturOrganisasi() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <span className="text-sm font-medium text-[var(--color-earth)] uppercase tracking-wider">
          Pemerintahan
        </span>
        <h2 className="font-[var(--font-lora)] text-3xl font-bold text-[var(--color-primary)] mt-2 mb-3">
          Struktur Organisasi Desa
        </h2>
        <p className="text-[var(--color-text-muted)] max-w-xl mx-auto">
          Susunan perangkat Desa Sumberagung yang melayani masyarakat.
        </p>
      </div>

      {/* Pucuk pimpinan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto mb-12">
        <Card perangkat={KEPALA} highlight />
        <Card perangkat={SEKRETARIS} />
      </div>

      <div className="space-y-10">
        <Group title="Kepala Urusan" items={KAUR} />
        <Group title="Kepala Seksi" items={KASI} />
        <Group title="Kepala Dusun" items={KADUS} />
      </div>

      <p className="text-center text-xs text-[var(--color-text-muted)] mt-10 italic">
        Nama perangkat desa akan diperbarui sesuai data resmi.
      </p>
    </section>
  );
}
