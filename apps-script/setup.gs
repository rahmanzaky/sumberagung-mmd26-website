// Setup Spreadsheet — Google Apps Script
// Jalankan SEKALI di project Apps Script yang ter-bind ke Spreadsheet backend.
// Fungsi ini membuat semua tab beserta baris header yang formatnya HARUS
// cocok dengan docs/api-contract.md.
//
// Nama tab mengikuti SRS 3.1 (Sheet 1–6), ditambah tab Galeri & Pengaturan
// untuk fitur yang tidak punya sheet sendiri di SRS.
//
// Cara pakai:
//   1. Buka Spreadsheet Google → Extensions > Apps Script
//   2. Paste file ini SAJA, jalankan `setupSpreadsheet`, lalu hapus lagi.
//      (Tiap layanan .gs di-deploy sebagai project terpisah — lihat README.md)
//   3. Pilih fungsi `setupSpreadsheet` → Run (beri izin saat diminta)
//   4. Isi beberapa baris contoh, lalu deploy tiap Web App (lihat README.md)

const SHEET_BUKU_TAMU = 'BukuTamu';
const SHEET_PENGAJUAN_SURAT = 'PengajuanSurat';
const SHEET_ABSENSI = 'Absensi';
const SHEET_KEPENDUDUKAN = 'Kependudukan';
const SHEET_PERANGKAT_DESA = 'PerangkatDesa';
const SHEET_KONTEN = 'Konten';
const SHEET_GALERI = 'Galeri';
const SHEET_PENGATURAN = 'Pengaturan';

// Urutan kolom = urutan header. JANGAN diubah tanpa update dto.ts & api-contract.md.
const HEADERS_BUKU_TAMU = ['id', 'nama', 'instansi', 'keperluan', 'noWhatsapp', 'tanggal', 'jam'];
const HEADERS_PENGAJUAN_SURAT = [
  'id',
  'nama',
  'nik',
  'jenisSurat',
  'keperluan',
  'status',
  'tanggalPengajuan',
  'tanggalUpdate',
];
const HEADERS_ABSENSI = ['id', 'username', 'tanggal', 'jamMasuk', 'keterangan'];
const HEADERS_KEPENDUDUKAN = [
  'tahun',
  'totalPenduduk',
  'lakiLaki',
  'perempuan',
  'jumlahKK',
  'jumlahRt',
  'jumlahRw',
];
// Deviasi dari SRS 3.1: tanpa kolom Password — login memakai Google OAuth
// dan dicocokkan lewat kolom `email`.
const HEADERS_PERANGKAT_DESA = ['username', 'namaLengkap', 'jabatan', 'noWa', 'email', 'role'];
const HEADERS_KONTEN = [
  'id',
  'judul',
  'deskripsi',
  'tanggalKegiatan',
  'kategori',
  'urlFoto',
  'status',
  'dibuatOleh',
];
const HEADERS_GALERI = ['id', 'judul', 'urlFoto', 'kategori', 'tanggalUnggah', 'diunggahOleh'];
const HEADERS_PENGATURAN = ['kunci', 'nilai'];

function setupSpreadsheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ensureSheet_(ss, SHEET_BUKU_TAMU, HEADERS_BUKU_TAMU);
  ensureSheet_(ss, SHEET_PENGAJUAN_SURAT, HEADERS_PENGAJUAN_SURAT);
  ensureSheet_(ss, SHEET_ABSENSI, HEADERS_ABSENSI);
  ensureSheet_(ss, SHEET_KEPENDUDUKAN, HEADERS_KEPENDUDUKAN);
  ensureSheet_(ss, SHEET_PERANGKAT_DESA, HEADERS_PERANGKAT_DESA);
  ensureSheet_(ss, SHEET_KONTEN, HEADERS_KONTEN);
  ensureSheet_(ss, SHEET_GALERI, HEADERS_GALERI);
  ensureSheet_(ss, SHEET_PENGATURAN, HEADERS_PENGATURAN);
  isiPengaturanAwal_(ss);
  SpreadsheetApp.getActiveSpreadsheet().toast('Setup selesai — tab & header siap.', 'Sumberagung', 5);
}

// Membuat sheet jika belum ada, lalu menulis + memformat baris header.
function ensureSheet_(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);

  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setFontWeight('bold').setBackground('#1A2D5D').setFontColor('#FFFFFF');
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
}

// Mengisi tab Pengaturan dengan nilai awal, tapi hanya bila masih kosong —
// supaya menjalankan ulang setupSpreadsheet() tidak menimpa konfigurasi desa.
function isiPengaturanAwal_(ss) {
  const sheet = ss.getSheetByName(SHEET_PENGATURAN);
  if (sheet.getLastRow() > 1) return;

  const awal = [
    ['namaDesa', 'Sumberagung'],
    ['kecamatan', 'Panggungrejo'],
    ['kabupaten', 'Blitar'],
    ['provinsi', 'Jawa Timur'],
    ['alamatKantor', 'Jl. Raya Sumberagung, Kec. Panggungrejo, Kab. Blitar'],
    ['emailResmi', 'desasumberagung@gmail.com'],
    ['noWaResmi', '0812-0000-0000'],
    ['jamLayananMulai', '08:00'],
    ['jamLayananSelesai', '13:00'],
  ];
  sheet.getRange(2, 1, awal.length, 2).setValues(awal);
}
