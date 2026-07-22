// Konten halaman Profil Desa — tab "Geografi". Satu record (Pola A).
//
// CATATAN DATA: angka koordinat & luas di bawah diambil dari mockup dan
// BELUM tentu resmi (lihat docs/cms-gap-analysis.md §5). Perangkat desa
// wajib memverifikasi & memperbaikinya lewat dashboard sebelum publikasi.
export type Geografi = {
  halamanJudul: string;
  halamanSubteks: string;

  koordinat: string; // mis. "7°21'–7°31' Lintang Selatan dan 112°10'–112°40' Bujur Timur"
  ketinggian: string; // mis. "300 mdpl"
  posisi: string; // mis. "Dataran Tinggi"
  narasiTopografi: string;
  urlPeta: string;

  batasUtara: string;
  batasSelatan: string;
  batasTimur: string;
  batasBarat: string;

  luasTotal: string; // mis. "646,499 Ha"
  luasTanahKering: string;
  luasHutanNegara: string;
  luasSawah: string;
};

export const GEOGRAFI_DEFAULT: Geografi = {
  halamanJudul: 'Geografi Desa',
  halamanSubteks:
    'Wilayah Desa Sumberagung termasuk daerah pegunungan yang mayoritas penduduknya bermata pencaharian petani pekebun.',
  // TODO(desa): mockup menulis "118°10'-111°40'" yang terbalik & tidak cocok
  // dengan letak Blitar (~112° BT). Dugaan koreksi: 112°10'–112°40'.
  koordinat: "7°21'–7°31' Lintang Selatan dan 112°10'–112°40' Bujur Timur",
  ketinggian: '300 mdpl',
  posisi: 'Dataran Tinggi',
  narasiTopografi:
    'Desa Sumberagung terbentang secara strategis pada posisi koordinat pegunungan dan perbukitan rendah, menjadikannya salah satu kawasan dengan tanah tersubur di Kecamatan Panggungrejo. Karakteristik tanah yang kaya akan material vulkanik purba sangat mendukung sektor agrikultur desa.',
  urlPeta: '',
  batasUtara: 'Desa Panggungrejo, Kec. Panggungrejo',
  batasSelatan: 'Desa Balerejo, Kec. Panggungrejo',
  batasTimur: 'Desa Sumberkembar, Kec. Binangun',
  batasBarat: 'Desa Panggungrejo, Kec. Panggungrejo',
  // TODO(desa): angka luas dari mockup, perlu diverifikasi ke data resmi.
  luasTotal: '646,499 Ha',
  luasTanahKering: '482,499 Ha',
  luasHutanNegara: '131 Ha',
  luasSawah: '13 Ha',
};
