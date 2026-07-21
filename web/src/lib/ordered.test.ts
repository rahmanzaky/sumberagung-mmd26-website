import { describe, it, expect } from 'vitest';
import { tukarUrutan, urutanBerikutnya } from './ordered';

const items = [
  { id: 'a', urutan: 1 },
  { id: 'b', urutan: 2 },
  { id: 'c', urutan: 3 },
];

describe('urutanBerikutnya', () => {
  it('mulai dari 1 saat kosong', () => {
    expect(urutanBerikutnya([])).toBe(1);
  });
  it('maks + 1', () => {
    expect(urutanBerikutnya(items)).toBe(4);
  });
  it('mengabaikan celah urutan', () => {
    expect(urutanBerikutnya([{ id: 'x', urutan: 5 }])).toBe(6);
  });
});

describe('tukarUrutan', () => {
  it('null saat naik dari puncak', () => {
    expect(tukarUrutan(items, 'a', 'naik')).toBeNull();
  });
  it('null saat turun dari dasar', () => {
    expect(tukarUrutan(items, 'c', 'turun')).toBeNull();
  });
  it('null untuk id tak dikenal', () => {
    expect(tukarUrutan(items, 'zzz', 'naik')).toBeNull();
  });
  it('menukar nilai urutan dua tetangga saat turun', () => {
    const hasil = tukarUrutan(items, 'a', 'turun');
    expect(hasil).not.toBeNull();
    expect(hasil!.a).toEqual({ id: 'a', urutan: 2 });
    expect(hasil!.b).toEqual({ id: 'b', urutan: 1 });
  });
  it('menukar nilai urutan dua tetangga saat naik', () => {
    const hasil = tukarUrutan(items, 'c', 'naik');
    expect(hasil!.a).toEqual({ id: 'c', urutan: 2 });
    expect(hasil!.b).toEqual({ id: 'b', urutan: 3 });
  });
  it('bekerja walau input tidak terurut', () => {
    const acak = [
      { id: 'c', urutan: 3 },
      { id: 'a', urutan: 1 },
      { id: 'b', urutan: 2 },
    ];
    const hasil = tukarUrutan(acak, 'b', 'naik');
    expect(hasil!.a.id).toBe('b');
    expect(hasil!.a.urutan).toBe(1);
    expect(hasil!.b.id).toBe('a');
    expect(hasil!.b.urutan).toBe(2);
  });
});
