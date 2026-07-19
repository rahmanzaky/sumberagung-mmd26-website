// Konten halaman Beranda (Home). Satu record tunggal — Pola A (form tunggal).
// Bukan bagian dari 6 sheet SRS 3.1; skema turunan dari kebutuhan CMS
// "ubah semua konten lewat dashboard".
export type Beranda = {
  // Hero
  heroEyebrow: string;
  heroJudul: string; // boleh berisi <em>…</em> untuk kata beraksen emas
  heroSubteks: string;
  heroCtaPrimerLabel: string;
  heroCtaPrimerHref: string;
  heroCtaSekunderLabel: string;
  heroCtaSekunderHref: string;
  heroUrlGambar: string;

  // Seksi kegiatan ("Jejak Langkah & Geliat Desa")
  kegiatanJudul: string;
  kegiatanSubteks: string;

  // Seksi video profil
  videoJudul: string;
  videoSubteks: string;
  videoUrl: string;

  // Footer
  footerTagline: string;
};

export const BERANDA_DEFAULT: Beranda = {
  heroEyebrow: 'DESA WISATA & BUDAYA',
  heroJudul: 'Sumberagung, Desa yang <em>Tumbuh</em> dari Sumber Kehidupan.',
  heroSubteks:
    'Terletak di kaki gunung dengan kekayaan mata air, memadukan kearifan lokal, pelestarian budaya, dan pelayanan publik yang modern untuk kesejahteraan warga.',
  heroCtaPrimerLabel: 'Ajukan Surat',
  heroCtaPrimerHref: '/pengajuan-surat',
  heroCtaSekunderLabel: 'Lihat Kegiatan',
  heroCtaSekunderHref: '#kegiatan',
  heroUrlGambar: '',
  kegiatanJudul: 'Jejak Langkah & Geliat Desa',
  kegiatanSubteks:
    'Merekam setiap momen pembangunan, pelestarian budaya, dan interaksi warga yang membentuk harmoni di Sumberagung.',
  videoJudul: 'Profil Desa',
  videoSubteks:
    'Kenali lebih dekat bentang alam, potensi ekonomi, dan keramahan warga Desa Sumberagung melalui lensa sinematik.',
  videoUrl: '',
  footerTagline:
    'Mewujudkan pelayanan publik yang prima dengan tetap menjunjung tinggi nilai-nilai budaya dan kearifan lokal.',
};

export const LABEL_BERANDA: Record<keyof Beranda, string> = {
  heroEyebrow: 'Hero — Teks Kecil di Atas Judul',
  heroJudul: 'Hero — Judul Utama',
  heroSubteks: 'Hero — Subteks',
  heroCtaPrimerLabel: 'Hero — Tombol Utama (teks)',
  heroCtaPrimerHref: 'Hero — Tombol Utama (tautan)',
  heroCtaSekunderLabel: 'Hero — Tombol Kedua (teks)',
  heroCtaSekunderHref: 'Hero — Tombol Kedua (tautan)',
  heroUrlGambar: 'Hero — URL Gambar Latar',
  kegiatanJudul: 'Seksi Kegiatan — Judul',
  kegiatanSubteks: 'Seksi Kegiatan — Subteks',
  videoJudul: 'Seksi Video — Judul',
  videoSubteks: 'Seksi Video — Subteks',
  videoUrl: 'Seksi Video — URL Video (embed)',
  footerTagline: 'Footer — Tagline',
};
