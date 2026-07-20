import { getStruktur } from '@/repository/struktur/action';
import type { Jabatan } from '@/repository/struktur/dto';
import { urlFotoLangsung } from '@/lib/foto';
import { struktur as strukturStatis, kelompokPerangkat as kelompokStatis } from './data';
import type { KelompokPerangkat, Perangkat, StrukturOrganisasi } from './types';

// Klasifikasi list datar CMS (level + nama jabatan) ke slot bagan FE.
// Mengandalkan konvensi penamaan yang dipakai form admin & data contoh:
// level 1 = BPD / Kepala Desa, 2 = Sekretaris, 3 = Kasi/Kaur, 4 = Kamituwo.

function keP(j: Jabatan): Perangkat {
  const foto = { src: j.urlFoto ? urlFotoLangsung(j.urlFoto) : '', alt: '' };

  // BPD = lembaga: tanpa nama pejabat; namaPejabat dipakai sebagai keterangan.
  if (/bpd/i.test(j.namaJabatan)) {
    foto.alt = j.namaPejabat || j.namaJabatan;
    return { id: j.id, jabatan: j.namaJabatan, keterangan: j.namaPejabat, foto };
  }

  // Kamituwo "Kamituwo Dusun X" → jabatan "Kamituwo" + keterangan "Dusun X".
  if (/^kamituwo/i.test(j.namaJabatan)) {
    const ket = j.namaJabatan.replace(/^kamituwo\s*/i, '').trim();
    foto.alt = `${j.namaJabatan} ${j.namaPejabat}`.trim();
    return { id: j.id, jabatan: 'Kamituwo', keterangan: ket, nama: j.namaPejabat, foto };
  }

  foto.alt = `${j.namaJabatan} ${j.namaPejabat}`.trim();
  return { id: j.id, jabatan: j.namaJabatan, nama: j.namaPejabat, foto };
}

export async function muatStruktur(): Promise<{
  struktur: StrukturOrganisasi;
  kelompokPerangkat: KelompokPerangkat[];
}> {
  const data = await getStruktur();
  if (data.length === 0) {
    return { struktur: strukturStatis, kelompokPerangkat: kelompokStatis };
  }

  const level = (n: number) => data.filter((j) => j.level === n);
  const kepalaDesa = level(1).find((j) => /kepala desa/i.test(j.namaJabatan));
  const bpd = level(1).find((j) => /bpd/i.test(j.namaJabatan));
  const sekretaris = level(2)[0];
  const kasi = level(3).filter((j) => /^kasi/i.test(j.namaJabatan));
  const kaur = level(3).filter((j) => /^kaur/i.test(j.namaJabatan));
  const kamituwo = level(4);

  // Slot tunggal wajib ada agar bagan tak error — fallback ke data statis.
  const s: StrukturOrganisasi = {
    kepalaDesa: kepalaDesa ? keP(kepalaDesa) : strukturStatis.kepalaDesa,
    bpd: bpd ? keP(bpd) : strukturStatis.bpd,
    sekretaris: sekretaris ? keP(sekretaris) : strukturStatis.sekretaris,
    kasi: kasi.length ? kasi.map(keP) : strukturStatis.kasi,
    kaur: kaur.length ? kaur.map(keP) : strukturStatis.kaur,
    kamituwo: kamituwo.length ? kamituwo.map(keP) : strukturStatis.kamituwo,
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
