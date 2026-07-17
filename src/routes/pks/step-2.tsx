import React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Stepper } from "../../components/Stepper";
import { useFormContext } from "../../store";

export const Route = createFileRoute("/pks/step-2")({
  component: Step2,
});

function Step2() {
  const { data, updateData, updateNestedData } = useFormContext();
  const navigate = useNavigate();

  const [checking, setChecking] = React.useState(false);
  const [errorDialog, setErrorDialog] = React.useState({ show: false, message: "" });

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setChecking(true);
    
    try {
      const username = import.meta.env.VITE_API_USERNAME || '';
      const password = import.meta.env.VITE_API_PASSWORD || '';
      const authHeader = `Basic ${btoa(`${username}:${password}`)}`;
      
      const opd = encodeURIComponent(data.data_opd.nama_opd);
      const kabupaten = encodeURIComponent(data.kabupaten_nama);
      const provinsi = encodeURIComponent(data.provinsi_nama);
      
      const res = await fetch(`/api/v1/persetujuan-p1/cek/?opd=${opd}&kabupaten=${kabupaten}&provinsi=${provinsi}`, {
        headers: {
          "Authorization": authHeader
        }
      });
      
      const resData = await res.json();
      
      if (!res.ok) {
        throw new Error(resData.detail || resData.message || `Kode error: ${res.status}`);
      }
      
      if (resData.message && resData.message.includes("tidak ditemukan")) {
         setErrorDialog({
           show: true,
           message: `Data tidak ditemukan, Anda tidak dapat melanjutkan tahap ini. Pastikan data sudah benar.\nPesan: ${resData.message}`
         });
         setChecking(false);
         return;
      }
      
      // Auto fill step 3 data
      const resItem = Array.isArray(resData) && resData.length > 0 ? resData[0] : resData;

      if (resItem.tujuan_pemanfaatan) updateData("data_pks", "tujuan_pks", resItem.tujuan_pemanfaatan);
      if (resItem.no_surat_dirjen) updateNestedData("data_pks", "surat_persetujuan_dirjen", "no_surat_dirjen", resItem.no_surat_dirjen);
      if (resItem.tgl_surat_dirjen) updateNestedData("data_pks", "surat_persetujuan_dirjen", "tanggal_surat_dirjen", resItem.tgl_surat_dirjen);
      if (resItem.data_balikan) updateData("data_pks", "data_balikan", resItem.data_balikan);
      
      if (resItem.metode_akses && resItem.metode_akses.length > 0) {
        const metode = resItem.metode_akses[0];
        let mapped = "";
        if (metode === "Web Portal") mapped = "WEB_PORTAL";
        else if (metode === "Web Service") mapped = "WEB_SERVICE";
        else if (metode === "Identitas Kependudukan Digital (IKD)") mapped = "IKD";
        if (mapped) updateData("data_pks", "jenis_layanan", mapped);
      }
      
      if (resItem.elemen_data && Array.isArray(resItem.elemen_data)) {
        updateData("data_pks", "elemen_data", resItem.elemen_data);
      }
      
      navigate({ to: "/pks/step-3" });
    } catch (error: any) {
      setErrorDialog({
        show: true,
        message: `Data tidak ditemukan, Anda tidak dapat melanjutkan tahap ini. Pastikan data sudah benar.\n\nDetail: ${error.message}`
      });
    } finally {
      setChecking(false);
    }
  };

  const handleBack = () => {
    navigate({ to: "/pks/step-1" });
  };

  return (
    <div className="w-full flex flex-col items-center mt-6">
      <div className="w-full max-w-3xl mb-4 text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">
          Pembuatan Dokumen PKS
        </h2>
        <p className="text-sm text-on-surface-variant mb-6">
          Lengkapi informasi Organisasi Perangkat Daerah (OPD) untuk dokumen kerjasama.
        </p>
        <Stepper currentStep={2} />
      </div>

      <div className="w-full max-w-3xl bg-surface-container-lowest border border-outline-variant rounded-lg p-6 md:p-8 institutional-shadow">
        <div className="border-b border-surface-container-high pb-4 mb-6">
          <h3 className="text-lg font-semibold text-on-surface">Informasi Detail OPD</h3>
        </div>

        <form onSubmit={handleNext} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="nama_opd" className="text-sm font-medium text-on-surface">
                Nama OPD
              </label>
              <input
                id="nama_opd"
                type="text"
                required
                placeholder="Cth: Dinas Komunikasi dan Informatika"
                value={data.data_opd.nama_opd}
                onChange={(e) => updateData("data_opd", "nama_opd", e.target.value)}
                className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="no_surat_opd" className="text-sm font-medium text-on-surface">
                Nomor Surat OPD
              </label>
              <input
                id="no_surat_opd"
                type="text"
                required
                placeholder="Masukkan nomor surat"
                value={data.data_opd.no_surat_opd}
                onChange={(e) => updateData("data_opd", "no_surat_opd", e.target.value)}
                className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="nama_kepala_opd" className="text-sm font-medium text-on-surface">
                Nama Kepala OPD
              </label>
              <input
                id="nama_kepala_opd"
                type="text"
                required
                placeholder="Nama lengkap"
                value={data.data_opd.nama_kepala_opd}
                onChange={(e) => updateData("data_opd", "nama_kepala_opd", e.target.value)}
                className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="nip_kepala_opd" className="text-sm font-medium text-on-surface">
                NIP Kepala OPD
              </label>
              <input
                id="nip_kepala_opd"
                type="text"
                required
                maxLength={18}
                pattern="\d{18}"
                placeholder="18 digit NIP"
                value={data.data_opd.nip_kepala_opd}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  updateData("data_opd", "nip_kepala_opd", val);
                }}
                className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="jabatan_kepala_opd" className="text-sm font-medium text-on-surface">
                Jabatan Kepala OPD
              </label>
              <input
                id="jabatan_kepala_opd"
                type="text"
                required
                placeholder="Cth: Kepala Dinas"
                value={data.data_opd.jabatan_kepala_opd}
                onChange={(e) => updateData("data_opd", "jabatan_kepala_opd", e.target.value)}
                className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="alamat_opd" className="text-sm font-medium text-on-surface">
              Alamat OPD
            </label>
            <textarea
              id="alamat_opd"
              required
              placeholder="Alamat lengkap kantor OPD"
              rows={3}
              value={data.data_opd.alamat_opd}
              onChange={(e) => updateData("data_opd", "alamat_opd", e.target.value)}
              className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest resize-y"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="bidang_opd" className="text-sm font-medium text-on-surface">
                Bidang OPD
              </label>
              <input
                id="bidang_opd"
                type="text"
                required
                placeholder="Masukkan Bidang OPD"
                value={data.data_opd.bidang_opd}
                onChange={(e) => updateData("data_opd", "bidang_opd", e.target.value)}
                className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="perda" className="text-sm font-medium text-on-surface">
                Dasar Hukum (Perda)
              </label>
              <input
                id="perda"
                type="text"
                required
                placeholder="Nomor/Tahun Perda"
                value={data.data_opd.perda}
                onChange={(e) => updateData("data_opd", "perda", e.target.value)}
                className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
              />
            </div>
            <div className="flex flex-col gap-1.5 justify-end pb-2">
              <label className="flex items-center cursor-pointer gap-2">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="jaringan_opd"
                    className="sr-only peer"
                    checked={data.data_opd.jaringan_opd}
                    onChange={(e) => updateData("data_opd", "jaringan_opd", e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-outline-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-surface-container-high after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </div>
                <span className="text-sm text-on-surface">
                  OPD Menggunakan Koneksi Sendiri
                </span>
              </label>
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center border-t border-surface-container-high pt-6">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-2 border border-primary text-primary text-sm font-medium rounded-md hover:bg-primary-fixed transition-colors"
            >
              Kembali
            </button>
            <button
              type="submit"
              disabled={checking}
              className="px-6 py-2 bg-primary text-on-primary text-sm font-medium rounded-md hover:bg-primary-container transition-colors disabled:opacity-50"
            >
              {checking ? "Memeriksa Data..." : "Lanjut Tahap 3"}
            </button>
          </div>
        </form>
      </div>

      {errorDialog.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 max-w-md w-full shadow-lg">
            <h3 className="text-lg font-semibold text-error mb-2">Peringatan</h3>
            <p className="text-sm text-on-surface-variant whitespace-pre-line mb-6">
              {errorDialog.message}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setErrorDialog({ show: false, message: "" })}
                className="px-4 py-2 bg-primary text-on-primary text-sm font-medium rounded-md hover:bg-primary-container transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
