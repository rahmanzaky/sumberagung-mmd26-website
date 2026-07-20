import { getProfilVisi, getMisi } from '@/repository/profil/action';
import {
  getKependudukanTerbaru,
  getDistribusiUsia,
  getTingkatPendidikan,
} from '@/repository/kependudukan/action';
import { visiMisi as visiMisiStatis, demografi as demografiStatis } from './data';

function angka(n: number) {
  return n.toLocaleString('id-ID');
}

/** Visi & Misi dari CMS. Judul/deskripsi sub-halaman tetap statis. */
export async function muatVisiMisi() {
  const [visi, misi] = await Promise.all([getProfilVisi(), getMisi()]);
  return {
    judul: visiMisiStatis.judul,
    deskripsi: visiMisiStatis.deskripsi,
    visi: visi.visiKutipan,
    misi: misi.map((m, i) => ({
      nomor: `Misi ${String(i + 1).padStart(2, '0')}`,
      teks: m.teks,
    })),
  };
}

/** Demografi dari CMS: kartu statistik, tabel usia, tingkat pendidikan. */
export async function muatDemografi() {
  const [terbaru, usia, pendidikan] = await Promise.all([
    getKependudukanTerbaru(),
    getDistribusiUsia(),
    getTingkatPendidikan(),
  ]);

  const total = terbaru?.totalPenduduk ?? 0;
  const persen = (n: number) => (total > 0 ? ((n / total) * 100).toFixed(1) : '0');

  const statistik = terbaru
    ? [
        {
          id: 'total',
          label: 'Total Populasi',
          nilai: angka(terbaru.totalPenduduk),
          keterangan: 'Jiwa Penduduk Terdaftar',
          ikon: 'kelompok',
        },
        {
          id: 'laki-laki',
          label: 'Laki-laki',
          nilai: angka(terbaru.lakiLaki),
          keterangan: `${persen(terbaru.lakiLaki)}% dari total populasi`,
          ikon: 'lakiLaki',
        },
        {
          id: 'perempuan',
          label: 'Perempuan',
          nilai: angka(terbaru.perempuan),
          keterangan: `${persen(terbaru.perempuan)}% dari total populasi`,
          ikon: 'perempuan',
        },
      ]
    : demografiStatis.statistik;

  return {
    judul: demografiStatis.judul,
    deskripsi: demografiStatis.deskripsi,
    pembaruan: terbaru ? `Update: tahun ${terbaru.tahun}` : demografiStatis.pembaruan,
    statistik,
    distribusiUsia: usia.map((u) => ({
      usia: u.rentang,
      wilayah: u.wilayah,
      lakiLaki: u.lakiLaki,
      perempuan: u.perempuan,
    })),
    catatanTabel: demografiStatis.catatanTabel,
    pendidikan: pendidikan.map((p) => ({ label: p.jenjang, persen: p.persentase })),
    kartuLuas: demografiStatis.kartuLuas, // luas = data geografi; tetap statis di sini
  };
}
