import { describe, it, expect } from 'vitest';
import { pisahKoordinat, pisahNilaiSatuan, pisahBatas } from './parse-geografi';

const fbKoord = { lintang: 'L', bujur: 'B' };

describe('pisahKoordinat', () => {
  it('memecah "…Lintang… dan …Bujur…"', () => {
    expect(
      pisahKoordinat("7°21'-7°31' Lintang Selatan dan 112°10'-112°40' Bujur Timur", fbKoord),
    ).toEqual({ lintang: "7°21'-7°31' Lintang Selatan", bujur: "112°10'-112°40' Bujur Timur" });
  });
  it('fallback bila tak ada pemisah "dan"', () => {
    expect(pisahKoordinat('koordinat tak jelas', fbKoord)).toEqual(fbKoord);
  });
});

describe('pisahNilaiSatuan', () => {
  const fb = { nilai: '0', satuan: 'x' };
  it('memisah angka & satuan', () => {
    expect(pisahNilaiSatuan('646,499 Ha', fb)).toEqual({ nilai: '646,499', satuan: 'Ha' });
  });
  it('angka tanpa satuan pakai satuan fallback', () => {
    expect(pisahNilaiSatuan('300', fb)).toEqual({ nilai: '300', satuan: 'x' });
  });
  it('fallback penuh bila tak ada angka', () => {
    expect(pisahNilaiSatuan('tanpa angka', fb)).toEqual(fb);
  });
});

describe('pisahBatas', () => {
  it('memisah desa & kecamatan pada koma pertama', () => {
    expect(pisahBatas('Desa Balerejo, Kec. Panggungrejo')).toEqual({
      desa: 'Desa Balerejo',
      kecamatan: 'Kec. Panggungrejo',
    });
  });
  it('kecamatan kosong bila tanpa koma', () => {
    expect(pisahBatas('Desa Balerejo')).toEqual({ desa: 'Desa Balerejo', kecamatan: '' });
  });
});
