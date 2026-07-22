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
    <div className="relative bg-white rounded-xl shadow-lg border border-[var(--color-primary)]/20 p-6 overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[var(--color-primary)] to-blue-400" />

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center shadow-inner">
          <span className="text-xl">👋</span>
        </div>
        <p className="text-lg font-bold text-[var(--color-text-base)]">Yuk, Absen Dulu!</p>
      </div>
      <p className="text-sm text-[var(--color-text-muted)] mb-6 pl-13">
        Absensi hanya dapat dilakukan satu kali per hari, atas nama{' '}
        <strong className="text-[var(--color-text-base)]">{namaLengkap}</strong>. Lengkapi foto
        bukti dan lokasi.
      </p>

      {error && (
        <div className="mb-5 flex items-start gap-2 bg-red-50/80 border border-red-200 text-red-700 rounded-lg p-3 animate-in fade-in slide-in-from-top-2">
          <span className="text-lg">⚠️</span>
          <p className="text-sm pt-0.5">{error}</p>
        </div>
      )}

      <div className="space-y-6 pl-13 border-l-2 border-dashed border-gray-200 ml-5">
        {/* Langkah 1 — foto bukti */}
        <div className="relative">
          <div className="absolute -left-[30px] top-0 bg-white">
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center bg-white text-xs font-bold text-gray-500 shadow-sm">
              1
            </div>
          </div>
          <p className="text-sm font-semibold text-[var(--color-text-base)] mb-2">
            Foto Bukti Kehadiran
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
            <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg border border-gray-100 transition-all hover:bg-gray-100/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={foto.preview}
                alt="Pratinjau bukti absensi"
                className="w-16 h-16 rounded-md object-cover border border-gray-200 shadow-sm"
              />
              <div className="text-sm">
                <p className="text-green-600 font-medium flex items-center gap-1.5">
                  <IconCentang className="w-4 h-4" /> Foto siap ({foto.ukuranKb} KB)
                </p>
                <button
                  type="button"
                  onClick={() => inputFotoRef.current?.click()}
                  className="text-[var(--color-primary)] hover:underline mt-1.5 font-medium text-xs transition-colors"
                >
                  Ambil ulang foto
                </button>
              </div>
            </div>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => inputFotoRef.current?.click()}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="mr-1">📷</span> Ambil Foto
            </Button>
          )}
        </div>

        {/* Langkah 2 — lokasi */}
        <div className="relative">
          <div className="absolute -left-[30px] top-0 bg-white">
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center bg-white text-xs font-bold text-gray-500 shadow-sm">
              2
            </div>
          </div>
          <p className="text-sm font-semibold text-[var(--color-text-base)] mb-2">Bagikan Lokasi</p>
          {lokasi ? (
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex flex-col gap-1.5 transition-all hover:bg-gray-100/50">
              <p className="text-sm text-green-600 font-medium flex items-center gap-1.5">
                <IconCentang className="w-4 h-4" /> Lokasi tercatat
              </p>
              <p className="text-xs text-gray-500 font-mono bg-white px-2 py-1 rounded border border-gray-200 inline-block w-fit shadow-inner">
                {lokasi.latitude}, {lokasi.longitude}
              </p>
              <button
                type="button"
                onClick={ambilLokasi}
                className="text-[var(--color-primary)] hover:underline font-medium text-xs w-fit transition-colors mt-0.5"
              >
                Perbarui lokasi
              </button>
            </div>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={ambilLokasi}
              disabled={statusLokasi === 'memuat'}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              {statusLokasi === 'memuat' ? (
                <Spinner />
              ) : (
                <>
                  <span className="mr-1">📍</span> Bagikan Lokasi
                </>
              )}
            </Button>
          )}
        </div>

        {/* Langkah 3 — keterangan + submit */}
        <div className="relative pb-2">
          <div className="absolute -left-[30px] top-0 bg-white">
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center bg-white text-xs font-bold text-gray-500 shadow-sm relative z-10">
              3
            </div>
            <div className="absolute top-6 bottom-[-20px] left-[11px] w-[2px] bg-white z-0" />
          </div>
          <p className="text-sm font-semibold text-[var(--color-text-base)] mb-2">
            Keterangan (Opsional)
          </p>
          <input
            type="text"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            placeholder="Mis. tugas lapangan, izin terlambat..."
            className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all shadow-inner"
          />
        </div>
      </div>

      <div className="mt-8 pt-5 border-t border-gray-100 flex justify-end">
        <Button
          variant="gold"
          onClick={absen}
          disabled={isPending || !foto || !lokasi}
          className="w-full sm:w-auto shadow-md hover:shadow-lg transition-all group py-2.5 px-6"
        >
          {isPending ? (
            <Spinner />
          ) : (
            <span className="flex items-center justify-center gap-2 font-medium">
              Kirim Absensi Sekarang{' '}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
