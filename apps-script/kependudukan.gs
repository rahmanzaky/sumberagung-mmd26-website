// Data Kependudukan — Google Apps Script Web App (read-only)
// Deploy: script.google.com → paste kode ini → Deploy > New deployment > Web App
// Format response HARUS cocok dengan docs/api-contract.md
//
// Modul ini sengaja TANPA doPost: rekap kependudukan diperbarui langsung
// di Spreadsheet oleh operator desa, bukan lewat dashboard.

// Isi dengan ID Spreadsheet backend (bagian /d/<ID>/edit dari URL).
// Boleh dikosongkan jika script ini ter-bind langsung ke Spreadsheet-nya.
const SPREADSHEET_ID = '';
const SHEET_NAME = 'Kependudukan';
const HEADERS = [
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

// Kolom yang harus dikirim sebagai number, bukan string.
const KOLOM_ANGKA = ['jumlahKK', 'lakiLaki', 'perempuan', 'balita', 'anak', 'dewasa', 'lansia'];

function getSheet_() {
  const ss = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('Sheet "' + SHEET_NAME + '" tidak ditemukan. Jalankan setupSpreadsheet() dulu.');
  return sheet;
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function normalizeCell_(header, value) {
  if (KOLOM_ANGKA.indexOf(header) !== -1) {
    const angka = Number(value);
    return isNaN(angka) ? 0 : angka;
  }
  return value === null || value === undefined ? '' : String(value);
}

// GET → { data: KependudukanDusun[] }
function doGet() {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  const rows = values.slice(1); // buang header

  const data = rows
    .filter((row) => String(row[0]).trim() !== '') // baris dengan id kosong = diabaikan
    .map((row) => {
      const entry = {};
      HEADERS.forEach((header, i) => {
        entry[header] = normalizeCell_(header, row[i]);
      });
      return entry;
    });

  return jsonResponse_({ data: data });
}
