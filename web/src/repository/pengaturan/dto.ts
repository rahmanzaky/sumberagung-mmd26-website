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
