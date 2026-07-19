import type { KependudukanDusun } from '@/repository/kependudukan/dto';

const TH =
  'px-4 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider';
const TD_ANGKA = 'px-4 py-3 text-right text-[var(--color-text-muted)] tabular-nums';

function angka(n: number) {
  return n.toLocaleString('id-ID');
}

export default function KependudukanTable({ data }: { data: KependudukanDusun[] }) {
  const totalPer = (pilih: (row: KependudukanDusun) => number) =>
    data.reduce((total, row) => total + pilih(row), 0);

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[var(--color-surface-dark)] text-left">
            <th className={TH}>Dusun</th>
            <th className={`${TH} text-right`}>Jumlah KK</th>
            <th className={`${TH} text-right`}>Laki-laki</th>
            <th className={`${TH} text-right`}>Perempuan</th>
            <th className={`${TH} text-right`}>Total Jiwa</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-50">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="px-4 py-8 text-center text-[var(--color-text-muted)] italic"
              >
                Belum ada data kependudukan.
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id} className="hover:bg-[var(--color-surface)] transition-colors">
                <td className="px-4 py-3 font-medium text-[var(--color-text-base)] whitespace-nowrap">
                  {row.dusun}
                </td>
                <td className={TD_ANGKA}>{angka(row.jumlahKK)}</td>
                <td className={TD_ANGKA}>{angka(row.lakiLaki)}</td>
                <td className={TD_ANGKA}>{angka(row.perempuan)}</td>
                <td className={`${TD_ANGKA} font-semibold text-[var(--color-text-base)]`}>
                  {angka(row.lakiLaki + row.perempuan)}
                </td>
              </tr>
            ))
          )}
        </tbody>
        {data.length > 0 && (
          <tfoot>
            <tr className="bg-[var(--color-surface-dark)] font-semibold text-[var(--color-text-base)]">
              <td className="px-4 py-3">Total Desa</td>
              <td className={`${TD_ANGKA} font-semibold text-[var(--color-text-base)]`}>
                {angka(totalPer((r) => r.jumlahKK))}
              </td>
              <td className={`${TD_ANGKA} font-semibold text-[var(--color-text-base)]`}>
                {angka(totalPer((r) => r.lakiLaki))}
              </td>
              <td className={`${TD_ANGKA} font-semibold text-[var(--color-text-base)]`}>
                {angka(totalPer((r) => r.perempuan))}
              </td>
              <td className={`${TD_ANGKA} font-semibold text-[var(--color-text-base)]`}>
                {angka(totalPer((r) => r.lakiLaki + r.perempuan))}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
