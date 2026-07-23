import type { SejarahTimelineItem } from './types';

export const sejarahHeader = {
    judul: 'Sejarah Desa',
    deskripsi:
        'Perjalanan waktu, mengukir cerita dari generasi ke generasi di Desa Sumberagung.',
};

/**
 * Sumber konten sementara.
 * Isi `gambar.src` begitu fotonya tersedia di /public;
 * selama kosong, komponen menampilkan kotak placeholder.
 */
export const sejarahTimeline: SejarahTimelineItem[] = [
    {
        id: 'awal-mula',
        periode: 'Akhir Abad ke-18',
        judul: 'Awal Mula',
        narasi:
            'Pasca Perang Diponegoro yang dimenangkan Belanda, sebagian pengikut sang pangeran melarikan diri mencari tempat aman. Dari rombongan itulah Kaki Sopingi dan putranya, Mbah Koncar, tiba di hutan belantara yang kelak menjadi Sumberagung, dan mulai membabat hutan.',
        gambar: {
            src: '',
            alt: 'Warga membuka lahan hutan pada masa awal berdirinya desa',
        },
    },
    {
        id: 'joko-koncor',
        periode: 'Legenda Joko Koncor',
        judul: 'Cikal Bakal Desa',
        narasi:
            'Mbah Koncar wafat saat masih perjaka di tengah proses membuka hutan. Warga meyakini Joko Koncor dan Mbah Endran-lah cikal bakal desa; makam keduanya masih dijaga dan dianggap keramat hingga kini.',
        gambar: {
            src: '',
            alt: 'Warga bergotong royong menggarap sawah desa',
        },
    },
    {
        id: 'bambangsoko',
        periode: '1908',
        judul: 'Berdirinya Desa Bambangsoko',
        narasi:
            'Kaki Sopingi bersama rombongan melanjutkan babat hutan. Nama Bambangsoko lahir dari pohon bambang yang tumbuh di sepanjang sungai, dengan Karyotani sebagai kepala desa pertama.',
        gambar: {
            src: '',
            alt: 'Hamparan sawah terasering dengan latar pegunungan',
        },
    },
    {
        id: 'sumberagung',
        periode: '1917',
        judul: 'Desa Sumberagung',
        narasi:
            'Setelah desa sempat diwarnai kerusuhan dan pencurian, nama diubah menjadi Sumberagung karena banyaknya sumber mata air besar — membawa harapan baru akan desa yang aman dan makmur.',
        gambar: {
            src: '',
            alt: 'Warga mengakses layanan informasi di kantor Desa Sumberagung',
        },
    },
];