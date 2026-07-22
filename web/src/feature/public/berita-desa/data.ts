import type { Berita } from './types';

export const beritaSeksiBeranda = {
    judul: 'Berita Desa Terbaru',
};

export const beritaHeader = {
    judul: 'Berita Desa',
    deskripsi:
        'Perjalanan waktu, mengukir cerita dari generasi ke generasi di Desa Sumberagung.',
};

/**
 * Sumber data sementara.
 * Isi `gambar.src` begitu fotonya tersedia di /public;
 * selama kosong, komponen menampilkan kotak placeholder.
 */
export const daftarBerita: Berita[] = [
    {
        id: 'inovasi-pelayanan-desa-digital',
        kategori: 'Teknologi/Layanan',
        tanggal: '12 Okt 2023',
        penulis: 'Admin Desa',
        judul: 'Inovasi Pelayanan Desa Digital Melalui Aplikasi Mandiri',
        excerpt:
            'Pemerintah Desa Sumberagung resmi meluncurkan inisiatif transformasi digital melalui pengembangan Aplikasi Mandiri Pelayanan Desa.',
        gambar: { src: '', alt: 'Warga menggunakan aplikasi pelayanan desa digital' },
        overlayTeks: 'Berita Warga Sumberagung',
        konten: [
            'Pemerintah Desa Sumberagung resmi meluncurkan inisiatif transformasi digital melalui pengembangan Aplikasi Mandiri Pelayanan Desa. Langkah strategis ini diambil guna memangkas birokrasi dan memberikan kemudahan akses layanan administratif bagi seluruh warga tanpa harus bertatap muka langsung di kantor desa.',
            'Melalui platform ini, warga dapat mengurus berbagai macam surat keterangan, mulai dari surat pengantar KTP, surat keterangan tidak mampu, hingga perizinan usaha mikro. Sistem ini terintegrasi dengan basis data kependudukan pusat yang menjamin akurasi informasi dan keamanan data pribadi masyarakat Sumberagung.',
            'Keunggulan utama dari aplikasi ini adalah fitur pelacakan status permohonan secara real-time. Warga akan menerima notifikasi melalui WhatsApp atau Email ketika berkas mereka telah divalidasi dan siap untuk diunduh dalam bentuk dokumen elektronik bertanda tangan digital resmi.',
            'Diharapkan dengan adanya inovasi ini, tingkat kepuasan masyarakat terhadap kinerja Pemerintah Desa Sumberagung akan meningkat secara signifikan. Sosialisasi penggunaan aplikasi akan terus dilakukan secara door-to-door melalui kader desa untuk memastikan kelompok lansia juga dapat merasakan manfaat dari teknologi ini.',
        ],
        kutipan: {
            teks: 'Digitalisasi bukan sekadar tren, melainkan keharusan untuk melayani rakyat dengan lebih cepat, transparan, dan akuntabel di era modern ini.',
            atribusi: 'Kepala Desa Sumberagung',
        },
        kotakFitur: [
            {
                ikon: 'kilat',
                judul: 'Proses Cepat',
                deskripsi:
                    'Layanan yang sebelumnya memakan waktu berhari-hari kini dapat diselesaikan dalam hitungan jam.',
            },
            {
                ikon: 'perisai',
                judul: 'Keamanan Data',
                deskripsi:
                    'Enkripsi tingkat tinggi untuk memastikan seluruh data warga tersimpan dengan aman di server lokal desa.',
            },
        ],
        tags: ['DigitalDesa', 'SumberagungMaju', 'Inovasi'],
        terkaitIds: [
            'pesta-rakyat-sumberagung-merayakan-panen-berlimpah',
            'pelatihan-membatik-generasi-muda-desa',
            'peresmian-balai-pertemuan-warga-baru',
        ],
    },
    {
        id: 'sukses-panen-raya-hasil-pertanian-organik',
        kategori: 'Pertanian',
        tanggal: '08 Okt 2023',
        penulis: 'Admin Desa',
        judul: 'Sukses Panen Raya: Hasil Pertanian Organik Meningkat Pesat',
        excerpt:
            'Kelompok tani Desa Sumberagung mencatatkan hasil panen raya padi organik yang melimpah pada musim ini.',
        gambar: { src: '', alt: 'Warga memanen padi di sawah terasering' },
        overlayTeks: 'Panen Raya Desa Harmoni',
        konten: [
            'Musim panen tahun ini membawa kabar gembira bagi para petani Desa Sumberagung. Kelompok Tani Sumber Makmur mencatatkan peningkatan hasil panen padi organik hingga 30 persen dibanding musim sebelumnya, berkat penerapan metode pertanian ramah lingkungan yang konsisten dijalankan sejak dua tahun terakhir.',
            'Penggunaan pupuk organik dari kotoran ternak dan kompos daun terbukti tidak hanya menyuburkan tanah, tetapi juga menekan biaya produksi petani secara signifikan. Pendampingan rutin dari penyuluh pertanian kecamatan turut mempercepat adopsi teknik ini di kalangan petani muda.',
            'Hasil panen kali ini sebagian besar akan diserap oleh koperasi desa untuk didistribusikan ke pasar lokal, sementara sisanya disisihkan sebagai stok pangan cadangan desa menjelang musim kemarau.',
        ],
        tags: ['PanenRaya', 'PertanianOrganik', 'SumberagungMaju'],
    },
    {
        id: 'kerja-bakti-warga-menjaga-kebersihan-lingkungan',
        kategori: 'Kegiatan',
        tanggal: '05 Okt 2023',
        penulis: 'Admin Desa',
        judul: 'Kerja Bakti Warga: Menjaga Kebersihan Lingkungan Menjelang Musim Hujan',
        excerpt:
            'Warga Sumberagung bergotong royong membersihkan saluran air dan lingkungan desa menjelang datangnya musim hujan.',
        gambar: { src: '', alt: 'Warga bergotong royong membersihkan lingkungan desa' },
        overlayTeks: 'Village News Sumberagung',
        konten: [
            'Menjelang musim hujan, warga dari seluruh rukun tetangga di Desa Sumberagung serentak menggelar kerja bakti pembersihan saluran air dan lingkungan sekitar. Kegiatan yang digagas oleh perangkat desa ini bertujuan mencegah genangan dan banjir yang kerap terjadi tiap tahunnya.',
            'Selain membersihkan saluran air, warga juga menanam pohon di area resapan untuk memperkuat daya serap tanah terhadap air hujan. Kegiatan ini menjadi wadah mempererat kembali semangat gotong royong yang menjadi nilai luhur masyarakat Sumberagung.',
            'Kepala Desa mengapresiasi antusiasme warga dan berharap kegiatan serupa dapat menjadi agenda rutin setiap menjelang pergantian musim.',
        ],
        tags: ['GotongRoyong', 'Lingkungan', 'SumberagungMaju'],
    },
    {
        id: 'pesta-rakyat-sumberagung-merayakan-panen-berlimpah',
        kategori: 'Kegiatan',
        tanggal: '01 Okt 2023',
        penulis: 'Admin Desa',
        judul: 'Pesta Rakyat Sumberagung: Merayakan Panen Berlimpah',
        excerpt:
            'Warga menggelar pesta rakyat sebagai ungkapan syukur atas hasil panen yang melimpah tahun ini.',
        gambar: { src: '', alt: 'Warga merayakan pesta rakyat syukuran panen desa' },
        overlayTeks: 'Pesta Rakyat Sumberagung',
        konten: [
            'Sebagai ungkapan rasa syukur atas hasil panen yang melimpah, warga Desa Sumberagung menggelar pesta rakyat di lapangan desa. Acara ini diisi dengan arak-arakan hasil bumi, pertunjukan kesenian lokal, dan makan bersama seluruh warga.',
            'Tradisi ini rutin digelar setiap tahun sebagai bentuk pelestarian budaya sekaligus mempererat kebersamaan antarwarga dari berbagai dusun di Sumberagung.',
        ],
        tags: ['PestaRakyat', 'Budaya', 'SumberagungMaju'],
    },
    {
        id: 'pelatihan-membatik-generasi-muda-desa',
        kategori: 'Budaya',
        tanggal: '28 Sep 2023',
        penulis: 'Admin Desa',
        judul: 'Pelatihan Membatik untuk Generasi Muda Desa',
        excerpt:
            'Sanggar budaya desa mengadakan pelatihan membatik guna melestarikan warisan budaya lokal kepada generasi muda.',
        gambar: { src: '', alt: 'Anak muda belajar membatik bersama pengrajin desa' },
        overlayTeks: 'Sanggar Budaya Sumberagung',
        konten: [
            'Sanggar Budaya Sumberagung menggelar pelatihan membatik bagi puluhan pelajar dan pemuda desa sebagai upaya pelestarian warisan budaya lokal. Pelatihan ini menghadirkan pengrajin batik senior yang telah menekuni kerajinan ini selama lebih dari dua dekade.',
            'Peserta diajarkan mulai dari teknik dasar mencanting, pewarnaan alami menggunakan bahan-bahan dari tumbuhan sekitar desa, hingga proses pelorodan malam. Motif yang diajarkan mengangkat kekayaan alam khas Sumberagung seperti pegunungan dan sumber mata air.',
            'Program ini diharapkan dapat menumbuhkan kecintaan generasi muda terhadap budaya sendiri, sekaligus membuka peluang ekonomi kreatif baru bagi desa melalui produk batik khas Sumberagung.',
        ],
        tags: ['Budaya', 'Membatik', 'GenerasiMuda'],
    },
    {
        id: 'peresmian-balai-pertemuan-warga-baru',
        kategori: 'Pembangunan',
        tanggal: '15 Sep 2023',
        penulis: 'Admin Desa',
        judul: 'Peresmian Balai Pertemuan Warga Baru',
        excerpt:
            'Balai pertemuan warga yang baru resmi digunakan setelah pembangunan yang didukung dana desa dan swadaya masyarakat.',
        gambar: { src: '', alt: 'Gedung balai pertemuan warga desa yang baru diresmikan' },
        overlayTeks: 'Pembangunan Sumberagung',
        konten: [
            'Setelah proses pembangunan selama enam bulan, Balai Pertemuan Warga Desa Sumberagung resmi diresmikan dan mulai digunakan untuk berbagai kegiatan masyarakat. Pembangunan gedung ini didanai dari Dana Desa serta swadaya gotong royong warga sekitar.',
            'Balai baru ini dilengkapi dengan ruang serbaguna berkapasitas 200 orang, area parkir yang lebih luas, serta fasilitas ramah difabel. Gedung ini akan menjadi pusat kegiatan musyawarah, posyandu, hingga acara adat desa.',
            'Kepala Desa berharap keberadaan balai ini dapat semakin mempererat interaksi sosial antarwarga serta mendukung kelancaran pelayanan publik di tingkat desa.',
        ],
        tags: ['Pembangunan', 'FasilitasDesa', 'SumberagungMaju'],
    },
];
