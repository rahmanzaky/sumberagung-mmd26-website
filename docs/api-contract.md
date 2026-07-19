# API Contract — Desa Sumberagung

Dokumen ini mendefinisikan kontrak JSON antara frontend (Next.js) dan backend (Google Apps Script Web App).
Semua endpoint diakses **server-side only** dari Next.js (tidak pernah dari browser langsung).

---

## GET Buku Tamu

**URL:** `APPS_SCRIPT_BUKU_TAMU_URL` (dari env)

**Response:**
```json
{
  "data": [
    {
      "id": "string",
      "nama": "string",
      "instansi": "string",
      "keperluan": "string",
      "noWhatsapp": "string",
      "tanggal": "YYYY-MM-DD",
      "jam": "HH:mm"
    }
  ]
}
```

---

## POST Buku Tamu (Tamu Baru)

**URL:** `APPS_SCRIPT_BUKU_TAMU_URL` (sama dengan GET, dibedakan oleh method)

**Request:**
```json
{
  "nama": "string",
  "instansi": "string",
  "keperluan": "string",
  "noWhatsapp": "string",
  "tanggal": "YYYY-MM-DD",
  "jam": "HH:mm"
}
```

**Response:**
```json
{ "success": true, "id": "string" }
```

---

## GET Pengajuan Surat

**URL:** `APPS_SCRIPT_SURAT_URL` (dari env)

**Response:**
```json
{
  "data": [
    {
      "id": "string",
      "nama": "string",
      "nik": "string",
      "jenisSurat": "string",
      "keperluan": "string",
      "status": "Baru" | "Diproses" | "Selesai" | "Ditolak",
      "tanggalPengajuan": "YYYY-MM-DD",
      "tanggalUpdate": "YYYY-MM-DD"
    }
  ]
}
```

---

## POST Update Status Surat

**URL:** `APPS_SCRIPT_SURAT_URL` (sama dengan GET, dibedakan oleh method)

**Request:**
```json
{ "id": "string", "status": "string" }
```

**Response:**
```json
{ "success": true }
```

---

## Catatan

- Nilai `status` yang valid: `"Baru"`, `"Diproses"`, `"Selesai"`, `"Ditolak"`
- Format tanggal selalu `YYYY-MM-DD` (ISO 8601)
- Format jam selalu `HH:mm` (24 jam)
- Field `nik` adalah Nomor Induk Kependudukan (16 digit)

---

## Layanan Baru (Dalam Tahap Pengembangan / TBD)
Kontrak JSON untuk endpoint berikut belum didefinisikan secara resmi dan akan ditambahkan pada iterasi selanjutnya:
- **Kependudukan:** GET/POST data demografi warga.
- **Presensi:** POST *check-in* harian perangkat desa.
- **Konten:** GET/POST update teks profil desa, sejarah desa, dll.
- **Pengguna:** GET/POST hak akses admin.
- **Galeri:** GET/POST daftar gambar dokumentasi kegiatan.
- **Pengaturan:** GET/POST konfigurasi situs web (jam kerja otomatis, dsb).
