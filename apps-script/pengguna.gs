// Kelola Pengguna (Perangkat Desa) — Google Apps Script Web App
// Deploy: script.google.com → paste kode ini → Deploy > New deployment > Web App
// Format request/response HARUS cocok dengan docs/api-contract.md
// Lihat apps-script/README.md untuk panduan lengkap.
//
// Deviasi dari SRS 3.1: kolom Password TIDAK disimpan. Login memakai Google
// OAuth di sisi Next.js, dan pencocokan akun dilakukan lewat kolom `email`.

// Isi dengan ID Spreadsheet backend (bagian /d/<ID>/edit dari URL).
// Boleh dikosongkan jika script ini ter-bind langsung ke Spreadsheet-nya.
const SPREADSHEET_ID = '';
const SHEET_NAME = 'PerangkatDesa';
const HEADERS = ['username', 'namaLengkap', 'jabatan', 'noWa', 'email', 'role'];

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

// GET → { data: Pengguna[] }
function doGet() {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  const rows = values.slice(1); // buang header

  const data = rows
    .filter((row) => String(row[0]).trim() !== '') // baris tanpa username = diabaikan
    .map((row) => {
      const entry = {};
      HEADERS.forEach((header, i) => {
        entry[header] = row[i] === null || row[i] === undefined ? '' : String(row[i]);
      });
      return entry;
    });

  return jsonResponse_({ data: data });
}

// Cari nomor baris berdasarkan username. -1 jika tidak ketemu.
function cariBaris_(sheet, username) {
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]).trim() === String(username).trim()) return i + 1;
  }
  return -1;
}

// POST { aksi: 'simpan', ...Pengguna } → { success }
// POST { aksi: 'hapus', username }     → { success }
// 'simpan' bersifat upsert: update bila username sudah ada, tambah bila belum.
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const sheet = getSheet_();

    if (body.aksi === 'hapus') {
      const baris = cariBaris_(sheet, body.username);
      if (baris === -1) {
        return jsonResponse_({ success: false, error: 'Username tidak ditemukan: ' + body.username });
      }
      sheet.deleteRow(baris);
      return jsonResponse_({ success: true });
    }

    if (body.aksi === 'simpan') {
      if (!body.username || !String(body.username).trim()) {
        return jsonResponse_({ success: false, error: 'Username wajib diisi' });
      }

      const row = HEADERS.map((header) =>
        body[header] === undefined || body[header] === null ? '' : body[header],
      );

      const baris = cariBaris_(sheet, body.username);
      if (baris === -1) {
        sheet.appendRow(row);
      } else {
        sheet.getRange(baris, 1, 1, HEADERS.length).setValues([row]);
      }
      return jsonResponse_({ success: true });
    }

    return jsonResponse_({ success: false, error: 'Aksi tidak dikenal: ' + body.aksi });
  } catch (err) {
    return jsonResponse_({ success: false, error: String(err) });
  }
}
