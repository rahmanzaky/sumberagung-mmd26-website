import Link from 'next/link';

const menuItems = [
  { href: '/dashboard', label: 'Ringkasan', icon: '📊' },
  { href: '/dashboard/pengajuan-surat', label: 'Pengajuan Surat', icon: '📄' },
  { href: '/dashboard/kependudukan', label: 'Kependudukan', icon: '👥' },
  { href: '/dashboard/presensi', label: 'Presensi', icon: '🕒' },
  { href: '/dashboard/buku-tamu', label: 'Buku Tamu', icon: '📋' },
  { href: '/dashboard/konten', label: 'Manajemen Konten', icon: '📝' },
  { href: '/dashboard/galeri', label: 'Galeri', icon: '🖼️' },
  { href: '/dashboard/pengguna', label: 'Pengguna', icon: '🧑‍💻' },
  { href: '/dashboard/pengaturan', label: 'Pengaturan', icon: '⚙️' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[var(--color-primary-dark)] text-white flex flex-col min-h-screen">
      <div className="p-5 border-b border-[var(--color-primary)]">
        <p className="text-xs text-[var(--color-accent-light)] uppercase tracking-wider mb-1">
          Admin Panel
        </p>
        <p className="font-semibold text-[var(--color-accent)]">Desa Sumberagung</p>
      </div>
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-[var(--color-primary)] transition-colors"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-[var(--color-primary)]">
        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-[var(--color-primary)] hover:text-white transition-colors"
          >
            🚪 Keluar
          </button>
        </form>
      </div>
    </aside>
  );
}
