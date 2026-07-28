// Backend Desa Sumberagung — SATU Web App untuk semua endpoint.
// Menggantikan 17 file .gs terpisah: satu doGet/doPost merutekan semua "resource"
// lewat parameter. Deploy SEKALI → satu URL dipakai seluruh website.
//
// Kontrak:
//   GET  ?resource=<key>                         → { data: ... }
//   POST { "resource":"<key>", "aksi":"...", ... } → { success, ... }
// Daftar <key> lihat objek RESOURCES di bawah (mis. pengguna, absensi, surat).
//
// Cara deploy: script.google.com → New project → tempel file ini →
//   isi SPREADSHEET_ID, FOLDER_ID, EMAIL_DESA → Deploy > New deployment > Web App
//   (Execute as: Me · Who has access: Anyone). Salin URL ke APPS_SCRIPT_URL.
// Header tiap tab dibuat oleh setup.gs (jalankan sekali dari dalam Spreadsheet).

// ====== KONFIGURASI (isi sebelum deploy) ======
const SPREADSHEET_ID = '11h2POo-ZcLlnRpU9t1nMU65fBWGQVe7nLU3wa4o3U3I'; // ID Spreadsheet database (bagian /d/<ID>/edit)
const FOLDER_ID = ''; // ID folder Drive untuk foto (upload)
const EMAIL_DESA = 'desasumberagung@gmail.com'; // tujuan notifikasi surat baru
const PUBLIK_DEFAULT = false; // sharing default file upload bila tak disebut

// ====== PETA RESOURCE ======
// Kolom tiap tab dibaca dari baris header sheet (dibuat setup.gs), jadi tidak
// perlu ditulis ulang di sini. Yang diperlukan: nama sheet, tipe, kolom kunci,
// prefix id, kolom angka/tanggal/jam, dan penanda handler khusus.
const RESOURCES = {
  bukuTamu: { sheet: 'BukuTamu', type: 'list', key: 'id', prefix: 'bt-', date: ['tanggal'], time: ['jam'] },
  surat: { sheet: 'PengajuanSurat', type: 'list', key: 'id', prefix: 'srt-', date: ['tanggalPengajuan', 'tanggalUpdate'], handler: 'surat' },
  absensi: { sheet: 'Absensi', type: 'list', key: 'id', prefix: 'ab-', date: ['tanggal'], time: ['jamMasuk'], handler: 'absensi' },
  kependudukan: { sheet: 'Kependudukan', type: 'list', key: 'tahun', num: ['tahun', 'totalPenduduk', 'lakiLaki', 'perempuan', 'jumlahKK', 'jumlahRt', 'jumlahRw'] },
  pengguna: { sheet: 'PerangkatDesa', type: 'list', key: 'username' },
  konten: { sheet: 'Konten', type: 'list', key: 'id', prefix: 'kt-', date: ['tanggalKegiatan'] },
  misi: { sheet: 'Misi', type: 'list', key: 'id', prefix: 'ms-', num: ['urutan'] },
  sejarah: { sheet: 'Sejarah', type: 'list', key: 'id', prefix: 'sj-', num: ['urutan'] },
  struktur: { sheet: 'Struktur', type: 'list', key: 'id', prefix: 'jb-', num: ['level', 'urutan'] },
  distribusiUsia: { sheet: 'DistribusiUsia', type: 'list', key: 'id', prefix: 'du-', num: ['lakiLaki', 'perempuan', 'urutan'] },
  pendidikan: { sheet: 'Pendidikan', type: 'list', key: 'id', prefix: 'tp-', num: ['persentase', 'urutan'] },
  profilVisi: { sheet: 'ProfilVisi', type: 'kv' },
  geografi: { sheet: 'Geografi', type: 'kv' },
  pengaturan: { sheet: 'Pengaturan', type: 'kv' },
  heroSlider: { sheet: 'HeroSlider', type: 'list', key: 'id', prefix: 'hs-', num: ['urutan'] },
};

// ====== UTILITAS ======
function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function getSpreadsheet_() {
  return SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
}

function getSheet_(nama) {
  const sheet = getSpreadsheet_().getSheetByName(nama);
  if (!sheet) throw new Error('Sheet "' + nama + '" tidak ditemukan. Jalankan setupSpreadsheet() dulu.');
  return sheet;
}

function today_() {
  return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
}

function jamSekarang_() {
  return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'HH:mm');
}

function normalize_(cfg, header, value) {
  if (cfg.num && cfg.num.indexOf(header) !== -1) {
    const n = Number(value);
    return isNaN(n) ? 0 : n;
  }
  if (value instanceof Date) {
    if (cfg.date && cfg.date.indexOf(header) !== -1) {
      return Utilities.formatDate(value, Session.getScriptTimeZone(), 'yyyy-MM-dd');
    }
    if (cfg.time && cfg.time.indexOf(header) !== -1) {
      return Utilities.formatDate(value, Session.getScriptTimeZone(), 'HH:mm');
    }
  }
  return value === null || value === undefined ? '' : String(value);
}

// ====== BACA ======
function bacaList_(cfg) {
  const values = getSheet_(cfg.sheet).getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0].map(String);
  const out = [];
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (String(row[0]).trim() === '') continue; // baris kosong (kolom pertama)
    const obj = {};
    for (let c = 0; c < headers.length; c++) {
      obj[headers[c]] = normalize_(cfg, headers[c], row[c]);
    }
    out.push(obj);
  }
  return out;
}

function bacaKv_(cfg) {
  const values = getSheet_(cfg.sheet).getDataRange().getValues();
  const out = {};
  for (let i = 1; i < values.length; i++) {
    const k = String(values[i][0]).trim();
    if (!k) continue;
    let v = values[i][1];
    if (v instanceof Date) v = Utilities.formatDate(v, Session.getScriptTimeZone(), 'HH:mm');
    out[k] = v === null || v === undefined ? '' : String(v);
  }
  return out;
}

// ====== TULIS (generik) ======
function upsertRow_(cfg, body) {
  const sheet = getSheet_(cfg.sheet);
  const values = sheet.getDataRange().getValues();
  const headers = values[0].map(String);
  const keyField = cfg.key;
  const keyCol = headers.indexOf(keyField);

  let keyVal;
  let idBaru = null;
  if (keyField === 'id') {
    keyVal = body.id && String(body.id).trim() ? String(body.id) : cfg.prefix + new Date().getTime();
    idBaru = keyVal;
  } else {
    if (body[keyField] === undefined || String(body[keyField]).trim() === '') {
      return json_({ success: false, error: keyField + ' wajib diisi' });
    }
    keyVal = String(body[keyField]);
  }

  const row = headers.map(function (h) {
    if (h === keyField && keyField === 'id') return keyVal;
    let v = body[h];
    if (v === undefined || v === null) v = '';
    if (cfg.num && cfg.num.indexOf(h) !== -1) return Number(v) || 0;
    return v;
  });

  let found = -1;
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][keyCol]) === String(keyVal)) {
      found = i + 1;
      break;
    }
  }
  if (found === -1) sheet.appendRow(row);
  else sheet.getRange(found, 1, 1, headers.length).setValues([row]);

  return json_({ success: true, id: idBaru || keyVal });
}

function hapusRow_(cfg, body) {
  const sheet = getSheet_(cfg.sheet);
  const values = sheet.getDataRange().getValues();
  const keyCol = values[0].map(String).indexOf(cfg.key);
  const keyVal = String(body[cfg.key]);
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][keyCol]) === keyVal) {
      sheet.deleteRow(i + 1);
      return json_({ success: true });
    }
  }
  return json_({ success: false, error: cfg.key + ' tidak ditemukan: ' + keyVal });
}

function setKolom_(cfg, idVal, kolom, nilai) {
  const sheet = getSheet_(cfg.sheet);
  const values = sheet.getDataRange().getValues();
  const headers = values[0].map(String);
  const idCol = headers.indexOf('id');
  const targetCol = headers.indexOf(kolom);
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][idCol]) === String(idVal)) {
      sheet.getRange(i + 1, targetCol + 1).setValue(nilai);
      return true;
    }
  }
  return false;
}

function kvUpsert_(cfg, body) {
  const sheet = getSheet_(cfg.sheet);
  const values = sheet.getDataRange().getValues();
  const idx = {};
  for (let i = 1; i < values.length; i++) {
    const k = String(values[i][0]).trim();
    if (k) idx[k] = i + 1;
  }
  Object.keys(body).forEach(function (key) {
    if (key === 'resource' || key === 'aksi') return;
    const val = body[key] === undefined || body[key] === null ? '' : String(body[key]);
    if (idx[key]) sheet.getRange(idx[key], 2).setValue(val);
    else sheet.appendRow([key, val]);
  });
  return json_({ success: true });
}

// ====== HANDLER KHUSUS ======
function handlerSurat_(cfg, body) {
  if (body.aksi === 'buat') {
    const id = cfg.prefix + new Date().getTime();
    const tgl = today_();
    const data = {
      id: id,
      nama: body.nama || '',
      nik: body.nik || '',
      alamat: body.alamat || '',
      noWa: body.noWa || '',
      jenisSurat: body.jenisSurat || '',
      keperluan: body.keperluan || '',
      status: 'Baru',
      tanggalPengajuan: tgl,
      tanggalUpdate: tgl,
    };
    if (!data.nama || !data.nik) {
      return json_({ success: false, error: 'nama dan nik wajib diisi' });
    }
    // Bangun baris sesuai urutan header.
    const sheet = getSheet_(cfg.sheet);
    const headers = sheet.getDataRange().getValues()[0].map(String);
    sheet.appendRow(headers.map(function (h) { return data[h] === undefined ? '' : data[h]; }));
    kirimEmailSurat_(data);
    return json_({ success: true, id: id });
  }
  // Update status (kompat: body tanpa aksi juga masuk ke sini).
  const VALID = ['Baru', 'Diproses', 'Selesai', 'Ditolak'];
  if (!body.id || VALID.indexOf(body.status) === -1) {
    return json_({ success: false, error: 'id atau status tidak valid' });
  }
  setKolom_(cfg, body.id, 'status', body.status);
  setKolom_(cfg, body.id, 'tanggalUpdate', today_());
  return json_({ success: true });
}

function kirimEmailSurat_(data) {
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
      'Tindak lanjuti melalui panel admin, lalu hubungi warga via WhatsApp.';
    MailApp.sendEmail(EMAIL_DESA, subjek, badan);
  } catch (err) {
    console.error('Gagal kirim email notifikasi: ' + err);
  }
}

function handlerAbsensi_(cfg, body) {
  if (!body.username || !body.tanggal) {
    return json_({ success: false, error: 'username dan tanggal wajib diisi' });
  }
  // Tolak absensi kedua di tanggal yang sama (SK-NF-11).
  const sudah = bacaList_(cfg).some(function (a) {
    return a.username === String(body.username) && a.tanggal === String(body.tanggal);
  });
  if (sudah) return json_({ success: false, error: 'Absensi hari ini sudah tercatat.' });

  const id = cfg.prefix + new Date().getTime();
  const sheet = getSheet_(cfg.sheet);
  const headers = sheet.getDataRange().getValues()[0].map(String);
  const data = {
    id: id,
    username: body.username,
    tanggal: body.tanggal,
    jamMasuk: body.jamMasuk || jamSekarang_(),
    keterangan: body.keterangan || '',
    urlFoto: body.urlFoto || '',
    latitude: body.latitude || '',
    longitude: body.longitude || '',
  };
  sheet.appendRow(headers.map(function (h) { return data[h] === undefined ? '' : data[h]; }));
  return json_({ success: true, id: id });
}

function handlerUpload_(body) {
  if (!body.dataBase64) return json_({ success: false, error: 'dataBase64 kosong' });
  const mime = body.mimeType || 'image/jpeg';
  const nama = body.namaFile || 'gambar-' + new Date().getTime() + '.jpg';
  const bytes = Utilities.base64Decode(body.dataBase64);
  const blob = Utilities.newBlob(bytes, mime, nama);
  const folder = FOLDER_ID ? DriveApp.getFolderById(FOLDER_ID) : DriveApp.getRootFolder();
  const file = folder.createFile(blob);
  const publik = body.publik === undefined ? PUBLIK_DEFAULT : !!body.publik;
  if (publik) file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return json_({
    success: true,
    fileId: file.getId(),
    url: 'https://drive.google.com/file/d/' + file.getId() + '/view',
  });
}

// ====== ROUTER ======
function doGet(e) {
  try {
    const r = e && e.parameter ? e.parameter.resource : '';
    if (!r) return json_({ ok: true, pesan: 'Backend Desa Sumberagung aktif. Sertakan ?resource=.' });
    const cfg = RESOURCES[r];
    if (!cfg) return json_({ success: false, error: 'resource tidak dikenal: ' + r });
    return json_({ data: cfg.type === 'kv' ? bacaKv_(cfg) : bacaList_(cfg) });
  } catch (err) {
    return json_({ success: false, error: String(err) });
  }
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const r = body.resource;

    if (r === 'upload') return handlerUpload_(body);

    const cfg = RESOURCES[r];
    if (!cfg) return json_({ success: false, error: 'resource tidak dikenal: ' + r });

    if (cfg.type === 'kv') return kvUpsert_(cfg, body);

    if (cfg.handler === 'surat') return handlerSurat_(cfg, body);
    if (cfg.handler === 'absensi') return handlerAbsensi_(cfg, body);

    const aksi = body.aksi || 'simpan';
    if (aksi === 'hapus') return hapusRow_(cfg, body);
    if (aksi === 'status') {
      const ok = setKolom_(cfg, body.id, 'status', body.status);
      return json_({ success: ok, error: ok ? undefined : 'id tidak ditemukan' });
    }
    return upsertRow_(cfg, body); // 'simpan' / 'buat'
  } catch (err) {
    return json_({ success: false, error: String(err) });
  }
}

// =====================================================================
// TAMBALAN KEAMANAN untuk Code.gs
// Tujuan: resource berisi data pribadi hanya bisa dibaca oleh server
// Next.js, bukan siapa pun yang menebak URL.
//
// Cara pasang: tempel blok ini ke Code.gs, lalu ubah tiga tempat yang
// ditandai LANGKAH 2, 3, dan 4 di bawah.
// =====================================================================


// ------------------- LANGKAH 1: tempel blok ini -------------------

// Isi dengan string acak panjang. Contoh cara membuatnya di terminal:
//   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
// Nilai yang sama dipasang di web/.env.local sebagai APPS_SCRIPT_TOKEN.
// Selama masih kosong, pemeriksaan dilewati supaya tidak memutus
// pengembangan yang sedang berjalan.
const TOKEN_INTERNAL = '509c43c9db87986f37f158fd494da9ee5e041aee75593302643a2c17c82936c4';

// Resource yang boleh dibaca tanpa token: seluruhnya konten halaman publik.
const RESOURCE_PUBLIK = [
  'sejarah',
  'misi',
  'struktur',
  'konten',
  'kependudukan',
  'distribusiUsia',
  'pendidikan',
  'profilVisi',
  'geografi',
  'pengaturan',
  'heroSlider',
];

function butuhToken_(resource) {
  return RESOURCE_PUBLIK.indexOf(resource) === -1;
}

function tokenValid_(tokenMasuk) {
  if (!TOKEN_INTERNAL) return true; // belum diaktifkan
  return String(tokenMasuk || '') === TOKEN_INTERNAL;
}

function tolak_() {
  return json_({ success: false, error: 'Akses ditolak.' });
}


// ------------------- LANGKAH 2: di dalam doGet -------------------
//
// Setelah baris:
//     if (!cfg) return json_({ success: false, error: 'resource tidak dikenal: ' + r });
//
// tambahkan:
//
//     if (butuhToken_(r) && !tokenValid_(e.parameter.token)) return tolak_();


// ------------------- LANGKAH 3: di dalam doPost -------------------
//
// Setelah baris:
//     const r = body.resource;
//
// tambahkan:
//
//     if (butuhToken_(r) && !tokenValid_(body.token)) return tolak_();
//
// Catatan: 'upload' juga tidak ada di RESOURCE_PUBLIK, jadi ikut terlindungi.


// ------------------- LANGKAH 4: perbaiki kvUpsert_ -------------------
//
// Fungsi kvUpsert_ menulis SEMUA field body ke sheet. Tanpa perubahan,
// token akan ikut tersimpan sebagai baris. Ubah baris:
//
//     if (key === 'resource' || key === 'aksi') return;
//
// menjadi:
//
//     if (key === 'resource' || key === 'aksi' || key === 'token') return;