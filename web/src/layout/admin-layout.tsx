import Sidebar from '@/shared/components/Sidebar/Sidebar';
import Topbar from '@/shared/components/Topbar/Topbar';
import { auth } from '@/lib/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const name = session?.user?.name ?? session?.user?.email ?? 'Admin Desa';

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar name={name} />
        <main className="flex-1 bg-[var(--color-surface)] p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
