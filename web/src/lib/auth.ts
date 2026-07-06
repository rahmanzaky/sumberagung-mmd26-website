import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { ALLOWED_ADMIN_EMAILS } from '@/config/allowed-emails';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
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
