import { describe, it, expect } from 'vitest';
import { emailValid, normalisasiWa, waValid } from './validasi';

describe('emailValid', () => {
  it('menerima email wajar', () => {
    expect(emailValid('warga@sumberagung.desa.id')).toBe(true);
    expect(emailValid('  a.b@gmail.com  ')).toBe(true);
  });
  it('menolak yang salah', () => {
    expect(emailValid('bukan email')).toBe(false);
    expect(emailValid('a@b')).toBe(false);
    expect(emailValid('@b.com')).toBe(false);
    expect(emailValid('')).toBe(false);
  });
});

describe('normalisasiWa', () => {
  it('menambah 0 di depan nomor tanpa 0 (kasus data nyata)', () => {
    expect(normalisasiWa('85691792069')).toBe('085691792069');
  });
  it('mengubah +62 dan 62 jadi 0', () => {
    expect(normalisasiWa('+6285691792069')).toBe('085691792069');
    expect(normalisasiWa('6285691792069')).toBe('085691792069');
  });
  it('membuang spasi & strip', () => {
    expect(normalisasiWa('0812-3456-7890')).toBe('081234567890');
    expect(normalisasiWa('0812 3456 7890')).toBe('081234567890');
  });
});

describe('waValid', () => {
  it('valid untuk nomor Indonesia wajar', () => {
    expect(waValid('085691792069')).toBe(true);
    expect(waValid('85691792069')).toBe(true); // dinormalisasi dulu
    expect(waValid('+6281234567890')).toBe(true);
  });
  it('menolak yang terlalu pendek / bukan angka', () => {
    expect(waValid('0812')).toBe(false);
    expect(waValid('abcdefghij')).toBe(false);
    expect(waValid('')).toBe(false);
  });
});
