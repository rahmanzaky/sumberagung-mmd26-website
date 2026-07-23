import { getGeografi } from '@/repository/geografi/action';
import { urlFotoLangsung } from '@/lib/foto';
import { geografi as geografiStatis } from './data';
import { pisahKoordinat, pisahNilaiSatuan, pisahBatas } from './parse-geografi';

// CMS menyimpan beberapa nilai sebagai satu string (koordinat, ketinggian, batas,
// luas), sedangkan komponen FE butuh terpisah. Parser di parse-geografi.ts
// memecahnya; label/ikon/prosa yang tak punya padanan CMS tetap memakai statis.

export async function muatGeografi() {
  const g = await getGeografi();
  const s = geografiStatis;

  const { lintang, bujur } = pisahKoordinat(g.koordinat, {
    lintang: s.letak.lintang,
    bujur: s.letak.bujur,
  });
  const batasCms = [
    { arah: 'Utara', ...pisahBatas(g.batasUtara) },
    { arah: 'Selatan', ...pisahBatas(g.batasSelatan) },
    { arah: 'Timur', ...pisahBatas(g.batasTimur) },
    { arah: 'Barat', ...pisahBatas(g.batasBarat) },
  ];
  const rincianCms = [
    { ...s.luas.rincian[0], ...pisahNilaiSatuan(g.luasTanahKering, { nilai: s.luas.rincian[0].luas, satuan: s.luas.rincian[0].satuan }) },
    { ...s.luas.rincian[1], ...pisahNilaiSatuan(g.luasHutanNegara, { nilai: s.luas.rincian[1].luas, satuan: s.luas.rincian[1].satuan }) },
    { ...s.luas.rincian[2], ...pisahNilaiSatuan(g.luasSawah, { nilai: s.luas.rincian[2].luas, satuan: s.luas.rincian[2].satuan }) },
  ].map((r) => ({ id: r.id, label: r.label, luas: r.nilai, satuan: r.satuan, persen: r.persen, ikon: r.ikon }));

  const totalNS = pisahNilaiSatuan(g.luasTotal, { nilai: s.luas.total.nilai, satuan: s.luas.total.satuan });
  const tinggiNS = pisahNilaiSatuan(g.ketinggian, s.letak.ketinggian);

  return {
    judul: g.halamanJudul || s.judul,
    deskripsi: g.halamanSubteks || s.deskripsi,
    letak: {
      judul: s.letak.judul,
      lintang,
      bujur,
      paragrafPembuka: s.letak.paragrafPembuka,
      paragrafLanjutan: g.narasiTopografi || s.letak.paragrafLanjutan,
      ketinggian: tinggiNS,
      posisi: g.posisi || s.letak.posisi,
    },
    peta: {
      gambar: { src: g.urlPeta ? urlFotoLangsung(g.urlPeta) : s.peta.gambar.src, alt: s.peta.gambar.alt },
      judulKeterangan: s.peta.judulKeterangan,
      keterangan: s.peta.keterangan,
    },
    batas: {
      judul: s.batas.judul,
      subjudul: s.batas.subjudul,
      daftar: batasCms,
    },
    luas: {
      judul: s.luas.judul,
      deskripsi: s.luas.deskripsi,
      total: { label: s.luas.total.label, nilai: totalNS.nilai, satuan: totalNS.satuan },
      rincian: rincianCms,
    },
  };
}
