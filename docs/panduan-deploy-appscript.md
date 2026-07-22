# Panduan Menghubungkan Website ke Google Apps Script

Panduan langkah-demi-langkah menyambungkan Website Desa Sumberagung ke backend
Google Sheets + Apps Script, memakai **akun Google resmi desa** (email + Drive).

> **Sekarang cukup SATU Web App.** Seluruh endpoint digabung ke satu file
> `Code.gs`, jadi Anda hanya **deploy sekali** dan menyalin **satu URL**.
>
> **Boleh bertahap juga:** selama `APPS_SCRIPT_URL` kosong, website memakai
> **data contoh** dan tetap berjalan.

---

## 0. Prasyarat

- Login browser dengan **akun Google desa** (email & Drive-nya sudah ada).
- Folder proyek ada di komputer, bisa menjalankan `npm run dev` di folder `web/`.

---

## 1. Buat Spreadsheet database & semua tab

1. Buka <https://sheets.google.com> (akun desa) → **Blank spreadsheet**.
2. Beri nama, mis. **"Database Desa Sumberagung"**.
3. Salin **ID Spreadsheet** dari URL:
   `https://docs.google.com/spreadsheets/d/`**`1AbC...xyz`**`/edit` → ID = `1AbC...xyz`.
4. Menu **Extensions → Apps Script**. Editor terbuka (menempel ke Spreadsheet).
5. Hapus kode contoh → **tempel isi `apps-script/setup.gs`**.
6. Pilih fungsi **`setupSpreadsheet`** → **Run** → saat diminta izin: **Allow**.
7. Semua 16 tab terbentuk otomatis (BukuTamu, PengajuanSurat, Absensi,
   Kependudukan, PerangkatDesa, Konten, Galeri, Pengaturan, Beranda, ProfilVisi,
   Geografi, Misi, Sejarah, Struktur, DistribusiUsia, Pendidikan).
8. Proyek Apps Script bawaan ini boleh ditutup — backend dibuat di langkah 3.

---

## 2. Buat folder Drive untuk foto

1. <https://drive.google.com> (akun desa) → **New → Folder**, mis.
   **"Foto Website Desa"**.
2. Buka folder, salin **ID Folder** dari URL:
   `.../folders/`**`1FoL...`** → ID = `1FoL...`.

---

## 3. Deploy backend (SATU kali)

1. Buka <https://script.google.com> → **New project**, beri nama
   **"Backend Desa Sumberagung"**.
2. Hapus kode contoh → **tempel seluruh isi `apps-script/Code.gs`**.
3. Isi 3 baris konfigurasi di atas file:
   ```js
   const SPREADSHEET_ID = '1AbC...xyz';   // ID dari langkah 1
   const FOLDER_ID = '1FoL...';           // ID folder dari langkah 2
   const EMAIL_DESA = 'emaildesa@gmail.com'; // tujuan notifikasi surat baru
   ```
4. **Deploy → New deployment** → ikon gerigi → **Web app**.
5. Isi:
   - **Execute as**: **Me** (akun desa).
   - **Who has access**: **Anyone**.
     *(Bukan berarti data publik — hanya agar server website bisa memanggil URL.
     Keamanan data dijaga oleh login di sisi website.)*
6. **Deploy** → **Allow** bila diminta izin.
7. **Salin Web app URL** (bentuk `https://script.google.com/macros/s/.../exec`).

---

## 4. Sambungkan ke website

Di `web/.env.local` (buat dari `web/.env.example` bila belum ada), isi:

```
APPS_SCRIPT_URL=https://script.google.com/macros/s/.../exec
```

Lalu **hentikan & jalankan ulang** `npm run dev`. Selesai — semua modul
(absensi, surat, CMS, upload foto) memakai satu URL ini.

> **Cara kerja:** website menambahkan `?resource=<nama>` untuk membaca dan
> mengirim field `resource` saat menyimpan. Anda tidak perlu tahu detailnya —
> cukup satu URL.

---

## 5. Isi baris awal tab `PerangkatDesa` (penting untuk login)

Agar login mengenali peran, isi minimal satu baris di tab **PerangkatDesa**
(kolom: `username, namaLengkap, jabatan, noWa, email, role`):

| username | namaLengkap | jabatan | noWa | email | role |
|---|---|---|---|---|---|
| sutrisno | Sutrisno, S.Sos | Kepala Desa | 0812... | **email-anda@gmail.com** | Super Admin |

Kolom **email** harus **sama persis** dengan email Google yang dipakai login —
itulah yang mencocokkan akun login dengan peran & datanya.

---

## 6. Login Google (agar bisa masuk dashboard)

Backend mengurus **data**; **login** memakai Google OAuth terpisah. Di
`web/.env.local`:

```
GOOGLE_CLIENT_ID=...        # dari Google Cloud Console (OAuth Client)
GOOGLE_CLIENT_SECRET=...
AUTH_SECRET=...             # buat dengan: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
```

`GOOGLE_CLIENT_ID`/`SECRET` dibuat di <https://console.cloud.google.com> →
*APIs & Services → Credentials → Create OAuth client ID → Web application*,
dengan **Authorized redirect URI**:
`http://localhost:3000/api/auth/callback/google` (untuk lokal).

Isi juga daftar email yang boleh masuk di `web/src/config/allowed-emails.ts`
sebelum produksi (bila kosong, saat development semua email diizinkan).

---

## 7. Uji coba

1. `npm run dev` → `http://localhost:3000/login` → masuk dengan email desa.
2. **Absensi Staf** → absen (foto + lokasi). Cek tab `Absensi` bertambah & foto
   muncul di folder Drive.
3. **Galeri** → unggah foto → cek muncul di Drive & tab `Galeri`.
4. Buat pengajuan surat → cek email desa menerima notifikasi.

---

## Catatan penting

- **Update `Code.gs`** → **Deploy → Manage deployments → Edit (pensil) → Version:
  New version → Deploy.** Dengan cara ini **URL tetap sama** (tidak perlu ubah
  `.env.local`). Membuat "New deployment" akan menghasilkan URL baru.
- **`APPS_SCRIPT_URL` kosong = data contoh.** Aman untuk demo.
- **Sebelum produksi:** hapus flag `DEV_SKIP_AUTH` di `web/src/proxy.ts` dan
  `web/src/lib/guard.ts`, serta isi whitelist email (ada penanda di kode).
- **Kuota Drive** 15 GB dipakai bersama Gmail+Drive+Foto; foto dikompres otomatis
  (~150–300 KB) sehingga hemat.
- **Kuota email** `MailApp` gratis ± 100 email/hari — cukup untuk notifikasi surat.
