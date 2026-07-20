import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

// DEV ONLY: skip auth saat development supaya bisa preview dashboard tanpa OAuth
// Hapus flag ini sebelum merge ke main
const DEV_SKIP_AUTH = process.env.NODE_ENV === 'development';

export default auth((req) => {
  if (DEV_SKIP_AUTH) return NextResponse.next();

  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session;
  const isDashboard = nextUrl.pathname.startsWith('/dashboard');
  const isLoginPage = nextUrl.pathname === '/login';

  if (isDashboard && !isLoggedIn) {
    // Simpan tujuan asal di callbackUrl supaya setelah login diarahkan balik
    // ke sana — mis. scan QR ke /dashboard/presensi kembali ke presensi.
    const login = new URL('/login', nextUrl);
    login.searchParams.set('callbackUrl', nextUrl.pathname + nextUrl.search);
    return NextResponse.redirect(login);
  }

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
