import { auth } from '@/lib/auth';
import { getPenggunaByEmail } from '@/repository/pengguna/action';
import type { Pengguna } from '@/repository/pengguna/dto';

// Mengikuti DEV_SKIP_AUTH di proxy.ts — tanpa ini dashboard tidak bisa
// dipreview saat development. Hapus bareng flag itu sebelum merge ke main.
const DEV_SKIP_AUTH = process.env.NODE_ENV === 'development';

const DEV_PENGGUNA: Pengguna = {
  username: 'dev',
  namaLengkap: 'Dev Lokal',
  jabatan: 'Super Admin (dev)',
  noWa: '-',
  email: 'dev@localhost',
  role: 'Super Admin',
};

/**
 * Server Action bisa dipanggil lewat POST langsung, bukan cuma dari UI kita.
 * Jadi setiap action yang mengubah data wajib memanggil salah satu guard ini.
 */
export async function requireAdmin(): Promise<Pengguna> {
  if (DEV_SKIP_AUTH) return DEV_PENGGUNA;

  const session = await auth();
  const email = session?.user?.email;
  if (!email) throw new Error('Unauthorized: sesi admin tidak ditemukan');

  const pengguna = await getPenggunaByEmail(email);
  if (!pengguna) {
    throw new Error(`Forbidden: ${email} tidak terdaftar sebagai perangkat desa`);
  }
  return pengguna;
}

/** Kelola pengguna & konfigurasi sistem — khusus Super Admin (SRS 2.2). */
export async function requireSuperAdmin(): Promise<Pengguna> {
  const pengguna = await requireAdmin();
  if (pengguna.role !== 'Super Admin') {
    throw new Error('Forbidden: aksi ini hanya untuk Super Admin');
  }
  return pengguna;
}

/**
 * Versi lunak requireAdmin untuk RENDER (mis. menyusun menu sesuai peran):
 * mengembalikan null alih-alih melempar bila belum login / tidak terdaftar,
 * supaya layout tidak error. Untuk mutasi tetap pakai requireAdmin/SuperAdmin.
 */
export async function penggunaSaya(): Promise<Pengguna | null> {
  if (DEV_SKIP_AUTH) return DEV_PENGGUNA;

  const session = await auth();
  const email = session?.user?.email;
  if (!email) return null;
  return getPenggunaByEmail(email);
}
