'use server';

import { jenisSurat as daftarJenisSurat } from './data';
import type {
    PengajuanSuratFormState,
    PengajuanSuratPayload,
} from './types';

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

    // --- Kirim ke Apps Script ---
    const endpoint = process.env.APPS_SCRIPT_SURAT_URL;

    if (!endpoint) {
        return {
            status: 'error',
            message: 'Konfigurasi server belum lengkap. Hubungi pengelola website.',
            errors: {},
        };
    }

    const payload: PengajuanSuratPayload = {
        nama,
        nik,
        alamat,
        whatsapp,
        jenisSurat,
        maksud,
    };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`Apps Script menjawab ${response.status}`);
        }

        const hasil = (await response.json()) as { success?: boolean };

        if (hasil.success === false) {
            throw new Error('Apps Script menolak data.');
        }

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