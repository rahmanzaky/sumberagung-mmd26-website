import Navbar from '@/shared/components/Navbar/Navbar';
import Footer from '@/shared/components/Footer/Footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
