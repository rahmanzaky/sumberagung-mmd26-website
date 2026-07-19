// Presensi Perangkat Desa — Google Apps Script Web App
// Deploy: script.google.com → paste kode ini → Deploy > New deployment > Web App
// Format request/response HARUS cocok dengan docs/api-contract.md
// Lihat apps-script/README.md untuk panduan lengkap.

// Isi dengan ID Spreadsheet backend (bagian /d/<ID>/edit dari URL).
// Boleh dikosongkan jika script ini ter-bind langsung ke Spreadsheet-nya.
const SPREADSHEET_ID = '';
const SHEET_NAME = 'Presensi';
const HEADERS = [
  'id',
  'nama',
  'jabatan',
  'tanggal',
  'jamMasuk',
  'jamPulang',
  'status',
  'keterangan',
];

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

// Konversi nilai sel tanggal → 'YYYY-MM-DD'; jamMasuk/jamPulang → 'HH:mm'.
function normalizeCell_(header, value) {
  if (value instanceof Date) {
    if (header === 'tanggal') {
      return Utilities.formatDate(
        value,
        Session.getScriptTimeZone(),
        'yyyy-MM-dd',
      );
    }
    if (header === 'jamMasuk' || header === 'jamPulang') {
      return Utilities.formatDate(value, Session.getScriptTimeZone(), 'HH:mm');
    }
  }
  return value === null || value === undefined ? '' : String(value);
}

// GET → { data: PresensiEntry[] }
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

// POST { id, status, keterangan } → { success }
// Mengubah status kehadiran satu baris (dipakai admin dari dashboard Absensi).
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const sheet = getSheet_();
    const values = sheet.getDataRange().getValues();

    const kolomStatus = HEADERS.indexOf('status') + 1;
    const kolomKeterangan = HEADERS.indexOf('keterangan') + 1;

    // Baris 1 = header, jadi indeks data ke-i ada di baris i+2.
    for (let i = 1; i < values.length; i++) {
      if (String(values[i][0]) === String(body.id)) {
        sheet.getRange(i + 1, kolomStatus).setValue(body.status);
        sheet.getRange(i + 1, kolomKeterangan).setValue(body.keterangan || '');
        return jsonResponse_({ success: true });
      }
    }

    return jsonResponse_({ success: false, error: 'ID tidak ditemukan: ' + body.id });
  } catch (err) {
    return jsonResponse_({ success: false, error: String(err) });
  }
}
