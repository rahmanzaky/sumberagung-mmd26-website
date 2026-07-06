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

## Bagian Website

### 1. Company Profile (Publik)
Halaman yang bisa diakses siapa saja:
- **Beranda** — Sambutan, highlight desa
- **Profil Desa** — Sejarah, visi-misi, struktur pemerintahan
- **Potensi Desa** — UMKM dan wisata lokal
- **Berita & Kegiatan** — Informasi terkini dari desa
- **Kontak** — Alamat dan informasi kontak

### 2. Admin Dashboard (Privat)
Hanya bisa diakses perangkat desa dengan akun Google yang terdaftar:
- **Buku Tamu Digital** — Pantau data kunjungan warga
- **Pengajuan Surat** — Kelola status pengajuan surat warga

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
