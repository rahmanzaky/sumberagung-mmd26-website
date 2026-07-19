// Setup Spreadsheet — Google Apps Script
// Jalankan SEKALI di project Apps Script yang ter-bind ke Spreadsheet backend.
// Fungsi ini membuat tab "BukuTamu", "PengajuanSurat", "Presensi" &
// "Kependudukan" beserta baris header yang formatnya HARUS cocok dengan
// docs/api-contract.md.
//
// Cara pakai:
//   1. Buka Spreadsheet Google → Extensions > Apps Script
//   2. Paste file ini + bukuTamu.gs + pengajuanSurat.gs + presensi.gs + kependudukan.gs
//   3. Pilih fungsi `setupSpreadsheet` → Run (beri izin saat diminta)
//   4. Isi beberapa baris contoh, lalu deploy Web App (lihat README.md)

const SHEET_BUKU_TAMU = 'BukuTamu';
const SHEET_PENGAJUAN_SURAT = 'PengajuanSurat';
const SHEET_PRESENSI = 'Presensi';
const SHEET_KEPENDUDUKAN = 'Kependudukan';

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
const HEADERS_PRESENSI = [
  'id',
  'nama',
  'jabatan',
  'tanggal',
  'jamMasuk',
  'jamPulang',
  'status',
  'keterangan',
];
const HEADERS_KEPENDUDUKAN = [
  'id',
  'dusun',
  'jumlahKK',
  'lakiLaki',
  'perempuan',
  'balita',
  'anak',
  'dewasa',
  'lansia',
];

function setupSpreadsheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ensureSheet_(ss, SHEET_BUKU_TAMU, HEADERS_BUKU_TAMU);
  ensureSheet_(ss, SHEET_PENGAJUAN_SURAT, HEADERS_PENGAJUAN_SURAT);
  ensureSheet_(ss, SHEET_PRESENSI, HEADERS_PRESENSI);
  ensureSheet_(ss, SHEET_KEPENDUDUKAN, HEADERS_KEPENDUDUKAN);
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
