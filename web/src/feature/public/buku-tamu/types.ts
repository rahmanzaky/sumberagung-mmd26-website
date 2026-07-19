/** Payload yang dikirim saat warga mengisi buku tamu. */
export type BukuTamuPayload = {
    nama: string;
    /** Asal instansi atau alamat tamu (SRS: Asal_Instansi). */
    asal: string;
    keperluan: string;
    /** Nomor WhatsApp tanpa spasi/strip (SRS: No_HP). */
    whatsapp: string;
    /** Format ISO 8601: YYYY-MM-DD */
    tanggal: string;
    /** Format 24 jam: HH:mm */
    jam: string;
};

export type BukuTamuEntry = BukuTamuPayload & {
    id: string;
};

export type BukuTamuListResponse = {
    data: BukuTamuEntry[];
};

/** Status form yang dikembalikan Server Action ke komponen. */
export type BukuTamuFormState = {
    status: 'idle' | 'success' | 'error';
    message: string;
    errors: Partial<Record<keyof BukuTamuPayload | 'kunjungan', string>>;
};

export const initialFormState: BukuTamuFormState = {
    status: 'idle',
    message: '',
    errors: {},
};