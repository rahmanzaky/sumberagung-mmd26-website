import {
  getTimeline,
  simpanTimelineAction,
  hapusTimelineAction,
  pindahTimelineAction,
} from '@/repository/sejarah/action';
import CmsHeader from '@/shared/components/cms/CmsHeader';
import TimelineManager from '../component/TimelineManager';

export default async function SejarahCmsContainer() {
  const data = await getTimeline();

  return (
    <div>
      <CmsHeader
        judul="Sejarah Desa"
        deskripsi="Kelola entri timeline sejarah desa. Gunakan ↑ ↓ untuk mengatur urutan."
        lihatHref="/sejarah-desa"
      />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <TimelineManager
          data={data}
          onSimpan={simpanTimelineAction}
          onHapus={hapusTimelineAction}
          onPindah={pindahTimelineAction}
        />
      </div>
    </div>
  );
}
