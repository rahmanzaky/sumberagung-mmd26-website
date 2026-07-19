// Pengaturan Situs — Google Apps Script Web App
// Deploy: script.google.com → paste kode ini → Deploy > New deployment > Web App
// Format request/response HARUS cocok dengan docs/api-contract.md
// Lihat apps-script/README.md untuk panduan lengkap.
//
// Sheet ini berbentuk pasangan kunci-nilai (2 kolom), bukan satu baris per
// record — supaya menambah pengaturan baru cukup menambah baris.

// Isi dengan ID Spreadsheet backend (bagian /d/<ID>/edit dari URL).
// Boleh dikosongkan jika script ini ter-bind langsung ke Spreadsheet-nya.
const SPREADSHEET_ID = '';
const SHEET_NAME = 'Pengaturan';
const HEADERS = ['kunci', 'nilai'];

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

// Jam ditulis Sheets sebagai Date — kembalikan ke "HH:mm".
function normalizeNilai_(value) {
  if (value instanceof Date) {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), 'HH:mm');
  }
  return value === null || value === undefined ? '' : String(value);
}

// GET → { data: { <kunci>: <nilai>, ... } }
function doGet() {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();

  const data = {};
  values.slice(1).forEach((row) => {
    const kunci = String(row[0]).trim();
    if (kunci !== '') data[kunci] = normalizeNilai_(row[1]);
  });

  return jsonResponse_({ data: data });
}

// POST { <kunci>: <nilai>, ... } → { success }
// Upsert setiap kunci yang dikirim; kunci lain di sheet dibiarkan apa adanya.
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const sheet = getSheet_();
    const values = sheet.getDataRange().getValues();

    // Peta kunci → nomor baris, supaya tidak scan ulang untuk tiap kunci.
    const barisKunci = {};
    for (let i = 1; i < values.length; i++) {
      const kunci = String(values[i][0]).trim();
      if (kunci !== '') barisKunci[kunci] = i + 1;
    }

    Object.keys(body).forEach((kunci) => {
      const nilai = body[kunci] === undefined || body[kunci] === null ? '' : String(body[kunci]);
      if (barisKunci[kunci]) {
        sheet.getRange(barisKunci[kunci], 2).setValue(nilai);
      } else {
        sheet.appendRow([kunci, nilai]);
      }
    });

    return jsonResponse_({ success: true });
  } catch (err) {
    return jsonResponse_({ success: false, error: String(err) });
  }
}
