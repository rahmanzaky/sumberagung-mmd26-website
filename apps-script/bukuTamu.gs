// Buku Tamu Digital — Google Apps Script Web App
// Deploy: script.google.com → paste kode ini → Deploy > New deployment > Web App
// Format request/response HARUS cocok dengan docs/api-contract.md
// Lihat apps-script/README.md untuk panduan lengkap.

// Isi dengan ID Spreadsheet backend (bagian /d/<ID>/edit dari URL).
// Boleh dikosongkan jika script ini ter-bind langsung ke Spreadsheet-nya.
const SPREADSHEET_ID = '';
const SHEET_NAME = 'BukuTamu';
const HEADERS = ['id', 'nama', 'instansi', 'keperluan', 'noWhatsapp', 'tanggal', 'jam'];

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

// Konversi nilai sel tanggal → "YYYY-MM-DD"; nilai jam → "HH:mm".
function normalizeCell_(header, value) {
  if (value instanceof Date) {
    if (header === 'tanggal') {
      return Utilities.formatDate(value, Session.getScriptTimeZone(), 'yyyy-MM-dd');
    }
    if (header === 'jam') {
      return Utilities.formatDate(value, Session.getScriptTimeZone(), 'HH:mm');
    }
  }
  return value === null || value === undefined ? '' : String(value);
}

// GET → { data: BukuTamuEntry[] }
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

// POST { nama, instansi, keperluan, noWhatsapp, tanggal, jam } → { success, id }
// Menambah satu baris tamu baru (dipakai fitur "Input Tamu Baru").
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const id = 'bt-' + new Date().getTime();

    const row = HEADERS.map((header) => {
      if (header === 'id') return id;
      return body[header] === undefined || body[header] === null ? '' : body[header];
    });

    getSheet_().appendRow(row);
    return jsonResponse_({ success: true, id: id });
  } catch (err) {
    return jsonResponse_({ success: false, error: String(err) });
  }
}
