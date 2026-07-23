# Google Apps Script — Backend Desa Sumberagung

Backend memakai **satu Web App** (`Code.gs`) yang merutekan semua endpoint lewat
parameter `resource`. Sebelumnya ada 17 file terpisah; kini digabung supaya
cukup **sekali deploy** dan **satu URL**.

## File

| File | Fungsi |
|---|---|
| `setup.gs` | Utility sekali-jalan: membuat semua tab + baris header. Dijalankan dari dalam Spreadsheet (Extensions → Apps Script). |
| `Code.gs` | Backend gabungan: satu `doGet`/`doPost` untuk semua resource + upload Drive + email. Ini yang di-deploy sebagai Web App. |

## Cara pakai

Panduan lengkap (langkah-demi-langkah, Bahasa Indonesia) ada di
[`docs/panduan-deploy-appscript.md`](../docs/panduan-deploy-appscript.md).

Ringkas:

1. Buat Spreadsheet → Extensions → Apps Script → tempel `setup.gs` → run
   `setupSpreadsheet` (membuat 16 tab).
2. Buat folder Drive untuk foto, catat ID-nya.
3. script.google.com → New project → tempel `Code.gs` → isi `SPREADSHEET_ID`,
   `FOLDER_ID`, `EMAIL_DESA` → **Deploy → New deployment → Web App**
   (Execute as: **Me**, Who has access: **Anyone**).
4. Salin URL `/exec` ke `web/.env.local` pada `APPS_SCRIPT_URL`.

> `APPS_SCRIPT_URL` kosong → seluruh modul memakai **data contoh** (website tetap
> jalan tanpa backend).

## Kontrak

- **GET** `?resource=<key>` → `{ data: ... }`
- **POST** `{ "resource":"<key>", "aksi":"...", ... }` → `{ success, ... }`

Daftar `resource` & bentuk datanya ada di objek `RESOURCES` dalam `Code.gs` dan
di [`docs/api-contract.md`](../docs/api-contract.md). Resource khusus:
`upload` (simpan foto ke Drive), `surat` (buat + email / update status),
`absensi` (absen 1×/hari).

## Update kode

Setelah mengubah `Code.gs`: **Deploy → Manage deployments → Edit → Version: New
version → Deploy.** URL tetap sama, jadi `.env.local` tidak perlu diubah.
