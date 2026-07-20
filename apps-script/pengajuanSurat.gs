// Pengajuan Surat — Google Apps Script Web App
// Deploy: script.google.com → paste kode ini → Deploy > New deployment > Web App
// Format request/response HARUS cocok dengan docs/api-contract.md
// Lihat apps-script/README.md untuk panduan lengkap.

// Isi dengan ID Spreadsheet backend (bagian /d/<ID>/edit dari URL).
// Boleh dikosongkan jika script ini ter-bind langsung ke Spreadsheet-nya.
const SPREADSHEET_ID = '';
const SHEET_NAME = 'PengajuanSurat';

// Email tujuan notifikasi pengajuan baru. Menggantikan notifikasi WhatsApp:
// MailApp mengirim email GRATIS dari akun Google desa, tanpa server SMTP.
// Kuota gratis ~100 email/hari (Workspace ~1500) — cukup untuk desa.
// Kosongkan untuk menonaktifkan notifikasi.
const EMAIL_DESA = 'desasumberagung@gmail.com';

const HEADERS = [
  'id',
  'nama',
  'nik',
  'alamat',
  'noWa',
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

// Kirim email notifikasi pengajuan surat baru ke perangkat desa.
// Dibungkus try/catch supaya kegagalan email TIDAK membatalkan penyimpanan data.
function kirimNotifikasi_(data) {
  if (!EMAIL_DESA) return;
  try {
    const subjek = 'Pengajuan Surat Baru — ' + data.nama;
    const badan =
      'Ada pengajuan surat baru dari warga:\n\n' +
      'Nama        : ' + data.nama + '\n' +
      'NIK         : ' + data.nik + '\n' +
      'Alamat      : ' + data.alamat + '\n' +
      'No. WhatsApp: ' + data.noWa + '\n' +
      'Jenis Surat : ' + data.jenisSurat + '\n' +
      'Keperluan   : ' + data.keperluan + '\n' +
      'Tanggal     : ' + data.tanggalPengajuan + '\n\n' +
      'Tindak lanjuti melalui panel admin, lalu hubungi warga via WhatsApp ' +
      'untuk persyaratan dokumen.';
    MailApp.sendEmail(EMAIL_DESA, subjek, badan);
  } catch (err) {
    // Catat saja; jangan gagalkan pengajuan hanya karena email gagal.
    console.error('Gagal kirim email notifikasi: ' + err);
  }
}

// POST bercabang lewat `aksi`:
//   { aksi: 'buat', nama, nik, alamat, noWa, jenisSurat, keperluan } → { success, id }
//   { aksi: 'status', id, status }  (atau { id, status } tanpa aksi)  → { success }
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    if (body.aksi === 'buat') {
      return buatPengajuan_(body);
    }
    // Default (kompat lama): update status.
    return updateStatus_(body);
  } catch (err) {
    return jsonResponse_({ success: false, error: String(err) });
  }
}

function buatPengajuan_(body) {
  if (!body.nama || !body.nik) {
    return jsonResponse_({ success: false, error: 'nama dan nik wajib diisi' });
  }

  const id = 'srt-' + new Date().getTime();
  const tanggal = today_();
  const data = {
    id: id,
    nama: body.nama,
    nik: body.nik,
    alamat: body.alamat || '',
    noWa: body.noWa || '',
    jenisSurat: body.jenisSurat || '',
    keperluan: body.keperluan || '',
    status: 'Baru',
    tanggalPengajuan: tanggal,
    tanggalUpdate: tanggal,
  };

  const row = HEADERS.map((h) => data[h]);
  getSheet_().appendRow(row);

  kirimNotifikasi_(data);
  return jsonResponse_({ success: true, id: id });
}

function updateStatus_(body) {
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
}
