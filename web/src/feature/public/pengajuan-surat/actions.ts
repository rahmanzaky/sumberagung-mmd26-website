'use server';

import { buatPengajuanSuratAction } from '@/repository/pengajuan-surat/action';
import { jenisSurat as daftarJenisSurat } from './data';
import type { PengajuanSuratFormState } from './types';

/**
 * Menormalkan nomor WhatsApp ke format 62xxxxxxxxxx.
 * Menerima "8123...", "08123...", maupun "628123...".
 */
function normalkanWhatsapp(nilai: string) {
    const angka = nilai.replace(/\D/g, '');

    if (angka.startsWith('62')) return angka;
    if (angka.startsWith('0')) return `62${angka.slice(1)}`;
    return `62${angka}`;
}

export async function submitPengajuanSurat(
    _prevState: PengajuanSuratFormState,
    formData: FormData,
): Promise<PengajuanSuratFormState> {
    const nama = String(formData.get('nama') ?? '').trim();
    const nik = String(formData.get('nik') ?? '').replace(/\D/g, '');
    const alamat = String(formData.get('alamat') ?? '').trim();
    const whatsappMentah = String(formData.get('whatsapp') ?? '').trim();
    const jenisSurat = String(formData.get('jenisSurat') ?? '').trim();
    const maksud = String(formData.get('maksud') ?? '').trim();

    // --- Validasi ---
    const errors: PengajuanSuratFormState['errors'] = {};

    if (!nama) errors.nama = 'Nama lengkap wajib diisi.';
    if (!alamat) errors.alamat = 'Alamat lengkap wajib diisi.';
    if (!maksud) errors.maksud = 'Maksud dan tujuan wajib diisi.';

    if (!nik) {
        errors.nik = 'NIK wajib diisi.';
    } else if (nik.length !== 16) {
        errors.nik = 'NIK harus terdiri dari tepat 16 digit angka.';
    }

    const whatsapp = whatsappMentah ? normalkanWhatsapp(whatsappMentah) : '';

    if (!whatsappMentah) {
        errors.whatsapp = 'Nomor WhatsApp wajib diisi.';
    } else if (!/^62\d{8,13}$/.test(whatsapp)) {
        errors.whatsapp = 'Nomor tidak valid. Contoh: 81234567890.';
    }

    if (!jenisSurat) {
        errors.jenisSurat = 'Jenis surat wajib dipilih.';
    } else if (
        daftarJenisSurat.length > 0 &&
        !daftarJenisSurat.includes(jenisSurat)
    ) {
        errors.jenisSurat = 'Jenis surat tidak dikenali.';
    }

    if (Object.keys(errors).length > 0) {
        return {
            status: 'error',
            message: 'Periksa kembali isian yang ditandai.',
            errors,
        };
    }

    // --- Simpan lewat backend gabungan (resource 'surat', aksi 'buat') ---
    // Pemetaan field ke skema backend: whatsapp→noWa, maksud→keperluan.
    // Apps Script menyimpan baris berstatus "Baru" & mengirim email notifikasi
    // ke perangkat desa. Pengajuan di luar jam kerja tetap diterima & masuk
    // antrian (SRS: diproses hari kerja berikutnya), jadi tidak diblokir di sini.
    try {
        await buatPengajuanSuratAction({
            nama,
            nik,
            alamat,
            noWa: whatsapp,
            jenisSurat,
            keperluan: maksud,
        });

        return {
            status: 'success',
            message:
                'Pengajuan terkirim. Perangkat desa akan menghubungi Anda melalui WhatsApp.',
            errors: {},
        };
    } catch (error) {
        // NIK sengaja tidak ikut dicatat pada log.
        console.error('Gagal mengirim pengajuan surat:', error);

        return {
            status: 'error',
            message: 'Gagal mengirim data. Silakan coba beberapa saat lagi.',
            errors: {},
        };
    }
}