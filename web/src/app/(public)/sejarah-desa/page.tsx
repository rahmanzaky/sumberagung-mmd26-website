import SejarahDesaContainer from '@/feature/public/sejarah-desa/container/SejarahDesaContainer';

// Konten dari CMS; segarkan tiap 60 detik (SRS SK-NF-04).
export const revalidate = 60;

export default function SejarahDesaPage() {
  return <SejarahDesaContainer />;
}
