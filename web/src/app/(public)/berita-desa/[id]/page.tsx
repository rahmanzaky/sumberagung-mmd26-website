import DetailBeritaContainer from '@/feature/public/berita-desa/container/DetailBeritaContainer';

// Konten dari CMS; segarkan tiap 60 detik (SRS SK-NF-04).
export const revalidate = 60;

export default async function BeritaDesaDetailPage(props: PageProps<'/berita-desa/[id]'>) {
  const { id } = await props.params;
  return <DetailBeritaContainer id={id} />;
}
