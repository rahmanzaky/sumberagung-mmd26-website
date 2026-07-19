import Sidebar from '@/shared/components/Sidebar/Sidebar';
import Topbar from '@/shared/components/Topbar/Topbar';
import { auth } from '@/lib/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const name = session?.user?.name ?? session?.user?.email ?? 'Admin Desa';

  // h-screen + overflow-hidden mengunci viewport, sehingga sidebar dan main
  // masing-masing punya scroll sendiri (scroll di nav tidak menggeser konten).
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <Topbar name={name} />
        <main className="flex-1 min-h-0 bg-[var(--color-surface)] p-8 overflow-y-auto overscroll-contain">
          {children}
        </main>
      </div>
    </div>
  );
}
