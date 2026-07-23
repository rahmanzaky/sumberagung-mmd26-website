import DetailBeritaContainer from '@/feature/public/berita-desa/container/DetailBeritaContainer';

export default async function BeritaDesaDetailPage(props: PageProps<'/berita-desa/[id]'>) {
  const { id } = await props.params;
  return <DetailBeritaContainer id={id} />;
}
