/**
 * Tipe data Pengajuan Surat.
 *
 * Field mengikuti kesepakatan desain + SRS:
 * nama, nik, alamat, whatsapp, jenisSurat, maksud.
 *
 * CATATAN: docs/api-contract.md belum memuat endpoint POST untuk
 * MEMBUAT pengajuan (yang ada baru GET daftar dan POST ubah status).
 * Selain itu kontrak GET belum memuat `alamat` dan `whatsapp`,
 * sehingga perlu diselaraskan di sisi backend.
 */

export type PengajuanSuratPayload = {
    nama: string;
    /** 16 digit angka. */
    nik: string;
    alamat: string;
    /** Sudah dinormalkan ke format 62xxxxxxxxxx. */
    whatsapp: string;
    jenisSurat: string;
    /** Maksud dan tujuan pengajuan (SRS: Maksud_Tujuan). */
    maksud: string;
};

/** Status pengajuan sesuai docs/api-contract.md. */
export type StatusSurat = 'Baru' | 'Diproses' | 'Selesai' | 'Ditolak';

/** Bentuk entri yang dibaca dari endpoint GET Pengajuan Surat. */
export type PengajuanSuratEntry = PengajuanSuratPayload & {
    id: string;
    status: StatusSurat;
    /** Format ISO YYYY-MM-DD. */
    tanggalPengajuan: string;
    tanggalUpdate: string;
};

/** Status form yang dikembalikan Server Action ke komponen. */
export type PengajuanSuratFormState = {
    status: 'idle' | 'success' | 'error';
    message: string;
    errors: Partial<Record<keyof PengajuanSuratPayload, string>>;
};

export const initialFormState: PengajuanSuratFormState = {
    status: 'idle',
    message: '',
    errors: {},
};