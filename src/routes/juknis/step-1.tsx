import React, { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useFormContext } from "../../store";
import { Stepper } from "../../components/Stepper";

export const Route = createFileRoute("/juknis/step-1")({
  component: Step1,
});

function Step1() {
  const { data, updateNestedData } = useFormContext();
  const navigate = useNavigate();

  const [provinsiList, setProvinsiList] = useState<any[]>([]);
  const [kabupatenList, setKabupatenList] = useState<any[]>([]);
  const [loadingProvinsi, setLoadingProvinsi] = useState(true);
  const [loadingKabupaten, setLoadingKabupaten] = useState(false);
  const [checking, setChecking] = useState(false);
  const [errorDialog, setErrorDialog] = useState({ show: false, message: "" });

  useEffect(() => {
    fetch("/api/v1/provinsi/")
      .then((res) => res.json())
      .then((d) => {
        setProvinsiList(Array.isArray(d) ? d : []);
        setLoadingProvinsi(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingProvinsi(false);
      });
  }, []);

  useEffect(() => {
    if (data.juknis.provinsi) {
      setLoadingKabupaten(true);
      fetch(`/api/v1/kabupaten/?provinsi_id=${data.juknis.provinsi}`)
        .then((res) => res.json())
        .then((d) => {
          setKabupatenList(Array.isArray(d) ? d : []);
          setLoadingKabupaten(false);
        })
        .catch((err) => {
          console.error(err);
          setLoadingKabupaten(false);
        });
    } else {
      setKabupatenList([]);
    }
  }, [data.juknis.provinsi]);

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setChecking(true);
    setErrorDialog({ show: false, message: "" });

    try {
      const username = import.meta.env.VITE_API_USERNAME || '';
      const password = import.meta.env.VITE_API_PASSWORD || '';
      const authHeader = `Basic ${btoa(`${username}:${password}`)}`;
      
      const opd = encodeURIComponent(data.juknis.data_opd.nama_opd);
      const kabupaten = encodeURIComponent(data.juknis.kabupaten_nama);
      const provinsi = encodeURIComponent(data.juknis.provinsi_nama);
      
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
      
      const resItem = Array.isArray(resData) && resData.length > 0 ? resData[0] : resData;
      if (resItem.tujuan_pemanfaatan) {
        updateNestedData("juknis", "", "tujuan_pks", resItem.tujuan_pemanfaatan);
      }
      if (resItem.elemen_data && Array.isArray(resItem.elemen_data)) {
        updateNestedData("juknis", "", "elemen_data", resItem.elemen_data);
      }

      navigate({ to: "/juknis/step-2" });
    } catch (err: any) {
      console.error("Error checking OPD:", err);
      setErrorDialog({
        show: true,
        message: err.message || "Terjadi kesalahan saat memeriksa data persetujuan P1. Pastikan API berjalan atau lewati pengecekan ini jika dalam mode pengembangan."
      });
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-6">
      <div className="w-full max-w-3xl mb-4 text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">
          Informasi Instansi & Wilayah (Juknis)
        </h2>
        <p className="text-sm text-on-surface-variant mb-6">
          Langkah 1 dari 3: Lengkapi data instansi dan lokasi untuk pembuatan Juknis.
        </p>
        <Stepper type="juknis" currentStep={1} />
      </div>

      <div className="w-full max-w-3xl bg-surface-container-lowest border border-outline-variant rounded-md overflow-hidden institutional-shadow p-6">
        <form onSubmit={handleNext} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="provinsi" className="text-sm font-medium text-on-surface">
                Provinsi
              </label>
              <select
                id="provinsi"
                required
                value={data.juknis.provinsi}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const selectedName = provinsiList.find((p: any) => p.id === selectedId)?.nama || "";
                  updateNestedData("juknis", "", "provinsi", selectedId);
                  updateNestedData("juknis", "", "provinsi_nama", selectedName);
                  updateNestedData("juknis", "", "kabupaten", "");
                  updateNestedData("juknis", "", "kabupaten_nama", "");
                }}
                disabled={loadingProvinsi}
                className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10 appearance-none disabled:opacity-50"
              >
                <option value="" disabled>
                  {loadingProvinsi ? "Memuat..." : "Pilih Provinsi"}
                </option>
                {provinsiList.map((prov) => (
                  <option key={prov.id} value={prov.id}>
                    {prov.nama}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="kabupaten" className="text-sm font-medium text-on-surface">
                Kabupaten/Kota
              </label>
              <select
                id="kabupaten"
                value={data.juknis.kabupaten}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const selectedName = kabupatenList.find((k: any) => k.id === selectedId)?.nama || "";
                  updateNestedData("juknis", "", "kabupaten", selectedId);
                  updateNestedData("juknis", "", "kabupaten_nama", selectedName);
                }}
                disabled={!data.juknis.provinsi || loadingKabupaten}
                className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10 appearance-none disabled:opacity-50"
              >
                <option value="" disabled>
                  {!data.juknis.provinsi ? "Pilih Provinsi Dulu" : loadingKabupaten ? "Memuat..." : "Pilih Kabupaten/Kota"}
                </option>
                {kabupatenList.map((kab) => (
                  <option key={kab.id} value={kab.id}>
                    {kab.nama}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="nama_opd" className="text-sm font-medium text-on-surface">
              Nama OPD
            </label>
            <input
              id="nama_opd"
              type="text"
              required
              placeholder="Contoh: Dinas Kesehatan"
              value={data.juknis.data_opd.nama_opd}
              onChange={(e) => updateNestedData("juknis", "data_opd", "nama_opd", e.target.value)}
              className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
            />
          </div>

                    <div className="flex flex-col gap-1.5">
            <label htmlFor="email_opd" className="text-sm font-medium text-on-surface">
              Email OPD
            </label>
            <input
              id="email_opd"
              type="email"
              required
              placeholder="Contoh: dinkes@daerah.go.id"
              value={data.juknis.data_opd.email_opd}
              onChange={(e) => updateNestedData("juknis", "data_opd", "email_opd", e.target.value)}
              className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
            />
          </div>
          
          <hr className="border-surface-container-high my-2" />
          <h3 className="font-headline-sm text-headline-sm text-primary">Data Kepala OPD</h3>
          
          <div className="flex flex-col gap-1.5">
            <label htmlFor="nama_kepala_opd" className="text-sm font-medium text-on-surface">
              Nama Kepala OPD
            </label>
            <input
              id="nama_kepala_opd"
              type="text"
              required
              placeholder="Nama Lengkap beserta gelar"
              value={data.juknis.data_opd.nama_kepala_opd || ""}
              onChange={(e) => updateNestedData("juknis", "data_opd", "nama_kepala_opd", e.target.value)}
              className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="nik_kepala_opd" className="text-sm font-medium text-on-surface">
                NIK Kepala OPD
              </label>
              <input
                id="nik_kepala_opd"
                type="text"
                placeholder="16 digit NIK (Opsional)"
                value={data.juknis.data_opd.nik_kepala_opd || ""}
                onChange={(e) => updateNestedData("juknis", "data_opd", "nik_kepala_opd", e.target.value.replace(/\D/g, ""))}
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
                placeholder="18 digit NIP"
                value={data.juknis.data_opd.nip_kepala_opd || ""}
                onChange={(e) => updateNestedData("juknis", "data_opd", "nip_kepala_opd", e.target.value.replace(/\D/g, ""))}
                className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
              />
            </div>
          </div>

          <hr className="border-surface-container-high my-2" />
          <h3 className="font-headline-sm text-headline-sm text-primary">Data Dinas Dukcapil</h3>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="nama_kadis_dukcapil" className="text-sm font-medium text-on-surface">
              Nama Kepala Dinas Dukcapil
            </label>
            <input
              id="nama_kadis_dukcapil"
              type="text"
              required
              placeholder="Nama Lengkap beserta gelar"
              value={data.juknis.data_disdukcapil?.nama_kadis_dukcapil || ""}
              onChange={(e) => updateNestedData("juknis", "data_disdukcapil", "nama_kadis_dukcapil", e.target.value)}
              className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="nik_kadis_dukcapil" className="text-sm font-medium text-on-surface">
                NIK Kepala Dinas Dukcapil
              </label>
              <input
                id="nik_kadis_dukcapil"
                type="text"
                placeholder="16 digit NIK (Opsional)"
                value={data.juknis.data_disdukcapil?.nik_kadis_dukcapil || ""}
                onChange={(e) => updateNestedData("juknis", "data_disdukcapil", "nik_kadis_dukcapil", e.target.value.replace(/\D/g, ""))}
                className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="nip_kadis_dukcapil" className="text-sm font-medium text-on-surface">
                NIP Kepala Dinas Dukcapil
              </label>
              <input
                id="nip_kadis_dukcapil"
                type="text"
                required
                placeholder="18 digit NIP"
                value={data.juknis.data_disdukcapil?.nip_kadis_dukcapil || ""}
                onChange={(e) => updateNestedData("juknis", "data_disdukcapil", "nip_kadis_dukcapil", e.target.value.replace(/\D/g, ""))}
                className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
              />
            </div>
          </div>


          <div className="flex flex-col gap-1.5">
            <label htmlFor="alamat_disdukcapil" className="text-sm font-medium text-on-surface">
              Alamat Kantor Disdukcapil
            </label>
            <textarea
              id="alamat_disdukcapil"
              rows={3}
              required
              placeholder="Alamat lengkap instansi Disdukcapil..."
              value={data.juknis.alamat_disdukcapil}
              onChange={(e) => updateNestedData("juknis", "", "alamat_disdukcapil", e.target.value)}
              className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest resize-y"
            ></textarea>
          </div>

          <div className="pt-6 flex justify-end gap-3 border-t border-surface-container-high mt-2">
            <button
              type="button"
              onClick={() => navigate({ to: "/" })}
              className="bg-transparent text-sm text-on-surface-variant hover:text-primary font-medium px-6 py-2 rounded transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-primary text-on-primary hover:bg-primary-container text-sm font-medium px-6 py-2 rounded flex items-center gap-2 transition-colors"
            >
              Lanjut
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        </form>
        </div>
      {errorDialog.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 max-w-md w-full shadow-lg">
            <div className="flex items-center gap-2 mb-2 text-error">
              <AlertCircle size={24} />
              <h3 className="text-lg font-semibold">Peringatan</h3>
            </div>
            <p className="text-sm text-on-surface-variant whitespace-pre-line mb-6">
              {errorDialog.message}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setErrorDialog({ show: false, message: "" });
                  navigate({ to: "/juknis/step-2" }); // Allow bypass in case API fails
                }}
                className="px-4 py-2 border border-outline-variant text-on-surface-variant text-sm font-medium rounded-md hover:bg-surface-container transition-colors"
              >
                Tetap Lanjut
              </button>
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
