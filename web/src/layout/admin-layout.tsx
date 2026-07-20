import Sidebar from '@/shared/components/Sidebar/Sidebar';
import Topbar from '@/shared/components/Topbar/Topbar';
import { auth } from '@/lib/auth';
import { penggunaSaya } from '@/lib/guard';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const [session, saya] = await Promise.all([auth(), penggunaSaya()]);
  const name = saya?.namaLengkap ?? session?.user?.name ?? session?.user?.email ?? 'Admin Desa';
  const role = saya?.role ?? 'Admin'; // fallback aman bila belum terdaftar

  // h-screen + overflow-hidden mengunci viewport, sehingga sidebar dan main
  // masing-masing punya scroll sendiri (scroll di nav tidak menggeser konten).
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <Topbar name={name} role={role} />
        <main className="flex-1 min-h-0 bg-[var(--color-surface)] p-8 overflow-y-auto overscroll-contain">
          {children}
        </main>
      </div>
    </div>
  );
}
