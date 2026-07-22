'use client';

import { useState, useTransition } from 'react';
import type { Pengguna, PenggunaInput, Role } from '@/repository/pengguna/dto';
import { ROLES } from '@/repository/pengguna/dto';
import Badge from '@/shared/components/ui/Badge';
import Button from '@/shared/components/ui/Button';
import Spinner from '@/shared/components/ui/Spinner';
import { emailValid, waValid, normalisasiWa } from '@/lib/validasi';

const TH =
  'px-4 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider';

const KOSONG: PenggunaInput = {
  username: '',
  namaLengkap: '',
  jabatan: '',
  noWa: '',
  email: '',
  role: 'Admin',
};

type Props = {
  data: Pengguna[];
  bolehKelola: boolean; // hanya Super Admin
  onSimpan: (input: PenggunaInput) => Promise<void>;
  onHapus: (username: string) => Promise<void>;
};

export default function PenggunaManager({ data, bolehKelola, onSimpan, onHapus }: Props) {
  const [form, setForm] = useState<PenggunaInput | null>(null);
  const [editing, setEditing] = useState(false); // true = username dikunci
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function bukaTambah() {
    setForm({ ...KOSONG });
    setEditing(false);
    setError(null);
  }

  function bukaEdit(p: Pengguna) {
    setForm({ ...p });
    setEditing(true);
    setError(null);
  }

  function submit() {
    if (!form) return;
    if (!form.username.trim() || !form.namaLengkap.trim() || !form.email.trim()) {
      setError('Username, nama lengkap, dan email wajib diisi.');
      return;
    }
    // Email dipakai mencocokkan akun saat login Google — wajib valid.
    if (!emailValid(form.email)) {
      setError('Format email tidak valid.');
      return;
    }
    if (form.noWa.trim() && !waValid(form.noWa)) {
      setError('Nomor WhatsApp tidak valid (contoh: 0812xxxxxxx).');
      return;
    }

    // Simpan email & WA yang sudah dirapikan (WA dinormalisasi ke format 0…).
    const bersih: PenggunaInput = {
      ...form,
      email: form.email.trim(),
      noWa: form.noWa.trim() ? normalisasiWa(form.noWa) : form.noWa,
    };

    startTransition(async () => {
      try {
        await onSimpan(bersih);
        setForm(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal menyimpan pengguna.');
      }
    });
  }

  function hapus(username: string) {
    startTransition(async () => {
      try {
        await onHapus(username);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal menghapus pengguna.');
      }
    });
  }

  return (
    <div>
      {!bolehKelola && (
        <p className="mb-4 text-xs bg-amber-50 border border-amber-200 text-amber-800 rounded-lg px-3 py-2">
          Hanya <strong>Super Admin</strong> yang dapat menambah, mengubah, atau menghapus akun
          perangkat desa. Anda hanya dapat melihat daftar.
        </p>
      )}

      {error && (
        <p className="mb-4 text-xs bg-red-50 border border-red-200 text-red-700 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {bolehKelola && !form && (
        <div className="mb-4">
          <Button onClick={bukaTambah}>+ Tambah Perangkat Desa</Button>
        </div>
      )}

      {form && (
        <div className="mb-6 border border-gray-200 rounded-xl p-4 bg-[var(--color-surface)]">
          <h3 className="text-sm font-semibold text-[var(--color-text-base)] mb-3">
            {editing ? `Ubah Akun: ${form.username}` : 'Tambah Perangkat Desa'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field
              label="Username"
              value={form.username}
              disabled={editing}
              onChange={(v) => setForm({ ...form, username: v })}
            />
            <Field
              label="Nama Lengkap"
              value={form.namaLengkap}
              onChange={(v) => setForm({ ...form, namaLengkap: v })}
            />
            <Field
              label="Jabatan"
              value={form.jabatan}
              onChange={(v) => setForm({ ...form, jabatan: v })}
            />
            <Field
              label="No. WhatsApp"
              value={form.noWa}
              onChange={(v) => setForm({ ...form, noWa: v })}
            />
            <Field
              label="Email Google"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              hint="Dipakai untuk mencocokkan akun saat login Google."
            />
            <label className="block">
              <span className="text-xs font-medium text-[var(--color-text-muted)]">Role</span>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
                className="mt-1 w-full text-sm border border-gray-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Button onClick={submit} disabled={isPending}>
              {isPending ? <Spinner /> : 'Simpan'}
            </Button>
            <button
              type="button"
              onClick={() => setForm(null)}
              className="text-sm text-[var(--color-text-muted)] hover:underline"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--color-surface-dark)] text-left">
              <th className={TH}>Username</th>
              <th className={TH}>Nama Lengkap</th>
              <th className={TH}>Jabatan</th>
              <th className={TH}>No. WA</th>
              <th className={TH}>Email</th>
              <th className={TH}>Role</th>
              {bolehKelola && <th className={TH}>Aksi</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={bolehKelola ? 7 : 6}
                  className="px-4 py-8 text-center text-[var(--color-text-muted)] italic"
                >
                  Belum ada akun perangkat desa.
                </td>
              </tr>
            ) : (
              data.map((p) => (
                <tr key={p.username} className="hover:bg-[var(--color-surface)] transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-[var(--color-text-base)]">
                    {p.username}
                  </td>
                  <td className="px-4 py-3 font-medium text-[var(--color-text-base)] whitespace-nowrap">
                    {p.namaLengkap}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{p.jabatan}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{p.noWa}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)] text-xs">{p.email}</td>
                  <td className="px-4 py-3">
                    <Badge label={p.role} variant={p.role === 'Super Admin' ? 'yellow' : 'blue'} />
                  </td>
                  {bolehKelola && (
                    <td className="px-4 py-3 whitespace-nowrap">
                      <button
                        onClick={() => bukaEdit(p)}
                        disabled={isPending}
                        className="text-xs text-[var(--color-primary)] hover:underline disabled:opacity-50"
                      >
                        Ubah
                      </button>
                      <span className="mx-2 text-gray-300">|</span>
                      <button
                        onClick={() => hapus(p.username)}
                        disabled={isPending}
                        className="text-xs text-red-600 hover:underline disabled:opacity-50"
                      >
                        Hapus
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-[var(--color-text-muted)]">
        {data.length} akun perangkat desa terdaftar
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  disabled,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-[var(--color-text-muted)]">{label}</span>
      <input
        type="text"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full text-sm border border-gray-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] disabled:bg-gray-100 disabled:text-gray-500"
      />
      {hint && <span className="text-[10px] text-[var(--color-text-muted)]">{hint}</span>}
    </label>
  );
}
