// Kelola Konten Kegiatan & Berita — Google Apps Script Web App
// Deploy: script.google.com → paste kode ini → Deploy > New deployment > Web App
// Format request/response HARUS cocok dengan docs/api-contract.md
// Lihat apps-script/README.md untuk panduan lengkap.

// Isi dengan ID Spreadsheet backend (bagian /d/<ID>/edit dari URL).
// Boleh dikosongkan jika script ini ter-bind langsung ke Spreadsheet-nya.
const SPREADSHEET_ID = '';
const SHEET_NAME = 'Konten';
const HEADERS = [
  'id',
  'judul',
  'deskripsi',
  'tanggalKegiatan',
  'kategori',
  'urlFoto',
  'status',
  'dibuatOleh',
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

function normalizeCell_(header, value) {
  if (value instanceof Date && header === 'tanggalKegiatan') {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  }
  return value === null || value === undefined ? '' : String(value);
}

// GET → { data: Konten[] }
// Mengirim semua konten termasuk yang Tersembunyi; penyaringan untuk halaman
// publik dilakukan di sisi Next.js (getKontenPublik).
function doGet() {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();

  const data = values
    .slice(1) // buang header
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

// Cari nomor baris berdasarkan id. -1 jika tidak ketemu.
function cariBaris_(sheet, id) {
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]).trim() === String(id).trim()) return i + 1;
  }
  return -1;
}

// POST { aksi: 'simpan', ...Konten }        → { success, id }
// POST { aksi: 'hapus', id }                → { success }
// POST { aksi: 'status', id, status }       → { success }
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const sheet = getSheet_();

    if (body.aksi === 'hapus') {
      const baris = cariBaris_(sheet, body.id);
      if (baris === -1) {
        return jsonResponse_({ success: false, error: 'ID tidak ditemukan: ' + body.id });
      }
      sheet.deleteRow(baris);
      return jsonResponse_({ success: true });
    }

    if (body.aksi === 'status') {
      const baris = cariBaris_(sheet, body.id);
      if (baris === -1) {
        return jsonResponse_({ success: false, error: 'ID tidak ditemukan: ' + body.id });
      }
      sheet.getRange(baris, HEADERS.indexOf('status') + 1).setValue(body.status);
      return jsonResponse_({ success: true });
    }

    if (body.aksi === 'simpan') {
      if (!body.judul || !String(body.judul).trim()) {
        return jsonResponse_({ success: false, error: 'Judul wajib diisi' });
      }

      // id kosong = konten baru; id terisi = update baris yang sudah ada.
      const id = body.id && String(body.id).trim() ? String(body.id) : 'kt-' + new Date().getTime();
      const row = HEADERS.map((header) => {
        if (header === 'id') return id;
        return body[header] === undefined || body[header] === null ? '' : body[header];
      });

      const baris = cariBaris_(sheet, id);
      if (baris === -1) {
        sheet.appendRow(row);
      } else {
        sheet.getRange(baris, 1, 1, HEADERS.length).setValues([row]);
      }
      return jsonResponse_({ success: true, id: id });
    }

    return jsonResponse_({ success: false, error: 'Aksi tidak dikenal: ' + body.aksi });
  } catch (err) {
    return jsonResponse_({ success: false, error: String(err) });
  }
}
