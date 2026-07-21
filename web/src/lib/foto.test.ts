import { describe, it, expect } from 'vitest';
import { urlFotoLangsung } from './foto';

describe('urlFotoLangsung', () => {
  it('mengubah tautan /file/d/<id>/view jadi thumbnail', () => {
    expect(urlFotoLangsung('https://drive.google.com/file/d/ABC123/view?usp=sharing')).toBe(
      'https://drive.google.com/thumbnail?id=ABC123&sz=w800',
    );
  });

  it('mengubah tautan open?id=<id> jadi thumbnail', () => {
    expect(urlFotoLangsung('https://drive.google.com/open?id=XYZ789')).toBe(
      'https://drive.google.com/thumbnail?id=XYZ789&sz=w800',
    );
  });

  it('membiarkan URL non-Drive apa adanya', () => {
    const url = 'https://contoh.com/foto.jpg';
    expect(urlFotoLangsung(url)).toBe(url);
  });

  it('membiarkan string kosong', () => {
    expect(urlFotoLangsung('')).toBe('');
  });
});
