# Google Apps Script — Panduan Deploy Manual

File `.gs` di folder ini adalah source backup untuk Web App yang digunakan sebagai REST API backend.

> **Penting:** setiap file layanan di-deploy sebagai **project Apps Script terpisah**
> (masing-masing punya URL Web App sendiri). Jangan menaruh dua file layanan di satu
> project — semuanya mendeklarasikan `SHEET_NAME`, `doGet`, dan `doPost`, sehingga
> akan bentrok di scope global.

## File & Layanan

| File | Fungsi | Status |
|---|---|---|
| `setup.gs` | Utility sekali-jalan: buat tab + header Spreadsheet | Selesai |
| `bukuTamu.gs` | Endpoint Buku Tamu Digital (GET list, POST tamu baru) | Selesai |
| `pengajuanSurat.gs` | Endpoint Pengajuan Surat (GET list, POST update status) | Selesai |
| `presensi.gs` | Endpoint Absensi Digital (GET rekap, POST absen 1x/hari) | Selesai |
| `kependudukan.gs` | Endpoint Data Kependudukan per tahun (GET, POST upsert) | Selesai |
| `pengguna.gs` | Endpoint Akun Perangkat Desa (GET, POST simpan/hapus) | Selesai |
| `konten.gs` | Endpoint Konten Berita & Kegiatan (GET, POST simpan/hapus/status) | Selesai |
| `galeri.gs` | Endpoint Galeri Foto (GET, POST simpan/hapus) | Selesai |
| `pengaturan.gs` | Endpoint Konfigurasi Situs (GET, POST upsert kunci-nilai) | Selesai |
| `beranda.gs` | CMS Beranda (GET, POST upsert kunci-nilai) | Selesai |
| `profilVisi.gs` | CMS Profil — Visi (GET, POST upsert kunci-nilai) | Selesai |
| `misi.gs` | CMS Profil — Misi (GET, POST simpan/hapus, berurut) | Selesai |
| `geografi.gs` | CMS Geografi (GET, POST upsert kunci-nilai) | Selesai |
| `sejarah.gs` | CMS Sejarah — Timeline (GET, POST simpan/hapus, berurut) | Selesai |
| `struktur.gs` | CMS Struktur Organisasi (GET, POST simpan/hapus, berurut) | Selesai |
| `distribusiUsia.gs` | CMS Demografi — Distribusi Usia (GET, POST, berurut) | Selesai |
| `pendidikan.gs` | CMS Demografi — Tingkat Pendidikan (GET, POST, berurut) | Selesai |
| `upload.gs` | Upload gambar ke Drive (POST base64 → fileId/url) | Selesai |

## Struktur Spreadsheet (Template)

Backend membaca/menulis satu Spreadsheet Google berisi delapan tab. Nama tab
mengikuti SRS 3.1 (Sheet 1–6), ditambah `Galeri` & `Pengaturan`. Kolom harus
**persis** urutan berikut (baris 1 = header):

**Tab `BukuTamu`:**

| id | nama | instansi | keperluan | noWhatsapp | tanggal | jam |
|----|------|----------|-----------|------------|---------|-----|

**Tab `PengajuanSurat`:**

| id | nama | nik | jenisSurat | keperluan | status | tanggalPengajuan | tanggalUpdate |
|----|------|-----|------------|-----------|--------|------------------|---------------|

- `tanggal`/`tanggalPengajuan`/`tanggalUpdate` → format `YYYY-MM-DD`
- `jam` → format `HH:mm`
**Tab `Absensi`:**

| id | username | tanggal | jamMasuk | keterangan |
|----|----------|---------|----------|------------|

**Tab `Kependudukan`:**

| tahun | totalPenduduk | lakiLaki | perempuan | jumlahKK | jumlahRt | jumlahRw |
|-------|---------------|----------|-----------|----------|----------|----------|

**Tab `PerangkatDesa`:**

| username | namaLengkap | jabatan | noWa | email | role |
|----------|-------------|---------|------|-------|------|

**Tab `Konten`:**

| id | judul | deskripsi | tanggalKegiatan | kategori | urlFoto | status | dibuatOleh |
|----|-------|-----------|-----------------|----------|---------|--------|------------|

**Tab `Galeri`:**

| id | judul | urlFoto | kategori | tanggalUnggah | diunggahOleh |
|----|-------|---------|----------|---------------|--------------|

**Tab `Pengaturan`:** (pasangan kunci-nilai, bukan satu baris per record)

| kunci | nilai |
|-------|-------|

- `status` surat → salah satu dari `Baru`, `Diproses`, `Selesai`, `Ditolak`
- `status` konten → `Tampil` atau `Tersembunyi`
- `role` → `Admin` atau `Super Admin`
- `username` di tab `Absensi` adalah foreign key ke tab `PerangkatDesa`

Tab & header ini dibuat otomatis oleh `setupSpreadsheet()` di `setup.gs`.
Tab `Pengaturan` sekalian diisi nilai awal, tapi hanya bila masih kosong —
menjalankan ulang `setupSpreadsheet()` tidak menimpa konfigurasi desa.

## Cara Setup & Deploy

1. Buat **Spreadsheet** baru di Google Sheets → catat ID-nya (bagian `/d/<ID>/edit` pada URL).
2. Buka [script.google.com](https://script.google.com) → **New project**.
3. Paste `setup.gs`, lalu jalankan fungsi **`setupSpreadsheet`** untuk membuat tab + header.
   - Jika project **ter-bind** ke Spreadsheet (via *Extensions > Apps Script* dari dalam Sheet), biarkan `SPREADSHEET_ID` kosong.
   - Jika project **standalone**, isi `SPREADSHEET_ID` di tiap file `.gs` dengan ID langkah 1.
4. Untuk **tiap** layanan (`bukuTamu.gs`, `pengajuanSurat.gs`, `presensi.gs`,
   `kependudukan.gs`, `pengguna.gs`, `konten.gs`, `galeri.gs`, `pengaturan.gs`):
   buat project Apps Script **baru & terpisah**, paste satu file saja, lalu
   **Deploy > New deployment > Web App**:
   - **Execute as**: Me (akun Google desa)
   - **Who has access**: Anyone
5. Salin URL Web App masing-masing ke `.env.local` di folder `web/`:
   ```
   APPS_SCRIPT_BUKU_TAMU_URL=https://script.google.com/macros/s/...
   APPS_SCRIPT_SURAT_URL=https://script.google.com/macros/s/...
   APPS_SCRIPT_PRESENSI_URL=https://script.google.com/macros/s/...
   APPS_SCRIPT_KEPENDUDUKAN_URL=https://script.google.com/macros/s/...
   APPS_SCRIPT_PENGGUNA_URL=https://script.google.com/macros/s/...
   APPS_SCRIPT_KONTEN_URL=https://script.google.com/macros/s/...
   APPS_SCRIPT_GALERI_URL=https://script.google.com/macros/s/...
   APPS_SCRIPT_PENGATURAN_URL=https://script.google.com/macros/s/...
   ```

> Selama `APPS_SCRIPT_*_URL` kosong, frontend otomatis memakai **data dummy** (lihat `web/src/repository/**/action.ts`), jadi dashboard tetap bisa dipreview tanpa deploy.

## Catatan

- Setiap kali kode `.gs` diubah, harus buat **New deployment** (bukan edit deployment lama)
- URL Web App berubah setiap deployment baru — update `.env.local` jika URL berubah
- Format request/response harus sesuai dengan `docs/api-contract.md`
