// Distribusi Usia & Gender (daftar berurut) — Google Apps Script Web App
// Deploy: script.google.com → paste kode ini → Deploy > New deployment > Web App
// Format request/response HARUS cocok dengan docs/api-contract.md

const SPREADSHEET_ID = '';
const SHEET_NAME = 'DistribusiUsia';
const HEADERS = ['id', 'rentang', 'wilayah', 'lakiLaki', 'perempuan', 'urutan'];
const PREFIX_ID = 'du-';

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

// Kolom 'urutan' dikirim sebagai number.
function normalizeCell_(header, value) {
  if (header === 'urutan' || header === 'lakiLaki' || header === 'perempuan') {
    const n = Number(value);
    return isNaN(n) ? 0 : n;
  }
  return value === null || value === undefined ? '' : String(value);
}

// GET → { data: Item[] }
function doGet() {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  const data = values
    .slice(1)
    .filter((row) => String(row[0]).trim() !== '')
    .map((row) => {
      const entry = {};
      HEADERS.forEach((header, i) => {
        entry[header] = normalizeCell_(header, row[i]);
      });
      return entry;
    });
  return jsonResponse_({ data: data });
}

function cariBaris_(sheet, id) {
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]).trim() === String(id).trim()) return i + 1;
  }
  return -1;
}

// POST { aksi: 'simpan', id, ...field } → { success, id }  (upsert)
// POST { aksi: 'hapus', id }            → { success }
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const sheet = getSheet_();

    if (body.aksi === 'hapus') {
      const baris = cariBaris_(sheet, body.id);
      if (baris === -1) return jsonResponse_({ success: false, error: 'ID tidak ditemukan: ' + body.id });
      sheet.deleteRow(baris);
      return jsonResponse_({ success: true });
    }

    if (body.aksi === 'simpan') {
      const id = body.id && String(body.id).trim() ? String(body.id) : PREFIX_ID + new Date().getTime();
      const row = HEADERS.map((header) => {
        if (header === 'id') return id;
        return body[header] === undefined || body[header] === null ? '' : body[header];
      });
      const baris = cariBaris_(sheet, id);
      if (baris === -1) sheet.appendRow(row);
      else sheet.getRange(baris, 1, 1, HEADERS.length).setValues([row]);
      return jsonResponse_({ success: true, id: id });
    }

    return jsonResponse_({ success: false, error: 'Aksi tidak dikenal: ' + body.aksi });
  } catch (err) {
    return jsonResponse_({ success: false, error: String(err) });
  }
}
