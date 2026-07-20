import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { ALLOWED_ADMIN_EMAILS } from '@/config/allowed-emails';

const SEPULUH_HARI = 10 * 24 * 60 * 60; // detik

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // Sesi bertahan 10 hari supaya perangkat desa tidak sering login ulang
  // (mis. saat scan QR untuk absensi harian). Strategi JWT — tanpa DB sesi.
  session: {
    strategy: 'jwt',
    maxAge: SEPULUH_HARI,
    updateAge: 24 * 60 * 60, // perpanjang cookie maksimal sekali sehari
  },
  callbacks: {
    signIn({ user }) {
      const email = user.email ?? '';
      if (ALLOWED_ADMIN_EMAILS.length === 0) {
        // Saat development & whitelist kosong, izinkan semua login
        // Pastikan whitelist diisi sebelum production
        return true;
      }
      return ALLOWED_ADMIN_EMAILS.includes(email);
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
});
