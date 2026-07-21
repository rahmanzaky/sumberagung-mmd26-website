import Navbar from '@/shared/components/Navbar/Navbar';
import Footer from '@/shared/components/Footer/Footer';
import { getPengaturan } from '@/repository/pengaturan/action';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const pengaturan = await getPengaturan();

  return (
    <>
      <Navbar pengaturan={pengaturan} />
      <main className="flex-1">{children}</main>
      <Footer pengaturan={pengaturan} />
    </>
  );
}
