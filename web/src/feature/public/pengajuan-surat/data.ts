export const pengajuanHeader = {
    judul: 'Pengajuan Surat',
    subjudul: 'Pemerintah Desa Sumberagung • Kabupaten Blitar',
};

/**
 * Daftar jenis surat.
 *
 * Sengaja dikosongkan; isinya akan dikelola perangkat desa lewat
 * panel admin. Selama larik ini kosong, dropdown tampil nonaktif
 * dan form belum bisa dikirim.
 *
 * Contoh pengisian:
 *   export const jenisSurat: string[] = [
 *     'Surat Keterangan Domisili',
 *     'Surat Keterangan Tidak Mampu',
 *   ];
 */
export const jenisSurat: string[] = [];

export const catatanArsip =
    'Data ini akan tercatat dalam arsip digital pemerintah desa.';

export const catatanJamLayanan =
    'Pengajuan hanya diproses pada jam kerja desa, pukul 08.00–13.00 WIB. Pengajuan di luar jam tersebut akan diproses pada hari kerja berikutnya.';

export const penandaDokumen = {
    docId: 'DOC_ID: SUMBERAGUNG/SP7/2024',
    revisi: 'REVISION: 1.0.4',
};