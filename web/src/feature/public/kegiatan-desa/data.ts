import type { Kegiatan } from './types';

/**
 * Sumber data sementara.
 * `id` harus sama dengan id di feature/public/beranda/data.ts (kegiatan.daftar)
 * supaya kartu di beranda tertaut ke halaman detail yang benar.
 * Isi `gambar.src` begitu fotonya tersedia di /public; selama kosong,
 * komponen menampilkan kotak placeholder.
 */
export const daftarKegiatan: Kegiatan[] = [
    {
        id: 'rembuk-warga',
        kategori: 'Geliat Desa • Musyawarah',
        judul: 'Rembuk Warga: Merajut Masa Depan Melalui Tradisi.',
        highlightWord: 'Merajut Masa Depan',
        subtitle:
            'Partisipasi aktif masyarakat dalam menentukan arah pembangunan desa yang berkelanjutan, berlandaskan nilai luhur gotong royong.',
        gambar: { src: '', alt: 'Warga berkumpul dalam musyawarah desa di malam hari' },
        tanggal: '15 - 17 Mei 2024',
        lokasi: 'Balai Desa Sumberagung',
        fasilitator: 'Bapak Suhendra (Kades)',
        unduhan: [
            { judul: 'Laporan Hasil Rembuk', url: '#' },
            { judul: 'Peta Rencana 2025', url: '#' },
        ],
        deskripsi: [
            'Rembuk Warga Tahunan merupakan fondasi dari transparansi pemerintahan Desa Sumberagung. Tahun ini, fokus utama adalah pada pengembangan infrastruktur irigasi berkelanjutan dan penguatan digitalisasi UMKM lokal. Acara yang dihadiri oleh perwakilan dari 42 Rukun Tetangga (RT) ini menjadi ajang bertukar pikiran yang paling dinantikan.',
            'Selama tiga hari penuh, masyarakat berdialog langsung dengan perangkat desa. Kami percaya bahwa setiap suara, dari petani hingga pemuda, memiliki bobot yang sama dalam membentuk wajah Sumberagung di masa depan. Ini bukan sekadar pertemuan formal, melainkan sebuah ritual demokrasi yang telah kita jaga turun-temurun.',
        ],
        galeri: [
            { src: '', alt: 'Suasana rembuk warga di pendopo balai desa' },
            { src: '', alt: 'Perangkat desa menunjukkan peta rencana irigasi' },
            { src: '', alt: 'Perwakilan RT berdiskusi menggunakan laptop' },
            { src: '', alt: 'Warga menikmati makan bersama usai rembuk warga' },
        ],
        kutipanUtama: {
            teks: 'Tahun ini saya merasa suara kami sebagai petani benar-benar didengar. Rencana pembangunan irigasi baru adalah nafas segar bagi sawah-sawah kami.',
            nama: 'Pak Kartolo',
            jabatan: 'Petani, RW 04',
        },
        dampakHasil: [
            {
                ikon: 'tetesan',
                judul: 'Irigasi Modern',
                deskripsi:
                    'Perbaikan 12km saluran irigasi yang mendukung ketahanan pangan 400 hektar lahan padi.',
            },
            {
                ikon: 'kelompok',
                judul: 'Kohesi Sosial',
                deskripsi:
                    'Meningkatnya kepercayaan publik hingga 92% terhadap transparansi anggaran desa.',
            },
            {
                ikon: 'tren',
                judul: 'Pertumbuhan UMKM',
                deskripsi:
                    "Inisiasi program 'Go-Digital' untuk 50 pelaku usaha lokal Desa Sumberagung.",
            },
        ],
        testimoniWarga: [
            {
                foto: { src: '', alt: 'Foto Siti Aminah' },
                kutipan:
                    'Sebagai perwakilan pemuda, saya bangga Sumberagung mulai berinvestasi pada literasi digital. Rembuk warga ini membuktikan desa kita tidak tertinggal zaman.',
                nama: 'Siti Aminah',
                jabatan: 'Karang Taruna',
            },
            {
                foto: { src: '', alt: 'Foto Budi Santoso' },
                kutipan:
                    'Sistem pengajuan surat online yang dibahas di musyawarah sangat memudahkan kami yang tinggal di pelosok desa. Efisiensi yang luar biasa.',
                nama: 'Budi Santoso',
                jabatan: 'Pelaku UMKM',
            },
        ],
    },
    {
        id: 'panen-raya',
        kategori: 'Geliat Desa • Pertanian',
        judul: 'Panen Raya Padi Organik: Bukti Nyata Kemandirian Pangan Desa.',
        highlightWord: 'Bukti Nyata',
        subtitle:
            'Kolaborasi kelompok tani dan pemerintah desa menghasilkan panen melimpah tanpa pupuk kimia sedikit pun.',
        gambar: { src: '', alt: 'Hamparan sawah terasering saat matahari terbit' },
        tanggal: '02 - 03 Agustus 2024',
        lokasi: 'Persawahan Blok Sumber Waras',
        fasilitator: 'Ketua Kelompok Tani Sumber Makmur',
        unduhan: [
            { judul: 'Laporan Hasil Panen', url: '#' },
            { judul: 'Data Produktivitas Lahan', url: '#' },
        ],
        deskripsi: [
            'Panen Raya tahun ini menjadi bukti bahwa metode pertanian organik yang digagas Kelompok Tani Sumber Makmur benar-benar membuahkan hasil. Setelah dua tahun beralih dari pupuk kimia ke pupuk organik berbahan kotoran ternak dan kompos, produktivitas lahan meningkat signifikan tanpa mengorbankan kualitas tanah.',
            'Acara panen raya turut dihadiri penyuluh pertanian kecamatan dan disambut dengan syukuran sederhana di tepi sawah. Hasil panen sebagian diserap koperasi desa untuk dipasarkan, sebagian lagi disisihkan sebagai stok pangan cadangan menjelang musim kemarau.',
        ],
        galeri: [
            { src: '', alt: 'Warga memanen padi bersama di sawah terasering' },
            { src: '', alt: 'Karung berisi hasil panen padi organik' },
            { src: '', alt: 'Petani memeriksa kualitas bulir padi' },
            { src: '', alt: 'Syukuran panen raya di tepi sawah' },
        ],
        kutipanUtama: {
            teks: 'Awalnya saya ragu tanpa pupuk kimia hasilnya akan menurun. Ternyata dengan pupuk organik, tanah kami justru semakin subur dan hasil panen tetap melimpah.',
            nama: 'Pak Slamet',
            jabatan: 'Ketua Kelompok Tani Sumber Makmur',
        },
        dampakHasil: [
            {
                ikon: 'tren',
                judul: 'Hasil Meningkat',
                deskripsi:
                    'Produktivitas panen padi organik naik 30% dibanding musim tanam sebelumnya.',
            },
            {
                ikon: 'tetesan',
                judul: 'Hemat Air',
                deskripsi:
                    'Sistem irigasi bergilir menekan pemakaian air hingga 20% tanpa mengurangi hasil panen.',
            },
            {
                ikon: 'kelompok',
                judul: 'Regenerasi Petani',
                deskripsi:
                    'Belasan petani muda mulai terlibat aktif setelah melihat prospek pertanian organik.',
            },
        ],
        testimoniWarga: [
            {
                foto: { src: '', alt: 'Foto Wagimin' },
                kutipan:
                    'Harga jual gabah organik lebih tinggi di pasaran. Ini sangat membantu ekonomi keluarga kami musim ini.',
                nama: 'Wagimin',
                jabatan: 'Petani, RT 12',
            },
            {
                foto: { src: '', alt: 'Foto Ninik Suryani' },
                kutipan:
                    'Koperasi desa jadi lebih aktif menyerap hasil panen warga. Kami tidak perlu bingung lagi mencari tengkulak.',
                nama: 'Ninik Suryani',
                jabatan: 'Pengurus Koperasi Desa',
            },
        ],
    },
    {
        id: 'festival-jaranan',
        kategori: 'Geliat Desa • Seni & Budaya',
        judul: 'Festival Kesenian Jaranan: Menjaga Warisan Leluhur Tetap Hidup.',
        highlightWord: 'Menjaga Warisan Leluhur',
        subtitle:
            'Pertunjukan seni tradisional yang melibatkan seluruh generasi warga Desa Sumberagung, dari sesepuh hingga anak-anak.',
        gambar: { src: '', alt: 'Penari mengenakan busana tradisional dalam festival desa' },
        tanggal: '20 September 2024',
        lokasi: 'Lapangan Desa Sumberagung',
        fasilitator: 'Sanggar Budaya Sumberagung',
        unduhan: [{ judul: 'Rundown Acara Festival', url: '#' }],
        deskripsi: [
            'Festival Kesenian Jaranan digelar sebagai upaya melestarikan kesenian kuda lumping yang telah menjadi identitas budaya Desa Sumberagung sejak puluhan tahun lalu. Tahun ini, festival diikuti oleh lima kelompok jaranan dari berbagai dusun, mulai dari kelompok sesepuh hingga kelompok anak-anak binaan sanggar.',
            'Selain pertunjukan tari, festival juga diramaikan dengan pameran kerajinan topeng dan alat musik gamelan buatan warga. Antusiasme penonton yang membeludak hingga ke luar lapangan desa menjadi bukti bahwa kesenian tradisional masih memiliki tempat di hati masyarakat, termasuk generasi muda.',
        ],
        galeri: [
            { src: '', alt: 'Penari jaranan beraksi di depan penonton' },
            { src: '', alt: 'Anak-anak binaan sanggar tampil membawakan tari jaranan' },
            { src: '', alt: 'Pengrajin menunjukkan topeng kesenian buatan tangan' },
            { src: '', alt: 'Kelompok gamelan mengiringi pertunjukan festival' },
        ],
        kutipanUtama: {
            teks: 'Melihat anak-anak sanggar tampil percaya diri malam ini, saya yakin kesenian jaranan Sumberagung akan terus hidup lintas generasi.',
            nama: 'Ibu Suratmi',
            jabatan: 'Pembina Sanggar Budaya Sumberagung',
        },
        dampakHasil: [
            {
                ikon: 'kelompok',
                judul: 'Regenerasi Seniman',
                deskripsi:
                    'Lebih dari 30 anak dan remaja aktif berlatih rutin di sanggar budaya desa.',
            },
            {
                ikon: 'tren',
                judul: 'Daya Tarik Wisata',
                deskripsi:
                    'Festival tahunan ini mulai menarik pengunjung dari luar desa dan menopang ekonomi kreatif warga.',
            },
            {
                ikon: 'tetesan',
                judul: 'Pelestarian Budaya',
                deskripsi:
                    'Dokumentasi gerak tari dan iringan gamelan disusun agar tidak hilang ditelan zaman.',
            },
        ],
        testimoniWarga: [
            {
                foto: { src: '', alt: 'Foto Doni Prasetyo' },
                kutipan:
                    'Dulu saya kira jaranan cuma untuk orang tua. Sekarang saya dan teman-teman justru bangga ikut tampil membawakannya.',
                nama: 'Doni Prasetyo',
                jabatan: 'Anggota Sanggar Muda',
            },
            {
                foto: { src: '', alt: 'Foto Hj. Marfuah' },
                kutipan:
                    'Festival ini mengingatkan saya pada masa kecil dulu. Senang sekali tradisi ini masih terus dijaga oleh warga.',
                nama: 'Hj. Marfuah',
                jabatan: 'Sesepuh Desa',
            },
        ],
    },
];
