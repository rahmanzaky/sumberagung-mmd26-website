import { signIn } from '@/lib/auth';

export default function LoginContainer() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface)]">
      <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-sm text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--color-accent)] flex items-center justify-center mx-auto mb-6 font-bold text-[var(--color-primary-dark)] text-xl">
          DS
        </div>
        <h1 className="font-[var(--font-lora)] text-2xl font-bold text-[var(--color-primary)] mb-2">
          Admin Desa Sumberagung
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] mb-8">
          Masuk menggunakan akun Google perangkat desa.
        </p>
        <form
          action={async () => {
            'use server';
            await signIn('google', { redirectTo: '/dashboard' });
          }}
        >
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Masuk dengan Google
          </button>
        </form>
        <p className="mt-6 text-xs text-[var(--color-text-muted)]">
          Hanya akun yang terdaftar yang dapat mengakses panel ini.
        </p>
      </div>
    </div>
  );
}
