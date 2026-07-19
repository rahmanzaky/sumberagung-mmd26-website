import { auth } from '@/lib/auth';

/**
 * Server Action bisa dipanggil lewat POST langsung, bukan cuma dari UI kita.
 * Jadi setiap action yang mengubah data wajib memanggil ini dulu.
 */
export async function requireAdmin() {
  // Mengikuti DEV_SKIP_AUTH di proxy.ts — tanpa ini dashboard tidak bisa
  // dipreview saat development. Hapus bareng flag itu sebelum merge ke main.
  if (process.env.NODE_ENV === 'development') return 'dev@localhost';

  const session = await auth();
  if (!session?.user?.email) {
    throw new Error('Unauthorized: sesi admin tidak ditemukan');
  }
  return session.user.email;
}
