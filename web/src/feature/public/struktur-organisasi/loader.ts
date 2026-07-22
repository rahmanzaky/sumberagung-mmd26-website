import { getStruktur } from '@/repository/struktur/action';
import type { Jabatan } from '@/repository/struktur/dto';
import { SLOT } from '@/repository/struktur/dto';
import { urlFotoLangsung } from '@/lib/foto';
import type { KelompokPerangkat, Perangkat, StrukturOrganisasi } from './types';

// Data 100% dari CMS (Sheet). Penempatan di bagan ditentukan oleh `level`
// (slot 1–6) — bukan lagi menebak dari nama jabatan. Tidak ada lagi contoh
// statis; slot tunggal yang kosong diberi placeholder agar bagan tak error.

function keP(j: Jabatan): Perangkat {
  const foto = { src: j.urlFoto ? urlFotoLangsung(j.urlFoto) : '', alt: '' };

  // BPD = lembaga: tanpa nama pejabat; namaPejabat dipakai sebagai keterangan.
  if (j.level === SLOT.BPD) {
    foto.alt = j.namaPejabat || j.namaJabatan;
    return { id: j.id, jabatan: j.namaJabatan, keterangan: j.namaPejabat, foto };
  }

  // Kamituwo "Kamituwo Dusun X" → jabatan "Kamituwo" + keterangan "Dusun X".
  if (j.level === SLOT.KAMITUWO && /^kamituwo/i.test(j.namaJabatan)) {
    const ket = j.namaJabatan.replace(/^kamituwo\s*/i, '').trim();
    foto.alt = `${j.namaJabatan} ${j.namaPejabat}`.trim();
    return { id: j.id, jabatan: 'Kamituwo', keterangan: ket, nama: j.namaPejabat, foto };
  }

  foto.alt = `${j.namaJabatan} ${j.namaPejabat}`.trim();
  return { id: j.id, jabatan: j.namaJabatan, nama: j.namaPejabat, foto };
}

// Placeholder kosong agar slot tunggal (Kepala Desa/BPD/Sekretaris) tak error
// bila belum diisi di admin.
function kosong(id: string, jabatan: string): Perangkat {
  return { id, jabatan, foto: { src: '', alt: jabatan } };
}

export async function muatStruktur(): Promise<{
  struktur: StrukturOrganisasi;
  kelompokPerangkat: KelompokPerangkat[];
}> {
  const data = await getStruktur();
  const slot = (n: number) =>
    data.filter((j) => j.level === n).sort((a, b) => a.urutan - b.urutan);

  const kepalaDesa = slot(SLOT.KEPALA_DESA)[0];
  const bpd = slot(SLOT.BPD)[0];
  const sekretaris = slot(SLOT.SEKRETARIS)[0];

  const s: StrukturOrganisasi = {
    kepalaDesa: kepalaDesa ? keP(kepalaDesa) : kosong('kepala-desa', 'Kepala Desa'),
    bpd: bpd ? keP(bpd) : kosong('bpd', 'BPD'),
    sekretaris: sekretaris ? keP(sekretaris) : kosong('sekretaris', 'Sekretaris Desa'),
    kasi: slot(SLOT.KASI).map(keP),
    kaur: slot(SLOT.KAUR).map(keP),
    kamituwo: slot(SLOT.KAMITUWO).map(keP),
  };

  const kelompokPerangkat: KelompokPerangkat[] = [
    { label: 'Pimpinan Desa', anggota: [s.kepalaDesa, s.bpd] },
    { label: 'Sekretariat', anggota: [s.sekretaris] },
    { label: 'Kepala Seksi', anggota: s.kasi },
    { label: 'Kepala Urusan', anggota: s.kaur },
    { label: 'Kepala Dusun', anggota: s.kamituwo },
  ];

  return { struktur: s, kelompokPerangkat };
}
