# Panduan Menghubungkan Website ke Google Apps Script

Panduan langkah-demi-langkah menyambungkan Website Desa Sumberagung ke backend
Google Sheets + Apps Script, memakai **akun Google resmi desa** (email + Drive).

> **Kabar baik:** Anda **tidak harus** menyambungkan semuanya sekaligus. Setiap
> endpoint yang URL-nya masih kosong otomatis memakai **data contoh**, jadi
> website tetap jalan. Sambungkan bertahap, mulai dari yang paling penting.

---

## 0. Prasyarat

- Login ke browser memakai **akun Google desa** (yang email & Drive-nya sudah ada).
- Folder proyek website ini ada di komputer Anda.
- Sudah bisa menjalankan `npm run dev` di folder `web/`.

---

## 1. Buat Spreadsheet database & semua tab

1. Buka <https://sheets.google.com> (pastikan akun desa) → **Blank spreadsheet**.
2. Beri nama, mis. **"Database Desa Sumberagung"**.
3. Salin **ID Spreadsheet** dari URL. Contoh URL:
   `https://docs.google.com/spreadsheets/d/`**`1AbCdEf...xyz`**`/edit` → ID = `1AbCdEf...xyz`.
   Simpan ID ini, dipakai berkali-kali nanti.
4. Di Spreadsheet itu: menu **Extensions → Apps Script**. Editor Apps Script terbuka
   (proyek ini "menempel" ke Spreadsheet).
5. Hapus kode contoh, lalu **tempel isi file `apps-script/setup.gs`** apa adanya.
6. Di atas editor, pilih fungsi **`setupSpreadsheet`** → klik **Run**.
   - Saat diminta izin: **Review permissions → pilih akun desa → Allow**.
7. Kembali ke Spreadsheet — semua tab sudah dibuat otomatis: `BukuTamu`,
   `PengajuanSurat`, `Absensi`, `Kependudukan`, `PerangkatDesa`, `Konten`,
   `Galeri`, `Pengaturan`, `Beranda`, `ProfilVisi`, `Geografi`, `Misi`,
   `Sejarah`, `Struktur`, `DistribusiUsia`, `Pendidikan`.
8. Proyek Apps Script bawaan ini boleh dibiarkan; kita **tidak** memakainya untuk
   endpoint (endpoint dibuat sebagai proyek terpisah di langkah 3).

---

## 2. Buat folder Drive untuk foto

1. Buka <https://drive.google.com> (akun desa) → **New → Folder**, beri nama
   mis. **"Foto Website Desa"**.
2. Buka folder itu, salin **ID Folder** dari URL:
   `https://drive.google.com/drive/folders/`**`1FoLdEr...`** → ID = `1FoLdEr...`.
   Dipakai untuk endpoint upload (langkah 4).

---

## 3. Deploy tiap endpoint sebagai Web App

Setiap file `.gs` di folder `apps-script/` menjadi **satu Web App terpisah**
(masing-masing punya URL sendiri). Ulangi langkah berikut untuk tiap file di
tabel bagian 5.

Untuk **satu** file (contoh: `pengguna.gs`):

1. Buka <https://script.google.com> → **New project**.
2. Beri nama proyek sesuai file, mis. **"Endpoint Pengguna"** (agar tidak
   tertukar).
3. Hapus kode contoh → **tempel seluruh isi `pengguna.gs`**.
4. Di baris `const SPREADSHEET_ID = '';`, **isi dengan ID Spreadsheet** langkah 1:
   `const SPREADSHEET_ID = '1AbCdEf...xyz';`
   *(Wajib, karena proyek ini berdiri sendiri — tidak menempel ke Spreadsheet.)*
5. Klik **Deploy → New deployment**.
6. Klik ikon gerigi → pilih **Web app**.
7. Isi:
   - **Description**: bebas (mis. "v1").
   - **Execute as**: **Me** (akun desa).
   - **Who has access**: **Anyone**.
     *(Ini bukan berarti data publik — hanya berarti URL bisa dipanggil server
     website. Keamanan data tetap dijaga di sisi website via login.)*
8. **Deploy** → beri izin bila diminta (Allow).
9. **Salin Web app URL** (bentuknya `https://script.google.com/macros/s/.../exec`).
10. Tempel URL itu ke `web/.env.local` pada variabel yang sesuai (lihat tabel §5).

Ulangi untuk file berikutnya. **Boklah berhenti kapan saja** — endpoint yang
belum dideploy tetap memakai data contoh.

> **Tips prioritas.** Kalau ingin cepat berfungsi, deploy urutan ini dulu:
> `pengguna` (agar peran Admin/Super Admin benar) → `presensi` → `pengajuanSurat`
> → `bukuTamu` → `upload`. Sisanya (CMS halaman publik) bisa menyusul.

---

## 4. Konfigurasi khusus 2 endpoint

### a. `upload.gs` (foto bukti absensi, galeri, dll)

Sebelum deploy (atau edit lalu **New deployment** lagi), isi:

```js
const FOLDER_ID = '1FoLdEr...'; // ID folder Drive dari langkah 2
```

`const PUBLIK = false;` **biarkan** — website mengirim sendiri penanda apakah
foto publik (galeri/konten) atau privat (bukti absensi) per unggahan.

### b. `pengajuanSurat.gs` (notifikasi email surat baru)

Isi email tujuan notifikasi (default sudah diisi, ganti bila perlu):

```js
const EMAIL_DESA = 'emaildesa@gmail.com'; // email resmi desa
```

Saat ada pengajuan surat baru, sistem mengirim email ke alamat ini memakai
`MailApp` — **gratis, tanpa server SMTP**. Kuota gratis ± 100 email/hari.

---

## 5. Peta file → variabel `.env.local`

Isi `web/.env.local` (buat dari `web/.env.example` bila belum ada). Tempel URL
Web App masing-masing:

| File `.gs` | Variabel `.env.local` | Tab Spreadsheet |
|---|---|---|
| `pengguna.gs` | `APPS_SCRIPT_PENGGUNA_URL` | PerangkatDesa |
| `presensi.gs` | `APPS_SCRIPT_PRESENSI_URL` | Absensi |
| `pengajuanSurat.gs` | `APPS_SCRIPT_SURAT_URL` | PengajuanSurat |
| `bukuTamu.gs` | `APPS_SCRIPT_BUKU_TAMU_URL` | BukuTamu |
| `upload.gs` | `APPS_SCRIPT_UPLOAD_URL` | *(Drive, bukan tab)* |
| `kependudukan.gs` | `APPS_SCRIPT_KEPENDUDUKAN_URL` | Kependudukan |
| `distribusiUsia.gs` | `APPS_SCRIPT_DISTRIBUSI_USIA_URL` | DistribusiUsia |
| `pendidikan.gs` | `APPS_SCRIPT_PENDIDIKAN_URL` | Pendidikan |
| `konten.gs` | `APPS_SCRIPT_KONTEN_URL` | Konten |
| `galeri.gs` | `APPS_SCRIPT_GALERI_URL` | Galeri |
| `pengaturan.gs` | `APPS_SCRIPT_PENGATURAN_URL` | Pengaturan |
| `beranda.gs` | `APPS_SCRIPT_BERANDA_URL` | Beranda |
| `profilVisi.gs` | `APPS_SCRIPT_PROFIL_VISI_URL` | ProfilVisi |
| `misi.gs` | `APPS_SCRIPT_MISI_URL` | Misi |
| `geografi.gs` | `APPS_SCRIPT_GEOGRAFI_URL` | Geografi |
| `sejarah.gs` | `APPS_SCRIPT_SEJARAH_URL` | Sejarah |
| `struktur.gs` | `APPS_SCRIPT_STRUKTUR_URL` | Struktur |

Perhatikan: `pengajuanSurat.gs` memakai `APPS_SCRIPT_SURAT_URL` (bukan
`..._PENGAJUAN_SURAT_URL`), dan `pengguna.gs` menulis ke tab **PerangkatDesa**.

Setelah mengubah `.env.local`, **hentikan lalu jalankan ulang** `npm run dev`.

---

## 6. Isi baris awal tab `PerangkatDesa` (penting untuk login)

Agar login mengenali siapa Admin vs Super Admin, isi minimal satu baris di tab
**PerangkatDesa** (kolom: `username, namaLengkap, jabatan, noWa, email, role`):

| username | namaLengkap | jabatan | noWa | email | role |
|---|---|---|---|---|---|
| sutrisno | Sutrisno, S.Sos | Kepala Desa | 0812... | **email-google-anda@gmail.com** | Super Admin |

Kolom **email** harus sama persis dengan email Google yang dipakai login. Itulah
yang mencocokkan akun login dengan peran & datanya.

---

## 7. Login Google (agar bisa masuk dashboard)

Endpoint Apps Script mengurus **data**; **login** memakai Google OAuth terpisah.
Tanpa ini, `/login` tidak bisa masuk. Ringkasnya, di `web/.env.local`:

```
GOOGLE_CLIENT_ID=...        # dari Google Cloud Console (OAuth Client)
GOOGLE_CLIENT_SECRET=...
AUTH_SECRET=...             # buat dengan: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
```

`GOOGLE_CLIENT_ID`/`SECRET` dibuat di <https://console.cloud.google.com> →
*APIs & Services → Credentials → Create OAuth client ID → Web application*,
dengan **Authorized redirect URI**:
`http://localhost:3000/api/auth/callback/google` (untuk lokal). Panduan OAuth ini
di luar cakupan dokumen ini — beri tahu bila perlu langkah rincinya.

Selain itu, isi daftar email yang boleh masuk di
`web/src/config/allowed-emails.ts` sebelum produksi (bila dibiarkan kosong, saat
development semua email diizinkan).

---

## 8. Uji coba

1. `npm run dev`, buka `http://localhost:3000/login`, masuk dengan email desa.
2. Buka **Absensi Staf** → coba absen (foto + lokasi). Cek tab `Absensi` di
   Spreadsheet bertambah, dan foto muncul di folder Drive.
3. Buka **Galeri** → unggah foto → cek muncul di folder Drive & tab `Galeri`.
4. (Bila `pengajuanSurat` sudah live) buat pengajuan surat → cek email desa dapat
   notifikasi.

---

## Catatan penting

- **Update kode `.gs`** → harus **Deploy → New deployment** lagi (bukan edit yang
  lama). URL bisa berubah; perbarui `.env.local` bila berubah.
- **URL kosong = data contoh.** Aman untuk demo; ganti dengan URL asli saat siap.
- **Sebelum produksi:** hapus flag `DEV_SKIP_AUTH` di `web/src/proxy.ts` dan
  `web/src/lib/guard.ts`, serta isi whitelist email. (Ada komentar penanda di
  kode.)
- **Kuota Drive** 15 GB dipakai bersama Gmail+Drive+Foto; foto sudah dikompres
  otomatis (~150–300 KB) sehingga hemat.

---

## Terlalu banyak deployment? (17 endpoint)

Desain saat ini = 1 Web App per endpoint (17 kali deploy). Bila terasa berat,
backend bisa **digabung menjadi 1–2 Web App** yang merutekan semua tab lewat satu
URL (`?sheet=NAMA`). Itu perubahan kode di sisi website & Apps Script, tapi
memangkas deploy dari 17 menjadi 1. Beri tahu bila ingin digabung.
