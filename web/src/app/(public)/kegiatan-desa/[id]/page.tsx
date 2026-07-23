import DetailKegiatanContainer from '@/feature/public/kegiatan-desa/container/DetailKegiatanContainer';

export default async function KegiatanDesaDetailPage(props: PageProps<'/kegiatan-desa/[id]'>) {
  const { id } = await props.params;
  return <DetailKegiatanContainer id={id} />;
}
