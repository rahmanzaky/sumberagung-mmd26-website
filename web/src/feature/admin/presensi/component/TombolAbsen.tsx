'use client';

import { useState, useRef, useTransition } from 'react';
import Button from '@/shared/components/ui/Button';
import Spinner from '@/shared/components/ui/Spinner';
import { IconCentang } from '@/shared/components/icons';
import { kompresGambar } from '@/lib/kompres-gambar';
import type { AbsenPayload } from '@/repository/presensi/dto';

type Lokasi = { latitude: string; longitude: string };
type FotoSiap = {
  preview: string; // data URL untuk pratinjau
  base64: string;
  mime: string;
  nama: string;
  ukuranKb: number;
};

type Props = {
  namaLengkap: string;
  sudahAbsen: boolean;
  jamAbsen: string | null;
  onAbsen: (payload: AbsenPayload) => Promise<void>;
};

export default function TombolAbsen({ namaLengkap, sudahAbsen, jamAbsen, onAbsen }: Props) {
  const [keterangan, setKeterangan] = useState('');
  const [foto, setFoto] = useState<FotoSiap | null>(null);
  const [lokasi, setLokasi] = useState<Lokasi | null>(null);
  const [statusLokasi, setStatusLokasi] = useState<'idle' | 'memuat' | 'gagal'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const inputFotoRef = useRef<HTMLInputElement>(null);

  async function pilihFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    try {
      const hasil = await kompresGambar(file, { prefixNama: 'absensi' });
      setFoto({
        preview: `data:${hasil.mimeType};base64,${hasil.dataBase64}`,
        base64: hasil.dataBase64,
        mime: hasil.mimeType,
        nama: hasil.namaFile,
        ukuranKb: hasil.ukuranKb,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memproses foto.');
    }
  }

  function ambilLokasi() {
    if (!('geolocation' in navigator)) {
      setError('Perangkat tidak mendukung berbagi lokasi.');
      return;
    }
    setStatusLokasi('memuat');
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLokasi({
          latitude: pos.coords.latitude.toFixed(6),
          longitude: pos.coords.longitude.toFixed(6),
        });
        setStatusLokasi('idle');
      },
      () => {
        setStatusLokasi('gagal');
        setError('Gagal mengambil lokasi. Pastikan izin lokasi diaktifkan.');
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  function absen() {
    if (!foto) {
      setError('Ambil foto bukti terlebih dahulu.');
      return;
    }
    if (!lokasi) {
      setError('Bagikan lokasi terlebih dahulu.');
      return;
    }
    setError(null);
    startTransition(async () => {
      try {
        await onAbsen({
          keterangan,
          latitude: lokasi.latitude,
          longitude: lokasi.longitude,
          fotoBase64: foto.base64,
          fotoMime: foto.mime,
          fotoNama: foto.nama,
        });
        setKeterangan('');
        setFoto(null);
        setLokasi(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal mencatat absensi.');
      }
    });
  }

  if (sudahAbsen) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
            <IconCentang className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--color-text-base)]">
              Absensi hari ini sudah tercatat
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">
              {namaLengkap}
              {jamAbsen ? ` — masuk pukul ${jamAbsen} WIB` : ''}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <p className="text-sm font-medium text-[var(--color-text-base)] mb-1">Belum absen hari ini</p>
      <p className="text-xs text-[var(--color-text-muted)] mb-4">
        Absensi hanya dapat dilakukan satu kali per hari, atas nama {namaLengkap}. Lengkapi foto
        bukti dan lokasi.
      </p>

      {error && (
        <p className="mb-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {/* Langkah 1 — foto bukti */}
      <div className="mb-4">
        <p className="text-xs font-medium text-[var(--color-text-muted)] mb-1.5">
          1. Foto Bukti Kehadiran
        </p>
        <input
          ref={inputFotoRef}
          type="file"
          accept="image/*"
          capture="user"
          onChange={pilihFoto}
          className="hidden"
        />
        {foto ? (
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element -- pratinjau data URL lokal, bukan aset jaringan */}
            <img
              src={foto.preview}
              alt="Pratinjau bukti absensi"
              className="w-20 h-20 rounded-lg object-cover border border-gray-200"
            />
            <div className="text-xs text-[var(--color-text-muted)]">
              <p className="text-green-700 font-medium">Foto siap ({foto.ukuranKb} KB)</p>
              <button
                type="button"
                onClick={() => inputFotoRef.current?.click()}
                className="text-[var(--color-primary)] hover:underline mt-1"
              >
                Ambil ulang
              </button>
            </div>
          </div>
        ) : (
          <Button variant="secondary" size="sm" onClick={() => inputFotoRef.current?.click()}>
            📷 Ambil Foto
          </Button>
        )}
      </div>

      {/* Langkah 2 — lokasi */}
      <div className="mb-4">
        <p className="text-xs font-medium text-[var(--color-text-muted)] mb-1.5">2. Lokasi</p>
        {lokasi ? (
          <p className="text-xs text-green-700">
            Lokasi tercatat: {lokasi.latitude}, {lokasi.longitude}{' '}
            <button
              type="button"
              onClick={ambilLokasi}
              className="text-[var(--color-primary)] hover:underline ml-1"
            >
              perbarui
            </button>
          </p>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            onClick={ambilLokasi}
            disabled={statusLokasi === 'memuat'}
          >
            {statusLokasi === 'memuat' ? <Spinner /> : '📍 Bagikan Lokasi'}
          </Button>
        )}
      </div>

      {/* Langkah 3 — keterangan + submit */}
      <div className="mb-4">
        <p className="text-xs font-medium text-[var(--color-text-muted)] mb-1.5">
          3. Keterangan (opsional)
        </p>
        <input
          type="text"
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
          placeholder="mis. tugas lapangan"
          className="w-full text-sm border border-gray-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
      </div>

      <Button variant="gold" onClick={absen} disabled={isPending || !foto || !lokasi}>
        {isPending ? <Spinner /> : 'Absen Sekarang'}
      </Button>
    </div>
  );
}
