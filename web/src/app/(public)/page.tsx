import BerandaContainer from '@/feature/public/beranda/container/BerandaContainer';

// Konten dari CMS; segarkan tiap 60 detik (SRS SK-NF-04).
export const revalidate = 60;

export default function BerandaPage() {
  return <BerandaContainer />;
}
