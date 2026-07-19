# Google Apps Script — Panduan Deploy Manual

File `.gs` di folder ini adalah source backup untuk dua Web App yang digunakan sebagai REST API backend.

## File & Layanan

| File | Fungsi | Status |
|---|---|---|
| `setup.gs` | Utility sekali-jalan: buat tab + header Spreadsheet | Selesai |
| `bukuTamu.gs` | Endpoint Buku Tamu Digital (GET list, POST tamu baru) | Selesai |
| `pengajuanSurat.gs` | Endpoint Pengajuan Surat (GET list, POST update status) | Selesai |
| `kependudukan.gs` | Endpoint Data Penduduk | *TBD (Akan Datang)* |
| `presensi.gs` | Endpoint Presensi Perangkat Desa | *TBD (Akan Datang)* |
| `konten.gs` | Endpoint Manajemen Konten Halaman | *TBD (Akan Datang)* |
| `pengguna.gs` | Endpoint Manajemen Akun Admin | *TBD (Akan Datang)* |
| `galeri.gs` | Endpoint Album Foto | *TBD (Akan Datang)* |

## Struktur Spreadsheet (Template)

Backend membaca/menulis satu Spreadsheet Google berisi dua tab. Kolom harus
**persis** urutan berikut (baris 1 = header):

**Tab `BukuTamu`:**

| id | nama | instansi | keperluan | noWhatsapp | tanggal | jam |
|----|------|----------|-----------|------------|---------|-----|

**Tab `PengajuanSurat`:**

| id | nama | nik | jenisSurat | keperluan | status | tanggalPengajuan | tanggalUpdate |
|----|------|-----|------------|-----------|--------|------------------|---------------|

- `tanggal`/`tanggalPengajuan`/`tanggalUpdate` → format `YYYY-MM-DD`
- `jam` → format `HH:mm`
- `status` → salah satu dari `Baru`, `Diproses`, `Selesai`, `Ditolak`

Tab & header ini dibuat otomatis oleh `setupSpreadsheet()` di `setup.gs`.

## Cara Setup & Deploy

1. Buat **Spreadsheet** baru di Google Sheets → catat ID-nya (bagian `/d/<ID>/edit` pada URL).
2. Buka [script.google.com](https://script.google.com) → **New project**.
3. Paste `setup.gs`, lalu jalankan fungsi **`setupSpreadsheet`** untuk membuat tab + header.
   - Jika project **ter-bind** ke Spreadsheet (via *Extensions > Apps Script* dari dalam Sheet), biarkan `SPREADSHEET_ID` kosong.
   - Jika project **standalone**, isi `SPREADSHEET_ID` di tiap file `.gs` dengan ID langkah 1.
4. Untuk tiap layanan (`bukuTamu.gs`, `pengajuanSurat.gs`): paste kodenya, lalu **Deploy > New deployment > Web App**:
   - **Execute as**: Me (akun Google desa)
   - **Who has access**: Anyone
5. Salin URL Web App masing-masing ke `.env.local` di folder `web/`:
   ```
   APPS_SCRIPT_BUKU_TAMU_URL=https://script.google.com/macros/s/...
   APPS_SCRIPT_SURAT_URL=https://script.google.com/macros/s/...
   ```

> Selama `APPS_SCRIPT_*_URL` kosong, frontend otomatis memakai **data dummy** (lihat `web/src/repository/**/action.ts`), jadi dashboard tetap bisa dipreview tanpa deploy.

## Catatan

- Setiap kali kode `.gs` diubah, harus buat **New deployment** (bukan edit deployment lama)
- URL Web App berubah setiap deployment baru — update `.env.local` jika URL berubah
- Format request/response harus sesuai dengan `docs/api-contract.md`
