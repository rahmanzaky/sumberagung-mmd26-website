// Validasi & normalisasi input yang murni (tanpa efek samping) supaya bisa
// dipakai lintas form dan diuji.

/** Cek format email sederhana namun ketat: satu @, ada domain & TLD. */
export function emailValid(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

/**
 * Normalisasi nomor WhatsApp Indonesia ke format lokal "0…":
 * - buang spasi, strip, tanda kurung
 * - "+62"/"62" di depan → "0"
 * - jika belum diawali 0 (mis. "85691…"), tambahkan "0"
 */
export function normalisasiWa(s: string): string {
  let n = s.replace(/[\s\-()]/g, '');
  if (n.startsWith('+62')) n = '0' + n.slice(3);
  else if (n.startsWith('62')) n = '0' + n.slice(2);
  else if (n && !n.startsWith('0')) n = '0' + n;
  return n;
}

/** Valid setelah dinormalisasi: diawali 0, total 9–15 digit. */
export function waValid(s: string): boolean {
  return /^0\d{8,14}$/.test(normalisasiWa(s));
}
