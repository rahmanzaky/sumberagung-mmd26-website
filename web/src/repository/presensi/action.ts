'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/guard';
import { getPengguna } from '@/repository/pengguna/action';
import { unggahGambar } from '@/lib/unggah-drive';
import type { AbsensiEntry, AbsenPayload, RekapAbsensiRow, RekapKehadiran } from './dto';

// Data contoh dipakai selama APPS_SCRIPT_PRESENSI_URL belum diisi. Field bukti
// (urlFoto/latitude/longitude) dikosongkan lewat `lengkapiBukti` di bawah.
const dummyDasar = [
  { id: 'ab-001', username: 'sutrisno', tanggal: '2026-07-19', jamMasuk: '07:30', keterangan: '' },
  { id: 'ab-002', username: 'endang', tanggal: '2026-07-19', jamMasuk: '07:25', keterangan: '' },
  { id: 'ab-003', username: 'fauzi', tanggal: '2026-07-19', jamMasuk: '07:45', keterangan: '' },
  {
    id: 'ab-004',
    username: 'slamet',
    tanggal: '2026-07-19',
    jamMasuk: '07:20',
    keterangan: 'Langsung ke lapangan setelah absen',
  },
  { id: 'ab-005', username: 'yuliana', tanggal: '2026-07-19', jamMasuk: '07:35', keterangan: '' },
  { id: 'ab-006', username: 'sutrisno', tanggal: '2026-07-18', jamMasuk: '07:28', keterangan: '' },
  { id: 'ab-007', username: 'endang', tanggal: '2026-07-18', jamMasuk: '07:33', keterangan: '' },
  { id: 'ab-008', username: 'fauzi', tanggal: '2026-07-18', jamMasuk: '07:50', keterangan: '' },
  { id: 'ab-009', username: 'dwi', tanggal: '2026-07-18', jamMasuk: '07:41', keterangan: '' },
  { id: 'ab-010', username: 'hartono', tanggal: '2026-07-18', jamMasuk: '07:22', keterangan: '' },
  { id: 'ab-011', username: 'bagus', tanggal: '2026-07-18', jamMasuk: '07:55', keterangan: '' },
  { id: 'ab-012', username: 'yuliana', tanggal: '2026-07-18', jamMasuk: '07:37', keterangan: '' },
];

const dummyAbsensi: AbsensiEntry[] = dummyDasar.map((d) => ({
  ...d,
  urlFoto: '',
  latitude: '',
  longitude: '',
}));

async function fetchAppsScript<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Apps Script request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export async function getAbsensi(): Promise<AbsensiEntry[]> {
  const url = process.env.APPS_SCRIPT_PRESENSI_URL;
  if (!url) return dummyAbsensi;

  const json = await fetchAppsScript<{ data: AbsensiEntry[] }>(url);
  return json.data;
}

/** Format YYYY-MM-DD mengikuti zona waktu lokal, bukan UTC. */
function tanggalHariIniISO() {
  return new Date().toLocaleDateString('en-CA');
}

/** Rekap absensi digabung dengan nama & jabatan dari sheet PerangkatDesa. */
export async function getRekapAbsensi(): Promise<RekapAbsensiRow[]> {
  const [absensi, pengguna] = await Promise.all([getAbsensi(), getPengguna()]);
  const petaPengguna = new Map(pengguna.map((p) => [p.username, p]));

  return absensi.map((a) => {
    const p = petaPengguna.get(a.username);
    return {
      ...a,
      namaLengkap: p?.namaLengkap ?? a.username,
      jabatan: p?.jabatan ?? '—',
    };
  });
}

export async function getRekapKehadiran(tanggal?: string): Promise<RekapKehadiran> {
  const target = tanggal ?? tanggalHariIniISO();
  const [absensi, pengguna] = await Promise.all([getAbsensi(), getPengguna()]);

  // Satu perangkat hanya boleh absen sekali sehari, tapi tetap di-dedupe
  // supaya rekap tidak melebihi jumlah perangkat kalau ada baris ganda.
  const sudahAbsen = new Set(absensi.filter((a) => a.tanggal === target).map((a) => a.username));

  return { sudahAbsen: sudahAbsen.size, totalPerangkat: pengguna.length };
}

/** Apakah user ini sudah absen hari ini? (SK-NF-11 — satu kali per hari) */
export async function sudahAbsenHariIni(username: string): Promise<boolean> {
  const absensi = await getAbsensi();
  const hariIni = tanggalHariIniISO();
  return absensi.some((a) => a.username === username && a.tanggal === hariIni);
}

/**
 * Absen mandiri dengan bukti foto + lokasi (permintaan desa).
 * Urutan: validasi 1x/hari → unggah foto ke Drive → simpan baris ke Sheet.
 * Validasi "satu kali per hari" ada di sini (pesan UI jelas) DAN di Apps Script
 * (sumber kebenaran, karena action bisa dipanggil lewat POST langsung).
 */
export async function absenSekarangAction(payload: AbsenPayload) {
  const saya = await requireAdmin();

  if (await sudahAbsenHariIni(saya.username)) {
    throw new Error('Absensi hari ini sudah tercatat.');
  }
  if (!payload.fotoBase64) {
    throw new Error('Foto bukti wajib diambil sebelum absen.');
  }
  if (!payload.latitude || !payload.longitude) {
    throw new Error('Lokasi belum tersedia. Izinkan akses lokasi lalu coba lagi.');
  }

  const url = process.env.APPS_SCRIPT_PRESENSI_URL;
  if (!url) {
    console.warn('[dev] absenSekarangAction tanpa APPS_SCRIPT_PRESENSI_URL — dilewati');
    return;
  }

  // Unggah foto bukti dulu; simpan hanya tautannya ke Sheet.
  const urlFoto = await unggahGambar({
    dataBase64: payload.fotoBase64,
    mimeType: payload.fotoMime,
    namaFile: payload.fotoNama,
  });

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: saya.username,
      tanggal: tanggalHariIniISO(),
      jamMasuk: new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      keterangan: payload.keterangan,
      urlFoto,
      latitude: payload.latitude,
      longitude: payload.longitude,
    }),
  });

  if (!res.ok) throw new Error(`Absen gagal: ${res.status}`);
  const json = (await res.json()) as { success: boolean; error?: string };
  if (!json.success) throw new Error(json.error ?? 'Apps Script returned success: false');

  revalidatePath('/dashboard/presensi');
  revalidatePath('/dashboard');
}
