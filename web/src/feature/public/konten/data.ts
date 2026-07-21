import type { Konten } from './types';

/** Paragraf sementara sampai naskah asli tersedia. */
const isiSementara = [
    'Naskah lengkap untuk konten ini belum tersedia. Ganti bagian ini dengan uraian sebenarnya dari pemerintah desa.',
    'Setiap konten dapat memuat beberapa paragraf. Tambahkan atau kurangi larik pada bidang isi sesuai kebutuhan.',
];

export const semuaKonten: Konten[] = [
    /* ---------- Kegiatan (tiga pertama sesuai desain) ---------- */
    {
        slug: 'rembuk-warga-perencanaan-pembangunan',
        jenis: 'kegiatan',
        kategori: 'Musyawarah',
        judul: 'Rembuk Warga Perencanaan Pembangunan',
        tanggal: '2025-06-14',
        ringkasan:
            'Warga berkumpul menyusun prioritas pembangunan desa untuk tahun anggaran berikutnya.',
        isi: isiSementara,
        gambar: { src: '', alt: 'Warga berkumpul dalam musyawarah desa di malam hari' },
    },
    {
        slug: 'panen-raya-padi-organik',
        jenis: 'kegiatan',
        kategori: 'Pertanian',
        judul: 'Panen Raya Padi Organik Kelompok Tani',
        tanggal: '2025-05-30',
        ringkasan:
            'Kelompok tani desa memanen padi organik hasil pendampingan sepanjang musim tanam.',
        isi: isiSementara,
        gambar: { src: '', alt: 'Hamparan sawah terasering saat matahari terbit' },
    },
    {
        slug: 'festival-kesenian-jaranan',
        jenis: 'kegiatan',
        kategori: 'Seni & Budaya',
        judul: 'Festival Kesenian Jaranan Desa',
        tanggal: '2025-05-11',
        ringkasan:
            'Pertunjukan jaranan sebagai upaya pelestarian kesenian tradisional Sumberagung.',
        isi: isiSementara,
        gambar: { src: '', alt: 'Penari mengenakan busana tradisional dalam festival desa' },
    },

    /* ---------- Kegiatan tambahan, masih isian sementara ---------- */
    {
        slug: 'kerja-bakti-perbaikan-jalan',
        jenis: 'kegiatan',
        kategori: 'Gotong Royong',
        judul: 'Kerja Bakti Perbaikan Jalan Desa',
        tanggal: '2025-04-27',
        ringkasan: 'Perbaikan ruas jalan penghubung antardusun secara swadaya.',
        isi: isiSementara,
        gambar: { src: '', alt: 'Warga bergotong royong memperbaiki jalan desa' },
    },
    {
        slug: 'posyandu-balita-lansia',
        jenis: 'kegiatan',
        kategori: 'Kesehatan',
        judul: 'Posyandu Balita dan Lansia Bulanan',
        tanggal: '2025-04-10',
        ringkasan: 'Pemeriksaan rutin dan penyuluhan gizi bagi balita serta lansia.',
        isi: isiSementara,
        gambar: { src: '', alt: 'Kegiatan penimbangan balita di posyandu desa' },
    },
    {
        slug: 'pelatihan-umkm-hasil-kebun',
        jenis: 'kegiatan',
        kategori: 'Ekonomi',
        judul: 'Pelatihan UMKM Olahan Hasil Kebun',
        tanggal: '2025-03-22',
        ringkasan: 'Pendampingan pengolahan dan pengemasan produk kebun warga.',
        isi: isiSementara,
        gambar: { src: '', alt: 'Warga mengikuti pelatihan pengolahan hasil kebun' },
    },
    {
        slug: 'peringatan-hari-kemerdekaan',
        jenis: 'kegiatan',
        kategori: 'Perayaan',
        judul: 'Peringatan Hari Kemerdekaan Republik Indonesia',
        tanggal: '2024-08-17',
        ringkasan: 'Upacara bendera dan aneka lomba warga di lapangan desa.',
        isi: isiSementara,
        gambar: { src: '', alt: 'Upacara dan lomba peringatan kemerdekaan di lapangan desa' },
    },

    /* ---------- Berita (tiga pertama sesuai desain) ---------- */
    {
        slug: 'inovasi-pelayanan-desa-digital',
        jenis: 'berita',
        kategori: 'Pelayanan',
        judul: 'Inovasi Pelayanan Desa Digital Melalui Aplikasi Mandiri',
        tanggal: '2023-10-12',
        ringkasan:
            'Pemerintah desa memperkenalkan layanan digital untuk mempercepat pengurusan administrasi warga.',
        isi: isiSementara,
        gambar: { src: '', alt: 'Warga mengakses layanan digital di kantor desa' },
    },
    {
        slug: 'sukses-panen-raya-organik',
        jenis: 'berita',
        kategori: 'Pertanian',
        judul: 'Sukses Panen Raya: Hasil Pertanian Organik Meningkat Pesat',
        tanggal: '2023-10-08',
        ringkasan:
            'Hasil panen padi organik desa tercatat meningkat dibanding musim tanam sebelumnya.',
        isi: isiSementara,
        gambar: { src: '', alt: 'Petani memanen padi di sawah terasering' },
    },
    {
        slug: 'kerja-bakti-jelang-musim-hujan',
        jenis: 'berita',
        kategori: 'Lingkungan',
        judul: 'Kerja Bakti Warga: Menjaga Kebersihan Lingkungan Menjelang Musim Hujan',
        tanggal: '2023-10-05',
        ringkasan:
            'Warga membersihkan saluran air dan lingkungan desa sebagai persiapan musim penghujan.',
        isi: isiSementara,
        gambar: { src: '', alt: 'Warga membersihkan saluran air di lingkungan desa' },
    },

    /* ---------- Berita tambahan, masih isian sementara ---------- */
    {
        slug: 'penyaluran-bantuan-pangan',
        jenis: 'berita',
        kategori: 'Sosial',
        judul: 'Penyaluran Bantuan Pangan bagi Keluarga Penerima Manfaat',
        tanggal: '2023-09-28',
        ringkasan: 'Bantuan pangan disalurkan kepada keluarga penerima manfaat di tiap dusun.',
        isi: isiSementara,
        gambar: { src: '', alt: 'Penyaluran bantuan pangan di balai desa' },
    },
    {
        slug: 'pembangunan-jembatan-dusun',
        jenis: 'berita',
        kategori: 'Infrastruktur',
        judul: 'Pembangunan Jembatan Penghubung Antardusun Dimulai',
        tanggal: '2023-09-15',
        ringkasan: 'Pengerjaan jembatan penghubung dua dusun resmi dimulai bulan ini.',
        isi: isiSementara,
        gambar: { src: '', alt: 'Pekerja membangun jembatan penghubung antardusun' },
    },
    {
        slug: 'pelatihan-perangkat-desa',
        jenis: 'berita',
        kategori: 'Pemerintahan',
        judul: 'Perangkat Desa Ikuti Pelatihan Tata Kelola Administrasi',
        tanggal: '2023-09-02',
        ringkasan: 'Perangkat desa mengikuti pelatihan peningkatan tata kelola administrasi.',
        isi: isiSementara,
        gambar: { src: '', alt: 'Perangkat desa mengikuti pelatihan di aula kantor desa' },
    },
    {
        slug: 'festival-kuliner-desa',
        jenis: 'berita',
        kategori: 'Ekonomi',
        judul: 'Festival Kuliner Desa Angkat Produk UMKM Lokal',
        tanggal: '2023-08-20',
        ringkasan: 'Festival kuliner menampilkan produk olahan UMKM warga Sumberagung.',
        isi: isiSementara,
        gambar: { src: '', alt: 'Stan kuliner UMKM pada festival desa' },
    },
];

export const daftarKegiatan = semuaKonten.filter((k) => k.jenis === 'kegiatan');
export const daftarBerita = semuaKonten.filter((k) => k.jenis === 'berita');

export function cariKonten(slug: string) {
    return semuaKonten.find((k) => k.slug === slug);
}

/** Mengubah "2023-10-12" menjadi "12 Okt 2023". */
export function formatTanggal(iso: string) {
    return new Date(`${iso}T00:00:00`).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}