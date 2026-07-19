/**
 * Ikon panel admin — gaya solid dengan sudut membulat, mengikuti referensi
 * desain sidebar (bukan ikon garis tipis, bukan emoji).
 *
 * Semua ikon memakai `fill="currentColor"` supaya warnanya ikut warna teks —
 * itu yang membuat item sidebar aktif otomatis berubah jadi emas tanpa perlu
 * varian ikon terpisah.
 *
 * Detail di dalam ikon (garis teks, siluet orang) dilubangi memakai
 * `fillRule="evenodd"`, jadi yang tembus adalah warna latar di belakangnya —
 * bukan warna solid yang harus ikut diganti tiap kali latar berubah.
 */

type IconProps = {
  className?: string;
};

function Svg({ children, className = 'w-5 h-5' }: IconProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      {children}
    </svg>
  );
}

/** Dashboard — grid empat blok. */
export function IconDashboard(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="3" width="8" height="7" rx="2" />
      <rect x="13" y="3" width="8" height="11" rx="2" />
      <rect x="3" y="12" width="8" height="9" rx="2" />
      <rect x="13" y="16" width="8" height="5" rx="2" />
    </Svg>
  );
}

/** Pengajuan surat — lembar dokumen dengan sudut terpotong. */
export function IconSurat(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 2h7l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm2 10a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2H9Z"
      />
    </Svg>
  );
}

/** Kependudukan — kartu identitas warga. */
export function IconKependudukan(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Zm6.5 5a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0ZM11.25 13c-1.8 0-3.25 1.1-3.25 2.5 0 .28.22.5.5.5h5.5a.5.5 0 0 0 .5-.5c0-1.4-1.45-2.5-3.25-2.5ZM16 9a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2Zm-1 4a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1Z"
      />
    </Svg>
  );
}

/** Absensi — jam. */
export function IconAbsensi(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 5a1 1 0 1 0-2 0v5c0 .27.1.52.29.71l3 3a1 1 0 0 0 1.42-1.42L13 11.59V7Z"
      />
    </Svg>
  );
}

/** Buku tamu — buku terbuka. */
export function IconBukuTamu(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 5.5A1.5 1.5 0 0 1 3.5 4H9a3 3 0 0 1 2.25 1.02c.2.23.3.52.3.83V19.4a.6.6 0 0 1-.94.5A4.5 4.5 0 0 0 8 19H3.5A1.5 1.5 0 0 1 2 17.5v-12Zm10.45.35c0-.31.1-.6.3-.83A3 3 0 0 1 15 4h5.5A1.5 1.5 0 0 1 22 5.5v12a1.5 1.5 0 0 1-1.5 1.5H16a4.5 4.5 0 0 0-2.61.9.6.6 0 0 1-.94-.5V5.85Z"
      />
    </Svg>
  );
}

/** Konten website — lembar artikel dengan baris teks. */
export function IconKonten(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Zm4 2a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H8Zm-1 5a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2H8Z"
      />
    </Svg>
  );
}

/** Galeri — bingkai foto dengan matahari & bukit. */
export function IconGaleri(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Zm5.5 1.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10.5 11-4.7-6.27a1 1 0 0 0-1.6 0L9.5 16l-1.8-2.4a1 1 0 0 0-1.6 0L5 15.5V18a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.5Z"
      />
    </Svg>
  );
}

/** Pengguna — dua orang. */
export function IconPengguna(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm7.5 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM2 18.5C2 15.46 5.13 13 9 13s7 2.46 7 5.5V20a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1.5Zm15.44-5.4c2.66.42 4.56 2.3 4.56 4.65V19a1 1 0 0 1-1 1h-3.2c.13-.32.2-.66.2-1.02V18.5c0-2.16-.97-4.04-2.5-5.28.64-.14 1.3-.18 1.94-.12Z"
      />
    </Svg>
  );
}

/** Pengaturan — roda gigi. */
export function IconPengaturan(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.82 2c.5 0 .93.37 1 .87l.22 1.7c.5.2.96.47 1.39.79l1.58-.66a1 1 0 0 1 1.25.42l1.82 3.15a1 1 0 0 1-.24 1.29l-1.35 1.05a7.4 7.4 0 0 1 0 1.58l1.35 1.05a1 1 0 0 1 .24 1.29l-1.82 3.15a1 1 0 0 1-1.25.42l-1.58-.66c-.43.32-.9.59-1.39.79l-.22 1.7a1 1 0 0 1-1 .87h-3.64a1 1 0 0 1-1-.87l-.22-1.7c-.5-.2-.96-.47-1.39-.79l-1.58.66a1 1 0 0 1-1.25-.42l-1.82-3.15a1 1 0 0 1 .24-1.29l1.35-1.05a7.4 7.4 0 0 1 0-1.58l-1.35-1.05a1 1 0 0 1-.24-1.29l1.82-3.15a1 1 0 0 1 1.25-.42l1.58.66c.43-.32.9-.59 1.39-.79l.22-1.7a1 1 0 0 1 1-.87h3.64ZM12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"
      />
    </Svg>
  );
}

/** Keluar sesi — panah keluar pintu. */
export function IconKeluar(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1a1 1 0 1 0-2 0v1H5V6h6v1a1 1 0 1 0 2 0V6a2 2 0 0 0-2-2H5Zm11.7 4.3a1 1 0 0 0-1.4 1.4l1.29 1.3H10a1 1 0 1 0 0 2h6.59l-1.3 1.3a1 1 0 0 0 1.42 1.4l3-3a1 1 0 0 0 0-1.4l-3-3Z"
      />
    </Svg>
  );
}

/** Notifikasi — lonceng. */
export function IconLonceng(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2a6 6 0 0 0-6 6v3.6l-1.4 2.8A1.5 1.5 0 0 0 5.94 17h12.12a1.5 1.5 0 0 0 1.34-2.6L18 11.6V8a6 6 0 0 0-6-6Zm-2.5 16a.5.5 0 0 0-.48.64 3.1 3.1 0 0 0 5.96 0 .5.5 0 0 0-.48-.64h-5Z"
      />
    </Svg>
  );
}

/** Pengajuan masuk — nampan dengan panah turun. */
export function IconMasuk(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2a1 1 0 0 1 1 1v6.59l1.3-1.3a1 1 0 1 1 1.4 1.42l-3 3a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l1.3 1.3V3a1 1 0 0 1 1-1ZM4 13a1 1 0 0 1 1 1v4h14v-4a1 1 0 1 1 2 0v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1Z"
      />
    </Svg>
  );
}

/** Peringatan — segitiga seru. */
export function IconPeringatan(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.27 3.5a2 2 0 0 1 3.46 0l8 14A2 2 0 0 1 20 20.5H4a2 2 0 0 1-1.73-3l8-14ZM12 8a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1Zm0 8.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
      />
    </Svg>
  );
}

/** Kepala keluarga — rumah. */
export function IconRumah(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M11.36 2.27a1 1 0 0 1 1.28 0l8 6.67c.23.19.36.47.36.77V20a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-4.5h-3V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.71c0-.3.13-.58.36-.77l8-6.67Z" />
    </Svg>
  );
}

/** Wilayah RT/RW — peta terlipat. */
export function IconPeta(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9 2.2a1 1 0 0 1 .6.06L15 4.4l4.6-1.98A1 1 0 0 1 21 3.34v14.1a1 1 0 0 1-.6.92l-5 2.15a1 1 0 0 1-.8 0L9 18.4l-4.6 1.98A1 1 0 0 1 3 19.46V5.36a1 1 0 0 1 .6-.92l5-2.15A1 1 0 0 1 9 2.2Zm.5 2.42v11.83l5 2.15V6.77l-5-2.15Z" />
    </Svg>
  );
}

/** Konfirmasi berhasil — centang dalam lingkaran. */
export function IconCentang(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.7 7.3a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4 0l-2.5-2.5a1 1 0 1 1 1.4-1.4l1.8 1.79 4.3-4.3a1 1 0 0 1 1.4 0Z"
      />
    </Svg>
  );
}
