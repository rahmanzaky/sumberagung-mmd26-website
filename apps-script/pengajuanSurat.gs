// Pengajuan Surat — Google Apps Script Web App
// Deploy: script.google.com → paste kode ini → Deploy > New deployment > Web App
// Format request/response HARUS cocok dengan docs/api-contract.md
// Lihat apps-script/README.md untuk panduan lengkap.

// Isi dengan ID Spreadsheet backend (bagian /d/<ID>/edit dari URL).
// Boleh dikosongkan jika script ini ter-bind langsung ke Spreadsheet-nya.
const SPREADSHEET_ID = '';
const SHEET_NAME = 'PengajuanSurat';
const HEADERS = [
  'id',
  'nama',
  'nik',
  'jenisSurat',
  'keperluan',
  'status',
  'tanggalPengajuan',
  'tanggalUpdate',
];
const VALID_STATUS = ['Baru', 'Diproses', 'Selesai', 'Ditolak'];

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
  if (value instanceof Date && (header === 'tanggalPengajuan' || header === 'tanggalUpdate')) {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  }
  return value === null || value === undefined ? '' : String(value);
}

function today_() {
  return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
}

// GET → { data: PengajuanSurat[] }
function doGet() {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  const rows = values.slice(1);

  const data = rows
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

// POST { id, status } → { success }
// Update status pengajuan + set tanggalUpdate = hari ini.
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const id = body.id;
    const status = body.status;

    if (!id || VALID_STATUS.indexOf(status) === -1) {
      return jsonResponse_({ success: false, error: 'id atau status tidak valid' });
    }

    const sheet = getSheet_();
    const values = sheet.getDataRange().getValues();
    const idCol = HEADERS.indexOf('id');
    const statusCol = HEADERS.indexOf('status');
    const updateCol = HEADERS.indexOf('tanggalUpdate');

    for (let r = 1; r < values.length; r++) {
      if (String(values[r][idCol]) === String(id)) {
        sheet.getRange(r + 1, statusCol + 1).setValue(status);
        sheet.getRange(r + 1, updateCol + 1).setValue(today_());
        return jsonResponse_({ success: true });
      }
    }

    return jsonResponse_({ success: false, error: 'id tidak ditemukan' });
  } catch (err) {
    return jsonResponse_({ success: false, error: String(err) });
  }
}
