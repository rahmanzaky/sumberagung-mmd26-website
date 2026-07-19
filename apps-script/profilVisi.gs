// Profil Desa — Visi (record tunggal) — Google Apps Script Web App
// Deploy: script.google.com → paste kode ini → Deploy > New deployment > Web App
// Format request/response HARUS cocok dengan docs/api-contract.md
//
// Sheet kunci-nilai (2 kolom): judul halaman + kutipan visi.

const SPREADSHEET_ID = '';
const SHEET_NAME = 'ProfilVisi';

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

// GET → { data: { <kunci>: <nilai>, ... } }
function doGet() {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  const data = {};
  values.slice(1).forEach((row) => {
    const kunci = String(row[0]).trim();
    if (kunci !== '') data[kunci] = row[1] === null || row[1] === undefined ? '' : String(row[1]);
  });
  return jsonResponse_({ data: data });
}

// POST { <kunci>: <nilai>, ... } → { success }  (upsert per kunci)
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const sheet = getSheet_();
    const values = sheet.getDataRange().getValues();

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
