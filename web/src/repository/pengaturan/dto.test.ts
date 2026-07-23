import { describe, it, expect } from 'vitest';
import { dalamJamLayanan, PENGATURAN_DEFAULT } from './dto';

const p = { ...PENGATURAN_DEFAULT, jamLayananMulai: '08:00', jamLayananSelesai: '13:00' };

// Bangun Date dengan jam:menit lokal tertentu (tanggal tak relevan).
function jam(h: number, m = 0) {
  return new Date(2026, 0, 1, h, m);
}

describe('dalamJamLayanan', () => {
  it('true tepat saat buka (08:00)', () => {
    expect(dalamJamLayanan(p, jam(8, 0))).toBe(true);
  });

  it('true di jam pertama layanan (08:30) — regresi bug pemisah titik', () => {
    expect(dalamJamLayanan(p, jam(8, 30))).toBe(true);
  });

  it('true di tengah jam layanan (10:00)', () => {
    expect(dalamJamLayanan(p, jam(10, 0))).toBe(true);
  });

  it('true tepat saat tutup (13:00)', () => {
    expect(dalamJamLayanan(p, jam(13, 0))).toBe(true);
  });

  it('false sebelum buka (07:59)', () => {
    expect(dalamJamLayanan(p, jam(7, 59))).toBe(false);
  });

  it('false setelah tutup (13:01)', () => {
    expect(dalamJamLayanan(p, jam(13, 1))).toBe(false);
  });
});
