export type BukuTamuEntry = {
  id: string;
  nama: string;
  instansi: string;
  keperluan: string;
  noWhatsapp: string;
  tanggal: string; // YYYY-MM-DD
  jam: string; // HH:mm
};

// Payload untuk menambah tamu baru (POST) — tanpa id (dibuat server).
export type BukuTamuInput = Omit<BukuTamuEntry, 'id'>;
