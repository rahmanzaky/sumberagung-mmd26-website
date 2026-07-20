// Absensi Digital Perangkat Desa — Google Apps Script Web App
// Deploy: script.google.com → paste kode ini → Deploy > New deployment > Web App
// Format request/response HARUS cocok dengan docs/api-contract.md
// Lihat apps-script/README.md untuk panduan lengkap.

// Isi dengan ID Spreadsheet backend (bagian /d/<ID>/edit dari URL).
// Boleh dikosongkan jika script ini ter-bind langsung ke Spreadsheet-nya.
const SPREADSHEET_ID = '';
const SHEET_NAME = 'Absensi';
const HEADERS = ['id', 'username', 'tanggal', 'jamMasuk', 'keterangan', 'urlFoto', 'latitude', 'longitude'];

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

// Konversi nilai sel tanggal → "YYYY-MM-DD"; jamMasuk → "HH:mm".
function normalizeCell_(header, value) {
  if (value instanceof Date) {
    if (header === 'tanggal') {
      return Utilities.formatDate(value, Session.getScriptTimeZone(), 'yyyy-MM-dd');
    }
    if (header === 'jamMasuk') {
      return Utilities.formatDate(value, Session.getScriptTimeZone(), 'HH:mm');
    }
  }
  return value === null || value === undefined ? '' : String(value);
}

function bacaSemua_(sheet) {
  const values = sheet.getDataRange().getValues();
  return values
    .slice(1) // buang header
    .filter((row) => String(row[0]).trim() !== '') // baris dengan id kosong = diabaikan
    .map((row) => {
      const entry = {};
      HEADERS.forEach((header, i) => {
        entry[header] = normalizeCell_(header, row[i]);
      });
      return entry;
    });
}

// GET → { data: AbsensiEntry[] }
function doGet() {
  return jsonResponse_({ data: bacaSemua_(getSheet_()) });
}

// POST { username, tanggal, jamMasuk, keterangan } → { success, id }
// Menolak absensi kedua di tanggal yang sama (SK-NF-11).
// Validasi ini WAJIB ada di sini, bukan cuma di frontend — endpoint bisa
// dipanggil langsung tanpa lewat UI.
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (!body.username || !body.tanggal) {
      return jsonResponse_({ success: false, error: 'username dan tanggal wajib diisi' });
    }

    const sheet = getSheet_();
    const sudahAda = bacaSemua_(sheet).some(
      (a) => a.username === String(body.username) && a.tanggal === String(body.tanggal),
    );
    if (sudahAda) {
      return jsonResponse_({ success: false, error: 'Absensi hari ini sudah tercatat.' });
    }

    const id = 'ab-' + new Date().getTime();
    const row = HEADERS.map((header) => {
      if (header === 'id') return id;
      return body[header] === undefined || body[header] === null ? '' : body[header];
    });

    sheet.appendRow(row);
    return jsonResponse_({ success: true, id: id });
  } catch (err) {
    return jsonResponse_({ success: false, error: String(err) });
  }
}
