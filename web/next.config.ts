import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname, '..'),
  },
  images: {
    // Foto CMS diunggah ke Google Drive; next/image butuh host-nya di-allowlist
    // agar bisa merender tautan thumbnail Drive.
    remotePatterns: [
      { protocol: 'https', hostname: 'drive.google.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
  experimental: {
    // Foto bukti absensi dikirim sebagai base64 lewat Server Action. Batas
    // default 1 MB terlalu kecil untuk itu; 5 MB cukup untuk gambar terkompres.
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
};

export default nextConfig;
