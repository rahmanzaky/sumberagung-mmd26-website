// Fungsi murni untuk memecah nilai gabungan dari CMS Geografi menjadi bagian
// yang dibutuhkan komponen FE. Dipisah dari loader agar bebas backend & bisa diuji.

export function pisahKoordinat(
  koordinat: string,
  fallback: { lintang: string; bujur: string },
): { lintang: string; bujur: string } {
  // Format: "…Lintang Selatan dan …Bujur Timur"
  const bagian = koordinat.split(/\s+dan\s+/i);
  if (bagian.length === 2) return { lintang: bagian[0].trim(), bujur: bagian[1].trim() };
  return fallback;
}

export function pisahNilaiSatuan(
  s: string,
  fallback: { nilai: string; satuan: string },
): { nilai: string; satuan: string } {
  const m = s.match(/^\s*([\d.,]+)\s*(.*)$/);
  if (!m) return fallback;
  return { nilai: m[1], satuan: m[2].trim() || fallback.satuan };
}

export function pisahBatas(s: string): { desa: string; kecamatan: string } {
  const koma = s.indexOf(',');
  if (koma === -1) return { desa: s.trim(), kecamatan: '' };
  return { desa: s.slice(0, koma).trim(), kecamatan: s.slice(koma + 1).trim() };
}
