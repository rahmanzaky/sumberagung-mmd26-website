import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-primary-dark)] text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-[var(--color-accent)] mb-2">Desa Sumberagung</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Kecamatan Panggungrejo, Kabupaten Blitar, Jawa Timur
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[var(--color-accent)] mb-2">Layanan Publik</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>
                <Link href="/pengajuan-surat" className="hover:text-white transition-colors">
                  Pengajuan Surat Online
                </Link>
              </li>
              <li>
                <Link href="/buku-tamu" className="hover:text-white transition-colors">
                  Buku Tamu Kunjungan
                </Link>
              </li>
              <li>
                <Link href="/profil-desa" className="hover:text-white transition-colors">
                  Profil Desa
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[var(--color-accent)] mb-2">Jam Pelayanan</h3>
            <p className="text-sm text-gray-300">Senin – Jumat: 08.00 – 13.00 WIB</p>
            <p className="text-sm text-gray-300">Tutup di luar jam kerja</p>
          </div>
        </div>
        <div className="border-t border-[var(--color-primary)] mt-6 pt-4 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Pemerintah Desa Sumberagung. Seluruh hak dilindungi.
        </div>
      </div>
    </footer>
  );
}
