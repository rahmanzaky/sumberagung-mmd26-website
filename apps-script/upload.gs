// Upload Gambar ke Google Drive — Google Apps Script Web App
// Deploy: script.google.com → paste kode ini → Deploy > New deployment > Web App
// Format request/response HARUS cocok dengan docs/api-contract.md
//
// Endpoint ini menyimpan FILE gambar ke Drive dan mengembalikan fileId + url.
// Sheet tetap jadi database (menyimpan url/fileId-nya); Drive hanya file store.
//
// Gambar sudah dikompres di sisi browser sebelum dikirim (base64), jadi ukuran
// per file kecil (~150–300 KB) dan hemat kuota 15 GB akun Google desa.

// ID folder Drive tujuan. Buat folder di Drive → buka → salin ID dari URL
// (bagian /folders/<ID>). Boleh beda folder per jenis (mis. bukti absensi
// dipisah dari galeri publik).
const FOLDER_ID = '';

// true  = file bisa dilihat siapa saja yang punya link (untuk galeri publik).
// false = file privat, hanya akun desa (untuk bukti absensi). Default privat.
const PUBLIK = false;

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function getFolder_() {
  if (FOLDER_ID) return DriveApp.getFolderById(FOLDER_ID);
  // Fallback: folder root Drive (sebaiknya isi FOLDER_ID agar rapi).
  return DriveApp.getRootFolder();
}

// POST { namaFile, mimeType, dataBase64 }  → { success, fileId, url }
// dataBase64 = isi file (tanpa prefix "data:...;base64,").
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (!body.dataBase64) {
      return jsonResponse_({ success: false, error: 'dataBase64 kosong' });
    }

    const mime = body.mimeType || 'image/jpeg';
    const nama = body.namaFile || 'gambar-' + new Date().getTime() + '.jpg';

    const bytes = Utilities.base64Decode(body.dataBase64);
    const blob = Utilities.newBlob(bytes, mime, nama);
    const file = getFolder_().createFile(blob);

    if (PUBLIK) {
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    }

    return jsonResponse_({
      success: true,
      fileId: file.getId(),
      url: 'https://drive.google.com/file/d/' + file.getId() + '/view',
    });
  } catch (err) {
    return jsonResponse_({ success: false, error: String(err) });
  }
}
