# Google Apps Script — Panduan Deploy Manual

File `.gs` di folder ini adalah source backup untuk dua Web App yang digunakan sebagai REST API backend.

## File

| File | Fungsi |
|---|---|
| `bukuTamu.gs` | Endpoint Buku Tamu Digital |
| `pengajuanSurat.gs` | Endpoint Pengajuan Surat + Update Status |

## Cara Deploy

1. Buka [script.google.com](https://script.google.com)
2. Klik **New project**
3. Paste isi file `.gs` ke editor
4. Klik **Deploy > New deployment**
5. Pilih type: **Web App**
6. Atur:
   - **Execute as**: Me (akun Google desa)
   - **Who has access**: Anyone
7. Klik **Deploy** → salin URL Web App yang muncul
8. Tempel URL tersebut ke file `.env.local` di folder `web/`:
   ```
   APPS_SCRIPT_BUKU_TAMU_URL=https://script.google.com/macros/s/...
   APPS_SCRIPT_SURAT_URL=https://script.google.com/macros/s/...
   ```

## Catatan

- Setiap kali kode `.gs` diubah, harus buat **New deployment** (bukan edit deployment lama)
- URL Web App berubah setiap deployment baru — update `.env.local` jika URL berubah
- Format request/response harus sesuai dengan `docs/api-contract.md`
