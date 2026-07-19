// Data Kependudukan — Google Apps Script Web App
// Deploy: script.google.com → paste kode ini → Deploy > New deployment > Web App
// Format request/response HARUS cocok dengan docs/api-contract.md
// Lihat apps-script/README.md untuk panduan lengkap.
//
// Satu baris = statistik satu tahun (SRS 3.1, Sheet 6).

// Isi dengan ID Spreadsheet backend (bagian /d/<ID>/edit dari URL).
// Boleh dikosongkan jika script ini ter-bind langsung ke Spreadsheet-nya.
const SPREADSHEET_ID = '';
const SHEET_NAME = 'Kependudukan';
const HEADERS = [
  'tahun',
  'totalPenduduk',
  'lakiLaki',
  'perempuan',
  'jumlahKK',
  'jumlahRt',
  'jumlahRw',
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

// Semua kolom di sheet ini angka — kirim sebagai number, bukan string.
function angka_(value) {
  const n = Number(value);
  return isNaN(n) ? 0 : n;
}

// GET → { data: KependudukanTahun[] }
function doGet() {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();

  const data = values
    .slice(1) // buang header
    .filter((row) => String(row[0]).trim() !== '') // baris tanpa tahun = diabaikan
    .map((row) => {
      const entry = {};
      HEADERS.forEach((header, i) => {
        entry[header] = angka_(row[i]);
      });
      return entry;
    });

  return jsonResponse_({ data: data });
}

// Cari nomor baris berdasarkan tahun. -1 jika tidak ketemu.
function cariBaris_(sheet, tahun) {
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (angka_(values[i][0]) === angka_(tahun)) return i + 1;
  }
  return -1;
}

// POST { tahun, totalPenduduk, lakiLaki, perempuan, jumlahKK, jumlahRt, jumlahRw }
//   → { success }
// Upsert: update baris bila tahun sudah ada, tambah baris bila belum.
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (!body.tahun) {
      return jsonResponse_({ success: false, error: 'tahun wajib diisi' });
    }

    const sheet = getSheet_();
    const row = HEADERS.map((header) => angka_(body[header]));

    const baris = cariBaris_(sheet, body.tahun);
    if (baris === -1) {
      sheet.appendRow(row);
    } else {
      sheet.getRange(baris, 1, 1, HEADERS.length).setValues([row]);
    }

    return jsonResponse_({ success: true });
  } catch (err) {
    return jsonResponse_({ success: false, error: String(err) });
  }
}
