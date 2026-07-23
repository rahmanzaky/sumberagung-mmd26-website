'use server';

import { createBukuTamu } from '@/repository/buku-tamu/action';
import type { BukuTamuFormState } from './types';

function pisahTanggalJam(nilai: string): { tanggal: string; jam: string } | null {
    const cocok = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/.exec(nilai);
    if (!cocok) return null;
    return { tanggal: cocok[1], jam: cocok[2] };
}

export async function submitBukuTamu(
    _prevState: BukuTamuFormState,
    formData: FormData,
): Promise<BukuTamuFormState> {
    const nama = String(formData.get('nama') ?? '').trim();
    const asal = String(formData.get('asal') ?? '').trim();
    const keperluan = String(formData.get('keperluan') ?? '').trim();
    const whatsapp = String(formData.get('whatsapp') ?? '').trim();
    const kunjungan = String(formData.get('kunjungan') ?? '').trim();

    // --- Validasi ---
    const errors: BukuTamuFormState['errors'] = {};

    if (!nama) errors.nama = 'Nama lengkap wajib diisi.';
    if (!asal) errors.asal = 'Asal instansi atau alamat wajib diisi.';
    if (!keperluan) errors.keperluan = 'Keperluan kunjungan wajib diisi.';

    if (!whatsapp) {
        errors.whatsapp = 'Nomor WhatsApp wajib diisi.';
    } else if (!/^0\d{8,14}$/.test(whatsapp.replace(/[\s-]/g, ''))) {
        errors.whatsapp = 'Nomor harus diawali 0 dan terdiri dari 9–15 digit.';
    }

    const waktu = kunjungan ? pisahTanggalJam(kunjungan) : null;
    if (!waktu) errors.kunjungan = 'Tanggal dan jam kunjungan wajib diisi.';

    if (Object.keys(errors).length > 0) {
        return {
            status: 'error',
            message: 'Periksa kembali isian yang ditandai.',
            errors,
        };
    }

    // --- Simpan lewat backend gabungan (resource 'bukuTamu') ---
    // Buku tamu bersifat publik (warga tanpa akun), jadi memakai createBukuTamu
    // yang tanpa guard admin. Pemetaan nama field: asal→instansi, whatsapp→noWhatsapp.
    try {
        await createBukuTamu({
            nama,
            instansi: asal,
            keperluan,
            noWhatsapp: whatsapp.replace(/[\s-]/g, ''),
            tanggal: waktu!.tanggal,
            jam: waktu!.jam,
        });

        return {
            status: 'success',
            message: 'Terima kasih, data kunjungan Anda telah tercatat.',
            errors: {},
        };
    } catch (error) {
        console.error('Gagal mengirim buku tamu:', error);

        return {
            status: 'error',
            message: 'Gagal mengirim data. Silakan coba beberapa saat lagi.',
            errors: {},
        };
    }
}