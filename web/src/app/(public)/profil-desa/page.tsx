import { redirect } from 'next/navigation';

/** /profil-desa langsung diarahkan ke sub-halaman pertama. */
export default function ProfilDesaPage() {
  redirect('/profil-desa/visi-misi');
}