export type StatusSurat = 'Baru' | 'Diproses' | 'Selesai' | 'Ditolak';

export type PengajuanSurat = {
  id: string;
  nama: string;
  nik: string;
  alamat: string; // SRS Sheet 1
  noWa: string; // nomor WhatsApp warga (verifikasi & komunikasi lanjutan)
  jenisSurat: string;
  keperluan: string;
  status: StatusSurat;
  tanggalPengajuan: string; // YYYY-MM-DD
  tanggalUpdate: string; // YYYY-MM-DD
};

// Payload pengajuan dari warga (halaman publik). id/status/tanggal dibuat server.
export type PengajuanSuratInput = {
  nama: string;
  nik: string;
  alamat: string;
  noWa: string;
  jenisSurat: string;
  keperluan: string;
};
