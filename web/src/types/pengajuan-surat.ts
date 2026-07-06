export type StatusSurat = 'Baru' | 'Diproses' | 'Selesai' | 'Ditolak';

export type PengajuanSurat = {
  id: string;
  nama: string;
  nik: string;
  jenisSurat: string;
  keperluan: string;
  status: StatusSurat;
  tanggalPengajuan: string; // YYYY-MM-DD
  tanggalUpdate: string; // YYYY-MM-DD
};
