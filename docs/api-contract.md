# API Contract — Desa Sumberagung

Dokumen ini mendefinisikan kontrak JSON antara frontend (Next.js) dan backend (Google Apps Script Web App).
Semua endpoint diakses **server-side only** dari Next.js (tidak pernah dari browser langsung).

## Model koneksi (penting)

Backend digabung jadi **satu Web App** (`apps-script/Code.gs`) dengan **satu env
var** `APPS_SCRIPT_URL`. Endpoint dibedakan oleh **`resource`**:

- **GET** `APPS_SCRIPT_URL?resource=<key>` → `{ data: ... }`
- **POST** body `{ "resource":"<key>", "aksi":"...", ... }` → `{ success, ... }`

`<key>`: `bukuTamu`, `surat`, `absensi`, `kependudukan`, `pengguna`, `konten`,
`misi`, `sejarah`, `struktur`, `distribusiUsia`, `pendidikan`,
`profilVisi`, `geografi`, `pengaturan`, `upload`.

Semua pemanggilan lewat helper `web/src/lib/apps-script.ts`
(`ambilResource` / `kirimResource`). Bagian di bawah menyebut nama env lama
(`APPS_SCRIPT_*_URL`) hanya sebagai penanda resource; secara teknis semuanya
memakai `APPS_SCRIPT_URL` + `resource`.

---

## GET Buku Tamu

**URL:** `APPS_SCRIPT_BUKU_TAMU_URL` (dari env)

**Response:**
```json
{
  "data": [
    {
      "id": "string",
      "nama": "string",
      "instansi": "string",
      "keperluan": "string",
      "noWhatsapp": "string",
      "tanggal": "YYYY-MM-DD",
      "jam": "HH:mm"
    }
  ]
}
```

---

## POST Buku Tamu (Tamu Baru)

**URL:** `APPS_SCRIPT_BUKU_TAMU_URL` (sama dengan GET, dibedakan oleh method)

**Request:**
```json
{
  "nama": "string",
  "instansi": "string",
  "keperluan": "string",
  "noWhatsapp": "string",
  "tanggal": "YYYY-MM-DD",
  "jam": "HH:mm"
}
```

**Response:**
```json
{ "success": true, "id": "string" }
```

---

## GET Pengajuan Surat

**URL:** `APPS_SCRIPT_SURAT_URL` (dari env)

**Response:**
```json
{
  "data": [
    {
      "id": "string",
      "nama": "string",
      "nik": "string",
      "jenisSurat": "string",
      "keperluan": "string",
      "status": "Baru" | "Diproses" | "Selesai" | "Ditolak",
      "tanggalPengajuan": "YYYY-MM-DD",
      "tanggalUpdate": "YYYY-MM-DD"
    }
  ]
}
```

---

## POST Update Status Surat

**URL:** `APPS_SCRIPT_SURAT_URL` (sama dengan GET, dibedakan oleh method)

**Request:**
```json
{ "id": "string", "status": "string" }
```

**Response:**
```json
{ "success": true }
```

---

## GET Absensi

**URL:** `APPS_SCRIPT_PRESENSI_URL` (dari env) · Sheet `Absensi` (SRS 3.1 Sheet 3)

**Response:**
```json
{
  "data": [
    {
      "id": "string",
      "username": "string",
      "tanggal": "YYYY-MM-DD",
      "jamMasuk": "HH:mm",
      "keterangan": "string",
      "urlFoto": "string",
      "latitude": "string",
      "longitude": "string"
    }
  ]
}
```

`username` adalah foreign key ke sheet `PerangkatDesa`. Nama lengkap & jabatan
digabungkan di sisi Next.js (`getRekapAbsensi`), bukan disimpan ulang di sini.
`urlFoto` = tautan Drive foto bukti; `latitude`/`longitude` = lokasi saat absen.

---

## POST Absensi (Absen Sekarang)

**URL:** `APPS_SCRIPT_PRESENSI_URL` (sama dengan GET, dibedakan oleh method)

**Request:**
```json
{
  "username": "string",
  "tanggal": "YYYY-MM-DD",
  "jamMasuk": "HH:mm",
  "keterangan": "string",
  "urlFoto": "string",
  "latitude": "string",
  "longitude": "string"
}
```

**Response:**
```json
{ "success": true, "id": "string" }
```

Menolak absensi kedua pada tanggal yang sama untuk username yang sama
(SK-NF-11) dengan `{ "success": false, "error": "Absensi hari ini sudah tercatat." }`.

Alur bukti: browser mengompres foto → Server Action mengunggahnya lewat
**POST Upload Gambar** (di bawah) → URL Drive yang didapat dikirim di `urlFoto`.

---

## POST Upload Gambar

**URL:** `APPS_SCRIPT_UPLOAD_URL` (dari env) · menyimpan file ke folder Drive

Menyimpan **file** gambar ke Drive; Sheet tetap jadi database (menyimpan URL-nya).

**Request:**
```json
{ "namaFile": "string", "mimeType": "image/jpeg", "dataBase64": "string", "publik": false }
```

`dataBase64` = isi file terkompres, tanpa prefix `data:...;base64,`.
`publik` (opsional): `true` = file bisa dilihat via link (galeri/konten yang
tampil di halaman publik); `false`/kosong = privat (bukti absensi). Dipakai
lintas modul CMS lewat `unggahFotoAction` + komponen `ImageUploadField`.

**Response:**
```json
{ "success": true, "fileId": "string", "url": "string" }
```

---

## POST Pengajuan Surat (Warga)

**URL:** `APPS_SCRIPT_SURAT_URL` (sama dengan GET/update-status, dibedakan `aksi`)

**Request:**
```json
{ "aksi": "buat", "nama": "string", "nik": "string", "alamat": "string", "noWa": "string", "jenisSurat": "string", "keperluan": "string" }
```

Menyimpan baris berstatus `"Baru"` dan **mengirim email notifikasi** ke email
desa via `MailApp` (menggantikan notifikasi WhatsApp — gratis, tanpa server
SMTP). Kegagalan email tidak membatalkan penyimpanan data.

**Response:**
```json
{ "success": true, "id": "string" }
```

> Field GET/response Pengajuan Surat kini menyertakan `alamat` & `noWa`
> (SRS Sheet 1). Urutan kolom: id, nama, nik, alamat, noWa, jenisSurat,
> keperluan, status, tanggalPengajuan, tanggalUpdate.

---

## GET Kependudukan

**URL:** `APPS_SCRIPT_KEPENDUDUKAN_URL` (dari env) · Sheet `Kependudukan` (SRS 3.1 Sheet 6)

Satu baris = statistik satu tahun. Semua field dikirim sebagai **number**.

**Response:**
```json
{
  "data": [
    {
      "tahun": 2026,
      "totalPenduduk": 4364,
      "lakiLaki": 2154,
      "perempuan": 2210,
      "jumlahKK": 1300,
      "jumlahRt": 28,
      "jumlahRw": 7
    }
  ]
}
```

---

## POST Kependudukan

**URL:** `APPS_SCRIPT_KEPENDUDUKAN_URL` (sama dengan GET, dibedakan oleh method)

**Request:** objek `KependudukanTahun` lengkap. Bersifat **upsert** —
baris dengan `tahun` yang sama akan ditimpa.

**Response:**
```json
{ "success": true }
```

---

## GET Pengguna (Perangkat Desa)

**URL:** `APPS_SCRIPT_PENGGUNA_URL` (dari env) · Sheet `PerangkatDesa` (SRS 3.1 Sheet 2)

> **Deviasi dari SRS:** kolom `Password` TIDAK dipakai. Login memakai Google
> OAuth (NextAuth) dan akun dicocokkan lewat kolom `email`, sehingga tidak ada
> password mentah yang tersimpan di Spreadsheet.

**Response:**
```json
{
  "data": [
    {
      "username": "string",
      "namaLengkap": "string",
      "jabatan": "string",
      "noWa": "string",
      "email": "string",
      "role": "Admin" | "Super Admin"
    }
  ]
}
```

---

## POST Pengguna

**URL:** `APPS_SCRIPT_PENGGUNA_URL` (sama dengan GET, dibedakan oleh method)

**Request:**
```json
{ "aksi": "simpan", "username": "string", "namaLengkap": "string", "jabatan": "string", "noWa": "string", "email": "string", "role": "Admin" }
```
```json
{ "aksi": "hapus", "username": "string" }
```

`simpan` bersifat upsert berdasarkan `username`. Kedua aksi hanya boleh
dipanggil Super Admin — dijaga `requireSuperAdmin()` di sisi Next.js.

**Response:**
```json
{ "success": true }
```

---

## GET Konten

**URL:** `APPS_SCRIPT_KONTEN_URL` (dari env) · Sheet `Konten` (SRS 3.1 Sheet 5)

Mengirim **semua** konten termasuk yang `Tersembunyi`. Penyaringan untuk
halaman publik dilakukan di server Next.js (`getKontenPublik`), supaya draf
tidak pernah terkirim ke browser.

**Response:**
```json
{
  "data": [
    {
      "id": "string",
      "judul": "string",
      "deskripsi": "string",
      "tanggalKegiatan": "YYYY-MM-DD",
      "kategori": "string",
      "urlFoto": "string",
      "status": "Tampil" | "Tersembunyi",
      "dibuatOleh": "string"
    }
  ]
}
```

---

## POST Konten

**URL:** `APPS_SCRIPT_KONTEN_URL` (sama dengan GET, dibedakan oleh method)

**Request:**
```json
{ "aksi": "simpan", "id": "", "judul": "string", "deskripsi": "string", "tanggalKegiatan": "YYYY-MM-DD", "kategori": "string", "urlFoto": "string", "status": "Tampil", "dibuatOleh": "string" }
```
```json
{ "aksi": "hapus", "id": "string" }
```
```json
{ "aksi": "status", "id": "string", "status": "Tersembunyi" }
```

Pada `simpan`, `id` kosong = konten baru (server membuat id `kt-<timestamp>`);
`id` terisi = update baris yang ada. `dibuatOleh` diisi server dari sesi login,
bukan dari form.

**Response:**
```json
{ "success": true, "id": "string" }
```

---

## GET Pengaturan

**URL:** `APPS_SCRIPT_PENGATURAN_URL` (dari env) · Sheet `Pengaturan`

Berbentuk pasangan kunci-nilai (2 kolom), bukan satu baris per record — supaya
menambah pengaturan baru cukup menambah baris, tanpa mengubah kolom.

**Response:**
```json
{
  "data": {
    "namaDesa": "Sumberagung",
    "kecamatan": "Panggungrejo",
    "kabupaten": "Blitar",
    "provinsi": "Jawa Timur",
    "alamatKantor": "string",
    "emailResmi": "string",
    "noWaResmi": "string",
    "jamLayananMulai": "08:00",
    "jamLayananSelesai": "13:00"
  }
}
```

Nilai dari sheet ditimpa di atas `PENGATURAN_DEFAULT`, jadi kunci yang belum
pernah diisi tetap punya nilai wajar.

---

## POST Pengaturan

**URL:** `APPS_SCRIPT_PENGATURAN_URL` (sama dengan GET, dibedakan oleh method)

**Request:** objek kunci-nilai. Setiap kunci yang dikirim di-upsert; kunci lain
di sheet dibiarkan apa adanya. Khusus Super Admin (`requireSuperAdmin()`).

**Response:**
```json
{ "success": true }
```

---

## Endpoint CMS Halaman Publik

Modul-modul ini mengelola isi halaman publik (docs/cms-gap-analysis.md). Dua
bentuk sheet:

- **Kunci-nilai** (2 kolom `kunci`, `nilai`) — satu record.
  GET → `{ data: { <kunci>: <nilai> } }`; POST objek kunci-nilai (upsert per kunci) → `{ success }`.
- **Daftar berurut** (kolom `id … urutan`) — banyak record.
  GET → `{ data: Item[] }`; POST `{ aksi: "simpan", id, … }` (upsert; id kosong = baru) atau `{ aksi: "hapus", id }` → `{ success, id? }`.

| `resource` | Sheet | Bentuk | Kolom / kunci utama |
|---|---|---|---|
| `profilVisi` | `ProfilVisi` | kunci-nilai | halamanJudul, halamanSubteks, visiKutipan |
| `misi` | `Misi` | daftar | id, teks, urutan |
| `geografi` | `Geografi` | kunci-nilai | koordinat, ketinggian, batas*, luas* |
| `sejarah` | `Sejarah` | daftar | id, era, subjudul, narasi, urlFoto, sisi, urutan |
| `struktur` | `Struktur` | daftar | id, namaJabatan, namaPejabat, urlFoto, level, urutan |
| `distribusiUsia` | `DistribusiUsia` | daftar | id, rentang, wilayah, lakiLaki, perempuan, urutan |
| `pendidikan` | `Pendidikan` | daftar | id, jenjang, persentase, urutan |

Reorder (tombol ↑↓) tidak punya aksi khusus: server menukar nilai `urutan` dua
item lalu memanggil `aksi: "simpan"` untuk keduanya.

---

## Catatan

- Nilai `status` surat yang valid: `"Baru"`, `"Diproses"`, `"Selesai"`, `"Ditolak"`
- Nilai `status` konten yang valid: `"Tampil"`, `"Tersembunyi"`
- Nilai `role` yang valid: `"Admin"`, `"Super Admin"`
- Format tanggal selalu `YYYY-MM-DD` (ISO 8601)
- Format jam selalu `HH:mm` (24 jam)
- Field `nik` adalah Nomor Induk Kependudukan (16 digit)
- Setiap Server Action yang mengubah data memanggil `requireAdmin()` atau
  `requireSuperAdmin()` lebih dulu — Server Action bisa dipanggil lewat POST
  langsung, bukan hanya dari UI.

---

## Deviasi dari SRS (perlu dicatat di dokumen akhir)

| Hal | SRS | Implementasi | Alasan |
|---|---|---|---|
| Login admin | Username + Password divalidasi ke Sheet `PerangkatDesa` (SK-F-09) | Google OAuth (NextAuth) + whitelist email, kolom `role` di sheet | Menghindari password mentah di Spreadsheet; RBAC (SK-F-17) tetap terpenuhi |
| Ekspor rekap absensi | "ekspor ke Excel" (SRS 4.1 B) | Ekspor `.csv` (UTF-8 + BOM, langsung terbaca Excel) | Tanpa dependensi library penulis `.xlsx` |
| Galeri & Pengaturan | Tidak punya sheet sendiri di SRS 3.1 | Sheet `Galeri` & `Pengaturan` baru | Dibutuhkan SK-F-15 dan SK-F-07 |

---

## Layanan yang Belum Dikerjakan

- ~~Notifikasi WhatsApp otomatis~~ → **diganti email** via `MailApp` (permintaan desa). Sudah dibangun di `pengajuanSurat.gs`.
- ~~Field `alamat` & `noWa` pada Pengajuan Surat~~ → **sudah ditambahkan** (SRS Sheet 1). Status tetap `"Baru"` (bukan `"Pending"` SRS) — deviasi disengaja, sudah dipakai di seluruh kode.
- **Halaman publik pengajuan surat** (form warga): backend `buat` + email sudah siap, tapi UI form publiknya belum dibuat (tahap halaman publik).
