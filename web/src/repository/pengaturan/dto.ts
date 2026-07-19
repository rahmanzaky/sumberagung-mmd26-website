// Konfigurasi situs. Bukan bagian dari 6 sheet SRS 3.1 — skema ini turunan
// dari SK-F-07 (jam layanan) dan hak akses Super Admin di SRS 2.2.
//
// Disimpan sebagai pasangan kunci-nilai supaya menambah pengaturan baru tidak
// perlu mengubah kolom Spreadsheet.
export type Pengaturan = {
  namaDesa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  alamatKantor: string;
  emailResmi: string;
  noWaResmi: string;
  jamLayananMulai: string; // HH:mm
  jamLayananSelesai: string; // HH:mm

  // Identitas situs (navbar & footer)
  namaSitus: string; // wordmark di navbar & footer
  urlLogo: string;

  // Label menu navbar (SRS: Super Admin kelola struktur navigasi)
  navHome: string;
  navProfil: string;
  navSejarah: string;
  navStruktur: string;
  navBukuTamu: string;

  // Footer — tautan cepat (label; hrefnya tetap di kode)
  footerTautan1: string;
  footerTautan2: string;
  footerTautan3: string;
  footerTautan4: string;
};

export const PENGATURAN_DEFAULT: Pengaturan = {
  namaDesa: 'Sumberagung',
  kecamatan: 'Panggungrejo',
  kabupaten: 'Blitar',
  provinsi: 'Jawa Timur',
  alamatKantor: 'Jl. Raya Sumberagung, Kec. Panggungrejo, Kab. Blitar',
  emailResmi: 'desasumberagung@gmail.com',
  noWaResmi: '0812-0000-0000',
  // SK-F-07 — jam layanan pengajuan surat 08.00–13.00 WIB.
  jamLayananMulai: '08:00',
  jamLayananSelesai: '13:00',

  namaSitus: 'Sumberagung',
  urlLogo: '',

  navHome: 'Home',
  navProfil: 'Profil Desa',
  navSejarah: 'Sejarah Desa',
  navStruktur: 'Struktur Desa',
  navBukuTamu: 'Buku Tamu',

  footerTautan1: 'Kontak',
  footerTautan2: 'Peta Desa',
  footerTautan3: 'Transparansi',
  footerTautan4: 'Bantuan',
};

export const LABEL_PENGATURAN: Record<keyof Pengaturan, string> = {
  namaDesa: 'Nama Desa',
  kecamatan: 'Kecamatan',
  kabupaten: 'Kabupaten',
  provinsi: 'Provinsi',
  alamatKantor: 'Alamat Kantor Desa',
  emailResmi: 'Email Resmi Desa',
  noWaResmi: 'Nomor WhatsApp Resmi',
  jamLayananMulai: 'Jam Layanan Mulai',
  jamLayananSelesai: 'Jam Layanan Selesai',
  namaSitus: 'Nama Situs (Wordmark)',
  urlLogo: 'URL Logo',
  navHome: 'Menu — Home',
  navProfil: 'Menu — Profil Desa',
  navSejarah: 'Menu — Sejarah Desa',
  navStruktur: 'Menu — Struktur Desa',
  navBukuTamu: 'Menu — Buku Tamu',
  footerTautan1: 'Footer — Tautan 1',
  footerTautan2: 'Footer — Tautan 2',
  footerTautan3: 'Footer — Tautan 3',
  footerTautan4: 'Footer — Tautan 4',
};

/** Apakah saat ini masih dalam jam layanan? Dipakai halaman pengajuan surat. */
export function dalamJamLayanan(p: Pengaturan, sekarang = new Date()): boolean {
  const jam = sekarang.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return jam >= p.jamLayananMulai && jam <= p.jamLayananSelesai;
}
