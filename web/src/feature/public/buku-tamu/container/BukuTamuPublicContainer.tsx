'use client';

import Image from 'next/image';

import { useActionState } from 'react';

import { submitBukuTamu } from '../actions';
import { initialFormState } from '../types';

/** Ikon informasi pada banner arsip. */
function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  );
}

const labelClass =
  'block text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-primary-dark)]';

/** Kelas input bergaya garis bawah sesuai desain. */
function fieldClass(hasError: boolean) {
  return [
    'w-full border-0 border-b bg-transparent px-0 py-2.5 text-[15px] text-slate-800',
    'transition-colors placeholder:text-slate-400 focus:outline-none',
    hasError
      ? 'border-red-500 focus:border-red-600'
      : 'border-slate-300 focus:border-[var(--color-primary)]',
  ].join(' ');
}

function FieldError({ id, pesan }: { id: string; pesan?: string }) {
  if (!pesan) return null;
  return (
    <p id={id} className="mt-1.5 text-xs text-red-600">
      {pesan}
    </p>
  );
}

export default function BukuTamuPublicContainer() {
  const [state, formAction, isPending] = useActionState(
    submitBukuTamu,
    initialFormState,
  );

  const { errors } = state;

  return (
    <section className="bg-[var(--color-primary-deepdark)] px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-3xl bg-white p-8 shadow-2xl sm:p-12">
        <form action={formAction}>
          {/* Judul */}
          <div className="text-center">
            <h1 className="font-serif text-4xl font-bold tracking-[-0.03em] text-[var(--color-primary-dark)] sm:text-5xl">
              Buku Tamu
            </h1>
            <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              Pemerintah Desa Sumberagung • Kabupaten Blitar
            </p>
          </div>

          <hr className="my-8 border-gray-100" />

          {/* Isian */}
          <div className="flex flex-col gap-7">
            <div>
              <label htmlFor="nama" className={labelClass}>
                Nama Lengkap
              </label>
              <input
                id="nama"
                name="nama"
                type="text"
                maxLength={100}
                autoComplete="name"
                placeholder="cth: Raden Mas Danuarta"
                aria-invalid={Boolean(errors.nama)}
                aria-describedby={errors.nama ? 'nama-error' : undefined}
                className={`mt-2 ${fieldClass(Boolean(errors.nama))}`}
              />
              <FieldError id="nama-error" pesan={errors.nama} />
            </div>

            <div>
              <label htmlFor="asal" className={labelClass}>
                Asal Instansi / Alamat
              </label>
              <input
                id="asal"
                name="asal"
                type="text"
                maxLength={150}
                placeholder="cth: Dinas Pariwisata Prov. Jatim"
                aria-invalid={Boolean(errors.asal)}
                aria-describedby={errors.asal ? 'asal-error' : undefined}
                className={`mt-2 ${fieldClass(Boolean(errors.asal))}`}
              />
              <FieldError id="asal-error" pesan={errors.asal} />
            </div>

            <div>
              <label htmlFor="keperluan" className={labelClass}>
                Keperluan Kunjungan
              </label>
              <textarea
                id="keperluan"
                name="keperluan"
                rows={3}
                maxLength={500}
                placeholder="Deskripsikan tujuan kedatangan Anda..."
                aria-invalid={Boolean(errors.keperluan)}
                aria-describedby={
                  errors.keperluan ? 'keperluan-error' : undefined
                }
                className={`mt-2 resize-none ${fieldClass(Boolean(errors.keperluan))}`}
              />
              <FieldError id="keperluan-error" pesan={errors.keperluan} />
            </div>

            <div className="grid gap-7 sm:grid-cols-2">
              <div>
                <label htmlFor="whatsapp" className={labelClass}>
                  No. WhatsApp
                </label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="0812-XXXX-XXXX"
                  aria-invalid={Boolean(errors.whatsapp)}
                  aria-describedby={
                    errors.whatsapp ? 'whatsapp-error' : undefined
                  }
                  className={`mt-2 ${fieldClass(Boolean(errors.whatsapp))}`}
                />
                <FieldError id="whatsapp-error" pesan={errors.whatsapp} />
              </div>

              <div>
                <label htmlFor="kunjungan" className={labelClass}>
                  Tanggal &amp; Jam Kunjungan
                </label>
                <input
                  id="kunjungan"
                  name="kunjungan"
                  type="datetime-local"
                  aria-invalid={Boolean(errors.kunjungan)}
                  aria-describedby={
                    errors.kunjungan ? 'kunjungan-error' : undefined
                  }
                  className={`mt-2 ${fieldClass(Boolean(errors.kunjungan))}`}
                />
                <FieldError id="kunjungan-error" pesan={errors.kunjungan} />
              </div>
            </div>
          </div>

          {/* Catatan arsip */}
          <p className="mt-8 flex items-start gap-2.5 border-l-4 border-[var(--color-accent)] bg-[#fdf8e7] px-4 py-3.5 text-[13px] leading-relaxed text-[var(--color-text-muted)]">
            <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" />
            Data ini akan tercatat dalam arsip digital pemerintah desa.
          </p>

          {/* Tombol kirim */}
          <button
            type="submit"
            disabled={isPending}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[var(--color-accent)] px-6 py-4 font-serif text-base font-semibold text-[var(--color-primary-dark)] shadow-sm transition-colors hover:bg-[var(--color-accent-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? 'Mengirim...' : 'Kirim Buku Tamu'}
            {!isPending && (
              <Image
                src="/panah-kanan-atas.svg"
                alt=""
                width={16}
                height={16}
                unoptimized
                className="h-2.5 w-2.5"
              />
            )}
          </button>

          {/* Umpan balik setelah kirim */}
          <p
            role="status"
            aria-live="polite"
            className={`mt-4 text-center text-sm ${state.status === 'success' ? 'text-emerald-700' : 'text-red-600'
              }`}
          >
            {state.message}
          </p>

          {/* Penanda dokumen */}
          <div className="mt-10 flex items-end justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
              Doc-ID: SA-BT-2024-001
            </span>
            <span
              aria-hidden="true"
              className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--color-accent)]/40 text-center font-[var(--font-lora)] text-[8px] leading-tight tracking-wide text-[var(--color-accent)]/50"
            >
              Desa
              <br />
              Sumberagung
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}