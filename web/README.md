# Sistem Informasi & Layanan Digital Desa Sumberagung

Proyek ini adalah sistem informasi desa berbasis web yang dibangun menggunakan **Next.js 16 (App Router)**. Proyek ini memisahkan dua sisi pengguna utama:
1. **Public Pages (Warga/Umum):** Portal informasi desa (sejarah, profil, struktur organisasi) dan layanan mandiri (buku tamu, pengajuan surat online).
2. **Admin Panel (Perangkat Desa):** Dashboard untuk mengelola kependudukan, pengajuan surat, presensi, konten web, galeri, dan pengaturan sistem.

## Tech Stack
- **Framework:** Next.js 16 (App Router), React 19
- **Styling:** Tailwind CSS v4
- **Komponen UI:** shadcn/ui (Radix)
- **Data & Backend:** Repository Pattern (fetch ke Google Apps Script)

---

## Arsitektur Folder (Raja Brawijaya FE Pattern)

Aplikasi ini menggunakan pola **Feature-Driven Architecture** dikombinasikan dengan **Repository Pattern** untuk memisahkan UI, *business logic*, dan *data fetching*.

Berikut adalah struktur utama folder di dalam `src/`:

```text
src/
├── app/                  # (1) Routing Layer (Hanya berisi file page.tsx / layout.tsx)
│   ├── (admin)/          # Rute untuk panel admin (contoh: /dashboard, /login)
│   └── (public)/         # Rute untuk publik (contoh: /, /sejarah-desa, /pengajuan-surat)
│
├── feature/              # (2) Feature Layer (UI Component & Container Logic)
│   ├── admin/            # Modul fitur khusus Admin Panel
│   │   ├── dashboard/    
│   │   ├── pengajuan-surat/
│   │   └── ...
│   └── public/           # Modul fitur khusus halaman publik/warga
│       ├── beranda/      
│       ├── sejarah-desa/
│       └── ...
│
├── repository/           # (3) Data Layer (API calls, Action, DTO, Mocks)
│   ├── buku-tamu/        # Aksi untuk mengambil/menyimpan data buku tamu
│   ├── pengajuan-surat/  # Aksi untuk mengambil/menyimpan data surat
│   └── ...
│
├── shared/               # (4) Komponen Global yang bisa dipakai di mana saja
│   └── components/       
│       ├── ui/           # (Komponen shadcn: Button, Input, Badge, dsb)
│       ├── Navbar/
│       ├── Sidebar/
│       └── Footer/
│
└── layout/               # (5) Layout Wrappers (AdminLayout, PublicLayout)
```

### Konsep Dasar
1. **`app/` (Routing Layer):** Folder ini **hanya** bertugas mendefinisikan URL/Rute. File `page.tsx` di sini idealnya bertindak sebagai "wrapper tipis" yang hanya memanggil container dari folder `feature/`. **Jangan taruh styling atau logic fetch di sini.**
2. **`feature/` (Business Logic & UI):** Setiap fitur memiliki foldernya sendiri, dibagi menjadi `admin/` dan `public/`.
   - `container/`: Komponen pintar (Server/Client) yang memanggil data dari `repository/` dan mengatur state.
   - `component/`: Komponen presentasional khusus untuk fitur tersebut (misal: `PengajuanSuratTable.tsx`).
3. **`repository/` (Data Layer):** Semua fungsi untuk mengambil data (fetch API, Server Actions) dan tipe data (`dto.ts`) diletakkan di sini. Container memanggil fungsi dari repository, bukan melakukan fetch secara langsung.

---

## Panduan: Cara Membuat Halaman / Fitur Baru

Jika Anda ingin membuat halaman baru (misal: "Statistik Penduduk" di bagian Admin), ikuti langkah ini:

### 1. Buat Feature Module
Buat folder fitur baru di `src/feature/admin/statistik/`.
- Buat file `container/StatistikContainer.tsx` yang berisi komponen utama.
- Buat file `component/...` jika ada komponen UI khusus statistik (grafik, tabel, dll).

### 2. Buat Repository Layer (Jika Butuh Data)
Jika fitur butuh fetch data, buat `src/repository/statistik/`.
- `dto.ts`: Berisi TypeScript interface/type untuk data statistik.
- `action.ts`: Berisi fungsi `getStatistik()` (fetch data dari Apps Script atau DB).

### 3. Buat Route di App Router
Buat file rute baru di `src/app/(admin)/dashboard/statistik/page.tsx`.
Isi file ini cukup memanggil container yang dibuat di langkah 1:

```tsx
import StatistikContainer from '@/feature/admin/statistik/container/StatistikContainer';

export default function StatistikPage() {
  return <StatistikContainer />;
}
```

### 4. Daftarkan di Navigasi
Update `src/shared/components/Sidebar/Sidebar.tsx` untuk menambahkan menu "Statistik Penduduk" ke daftar menu.

---

## Menjalankan Aplikasi Lokal

Install dependensi:
```bash
npm install
```

Jalankan mode development:
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.
