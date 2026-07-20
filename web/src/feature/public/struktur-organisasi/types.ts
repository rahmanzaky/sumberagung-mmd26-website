export type FotoPerangkat = {
    /** Path di /public. Kosongkan bila foto belum tersedia. */
    src: string;
    alt: string;
};

export type Perangkat = {
    id: string;
    /** Nama jabatan, ditampilkan kapital. */
    jabatan: string;
    /** Nama pejabat. Dikosongkan untuk lembaga seperti BPD. */
    nama?: string;
    /** Keterangan tambahan, mis. kepanjangan singkatan atau nama dusun. */
    keterangan?: string;
    foto: FotoPerangkat;
};

/** Kelompok jabatan, dipakai sebagai penanda pada tampilan HP. */
export type KelompokPerangkat = {
    label: string;
    anggota: Perangkat[];
};

export type StrukturOrganisasi = {
    bpd: Perangkat;
    kepalaDesa: Perangkat;
    sekretaris: Perangkat;
    kasi: Perangkat[];
    kaur: Perangkat[];
    kamituwo: Perangkat[];
};