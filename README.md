# Website Desa Sumberagung

Website resmi Desa Sumberagung, Kecamatan Panggungrejo, Kabupaten Blitar.

## Struktur Repo

```
sumberagung-mmd26-website/
├── web/           → Project Next.js (company profile + admin dashboard)
├── apps-script/   → Source backup Google Apps Script (REST API backend)
└── docs/          → Dokumentasi teknis
```

## Dokumentasi

- [API Contract](docs/api-contract.md) — Format JSON antara frontend dan Apps Script

## Spesifikasi Sistem (Bagian Website)

### 1. Halaman Publik (Warga/Umum)
Halaman informasi dan layanan digital yang bisa diakses siapa saja:
- **Beranda** — Identitas desa, demografi ringkas, aktivitas terbaru, dan video profil.
- **Sejarah Desa** — Timeline interaktif berisi foto & narasi sejarah desa.
- **Profil Desa** — Visi, misi, data geografis, dan demografis.
- **Struktur Organisasi** — Bagan organisasi pemerintahan desa beserta foto perangkat.
- **Buku Tamu** — Form digital untuk mencatat kunjungan.
- **Pengajuan Surat Online** — Form pengajuan persuratan. Diproses saat jam kerja (08.00–13.00 WIB) dengan *follow-up* via WhatsApp.

### 2. Admin Panel (Perangkat Desa)
Hanya bisa diakses perangkat desa dengan akun terdaftar:
- **Dashboard** — Ringkasan statistik desa.
- **Manajemen Surat** — Verifikasi dan update status pengajuan surat warga.
- **Manajemen Kependudukan** — Kelola data warga/penduduk desa.
- **Manajemen Konten** — Kelola teks profil, sejarah, dll.
- **Manajemen Presensi** — *Check-in* kehadiran harian staf/perangkat desa.
- **Buku Tamu (Admin)** — Pantau rekap data kunjungan warga.
- **Manajemen Pengguna** — Kelola akun staf/admin.
- **Manajemen Galeri** — Kelola album foto kegiatan desa.
- **Pengaturan (Super Admin)** — Konfigurasi sistem, navigasi, dan *backups*.

## Setup Pengembangan

### Prasyarat
- Node.js 18+
- Akun Google (untuk OAuth)
- Google Apps Script yang sudah di-deploy (lihat `apps-script/README.md`)

### Langkah Setup

1. Clone repo dan masuk ke folder `web/`:
   ```bash
   cd web
   npm install
   ```

2. Buat file `.env.local` (jangan di-commit):
   ```bash
   cp .env.example .env.local
   ```

3. Isi `.env.local`:
   ```env
   GOOGLE_CLIENT_ID=        # dari Google Cloud Console
   GOOGLE_CLIENT_SECRET=    # dari Google Cloud Console
   NEXTAUTH_SECRET=         # generate dengan: openssl rand -base64 32
   NEXTAUTH_URL=http://localhost:3000
   APPS_SCRIPT_BUKU_TAMU_URL=   # URL Web App Apps Script
   APPS_SCRIPT_SURAT_URL=       # URL Web App Apps Script
   ```

4. Jalankan dev server:
   ```bash
   npm run dev
   ```

### Generate NEXTAUTH_SECRET

Jalankan perintah ini di terminal, lalu salin hasilnya ke `.env.local`:

```bash
openssl rand -base64 32
```

> **Penting:** Simpan secret ini di `.env.local`, bukan di `.env.example`. File `.env.local` tidak akan ter-commit ke git.

## Deploy

Website di-deploy ke [Vercel](https://vercel.com). Setiap push ke branch `main` akan otomatis trigger deployment.

Tambahkan semua variabel dari `.env.example` ke Vercel Environment Variables di dashboard Vercel.
