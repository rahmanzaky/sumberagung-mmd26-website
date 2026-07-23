import DaftarBeritaContainer from '@/feature/public/berita-desa/container/DaftarBeritaContainer';

// Konten dari CMS; segarkan tiap 60 detik (SRS SK-NF-04).
export const revalidate = 60;

export default function BeritaDesaListPage() {
  return <DaftarBeritaContainer />;
}
