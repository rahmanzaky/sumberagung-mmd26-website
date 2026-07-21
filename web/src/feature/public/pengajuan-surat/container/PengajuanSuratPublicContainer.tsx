'use client';

import { useActionState } from 'react';

import { submitPengajuanSurat } from '../actions';
import {
  catatanArsip,
  catatanJamLayanan,
  jenisSurat,
  penandaDokumen,
  pengajuanHeader,
} from '../data';
import { initialFormState } from '../types';

function IkonPanahSerong({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function IkonInfo({ className }: { className?: string }) {
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

function IkonJam({ className }: { className?: string }) {
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
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function IkonChevron({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

const labelClass =
  'block text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-primary-dark)]';

/** Kelas input berkotak sesuai desain. */
function fieldClass(bermasalah: boolean, tambahan = '') {
  return [
    'w-full rounded-sm border bg-white px-4 py-3 text-[15px] text-slate-800',
    'transition-colors placeholder:text-slate-400 focus:outline-none',
    bermasalah
      ? 'border-red-500 focus:border-red-600'
      : 'border-slate-300 focus:border-[var(--color-primary)]',
    tambahan,
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

export default function PengajuanSuratPublicContainer() {
  const [state, formAction, isPending] = useActionState(
    submitPengajuanSurat,
    initialFormState,
  );

  const { errors } = state;
  const jenisSuratKosong = jenisSurat.length === 0;

  return (
    <section className="bg-[var(--color-primary-deepdark)] px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-3xl bg-white p-8 shadow-2xl sm:p-12">
        <form action={formAction}>
          {/* Judul */}
          <div className="text-center">
            <h1 className="font-serif text-4xl font-bold tracking-[-0.03em] text-[var(--color-primary-dark)] sm:text-5xl">
              {pengajuanHeader.judul}
            </h1>
            <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              {pengajuanHeader.subjudul}
            </p>
          </div>

          <hr className="my-8 border-gray-100" />

          {/* Isian */}
          <div className="flex flex-col gap-6">
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
                placeholder="Sesuai KTP"
                aria-invalid={Boolean(errors.nama)}
                aria-describedby={errors.nama ? 'nama-error' : undefined}
                className={`mt-2 ${fieldClass(Boolean(errors.nama))}`}
              />
              <FieldError id="nama-error" pesan={errors.nama} />
            </div>

            <div>
              <label htmlFor="nik" className={labelClass}>
                Nomor Induk Kependudukan (NIK)
              </label>
              <input
                id="nik"
                name="nik"
                type="text"
                inputMode="numeric"
                maxLength={16}
                placeholder="16 Digit NIK"
                aria-invalid={Boolean(errors.nik)}
                aria-describedby={errors.nik ? 'nik-error' : undefined}
                className={`mt-2 ${fieldClass(Boolean(errors.nik), 'font-mono tracking-[0.08em]')}`}
              />
              <FieldError id="nik-error" pesan={errors.nik} />
            </div>

            <div>
              <label htmlFor="alamat" className={labelClass}>
                Alamat Lengkap
              </label>
              <input
                id="alamat"
                name="alamat"
                type="text"
                maxLength={200}
                placeholder="RT/RW, Dusun, Desa..."
                aria-invalid={Boolean(errors.alamat)}
                aria-describedby={errors.alamat ? 'alamat-error' : undefined}
                className={`mt-2 ${fieldClass(Boolean(errors.alamat))}`}
              />
              <FieldError id="alamat-error" pesan={errors.alamat} />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="whatsapp" className={labelClass}>
                  Nomor WhatsApp
                </label>
                <div className="mt-2 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="text-sm font-medium text-[var(--color-text-muted)]"
                  >
                    +62
                  </span>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="8xxxxxxxxx"
                    aria-invalid={Boolean(errors.whatsapp)}
                    aria-describedby={
                      errors.whatsapp ? 'whatsapp-error' : undefined
                    }
                    className={fieldClass(Boolean(errors.whatsapp))}
                  />
                </div>
                <FieldError id="whatsapp-error" pesan={errors.whatsapp} />
              </div>

              <div>
                <label htmlFor="jenisSurat" className={labelClass}>
                  Jenis Surat
                </label>
                <div className="relative mt-2">
                  <select
                    id="jenisSurat"
                    name="jenisSurat"
                    defaultValue=""
                    disabled={jenisSuratKosong}
                    aria-invalid={Boolean(errors.jenisSurat)}
                    aria-describedby={
                      errors.jenisSurat ? 'jenisSurat-error' : undefined
                    }
                    className={`${fieldClass(Boolean(errors.jenisSurat), 'appearance-none pr-10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400')}`}
                  >
                    <option value="" disabled>
                      {jenisSuratKosong
                        ? 'Jenis surat belum tersedia'
                        : 'Pilih Jenis Surat...'}
                    </option>
                    {jenisSurat.map((jenis) => (
                      <option key={jenis} value={jenis}>
                        {jenis}
                      </option>
                    ))}
                  </select>
                  <IkonChevron
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  />
                </div>
                <FieldError id="jenisSurat-error" pesan={errors.jenisSurat} />
              </div>
            </div>

            <div>
              <label htmlFor="maksud" className={labelClass}>
                Maksud &amp; Tujuan
              </label>
              <textarea
                id="maksud"
                name="maksud"
                rows={3}
                maxLength={500}
                placeholder="Jelaskan keperluan pengajuan surat ini secara singkat"
                aria-invalid={Boolean(errors.maksud)}
                aria-describedby={errors.maksud ? 'maksud-error' : undefined}
                className={`mt-2 resize-none ${fieldClass(Boolean(errors.maksud))}`}
              />
              <FieldError id="maksud-error" pesan={errors.maksud} />
            </div>
          </div>

          {/* Catatan jam layanan */}
          <p className="mt-8 flex items-start gap-2.5 text-[13px] leading-relaxed text-[var(--color-text-muted)]">
            <IkonJam className="mt-0.5 h-4 w-4 shrink-0" />
            {catatanJamLayanan}
          </p>

          {/* Catatan arsip */}
          <p className="mt-4 flex items-start gap-2.5 border-l-4 border-[var(--color-accent)] bg-[#fdf8e7] px-4 py-3.5 text-[13px] leading-relaxed text-[var(--color-text-muted)]">
            <IkonInfo className="mt-0.5 h-4 w-4 shrink-0" />
            {catatanArsip}
          </p>

          {/* Tombol kirim */}
          <button
            type="submit"
            disabled={isPending || jenisSuratKosong}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[var(--color-accent-dark)] px-6 py-4 font-serif text-base font-semibold text-[var(--color-primary-dark)] shadow-sm transition-colors hover:bg-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? 'Mengirim...' : 'Kirim Pengajuan'}
            {!isPending && <IkonPanahSerong className="h-4 w-4" />}
          </button>

          {/* Umpan balik setelah kirim */}
          <p
            role="status"
            aria-live="polite"
            className={`mt-4 text-center text-sm ${
              state.status === 'success' ? 'text-emerald-700' : 'text-red-600'
            }`}
          >
            {state.message}
          </p>

          {/* Penanda dokumen */}
          <div className="mt-12 font-mono text-[10px] leading-relaxed tracking-[0.08em] text-slate-300">
            <p>{penandaDokumen.docId}</p>
            <p>{penandaDokumen.revisi}</p>
          </div>
        </form>
      </div>
    </section>
  );
}