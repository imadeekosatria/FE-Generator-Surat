import React, { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Stepper } from "../components/Stepper";
import { useFormContext } from "../store";

export const Route = createFileRoute("/")({
  component: Step1,
});

function Step1() {
  const { data, updateData, updateNestedData } = useFormContext();
  const navigate = useNavigate();

  const [provinsiList, setProvinsiList] = useState<{ id: string; nama: string }[]>([]);
  const [kabupatenList, setKabupatenList] = useState<{ id: string; nama: string }[]>([]);
  const [loadingProvinsi, setLoadingProvinsi] = useState(false);
  const [loadingKabupaten, setLoadingKabupaten] = useState(false);

  const [suratQuery, setSuratQuery] = useState(data.data_dukcapil.no_surat_dukcapil);
  const [suratResults, setSuratResults] = useState<{ id?: string; no_surat?: string; nama?: string; nomor_surat_dukcapil?: string; no_surat_dukcapil?: string; nomor_surat?: string }[]>([]);
  const [showSuratDropdown, setShowSuratDropdown] = useState(false);
  const [loadingSurat, setLoadingSurat] = useState(false);

  useEffect(() => {
    setLoadingProvinsi(true);
    fetch("/api/v1/provinsi/")
      .then((res) => res.json())
      .then((resData) => {
        setProvinsiList(Array.isArray(resData) ? resData : []);
      })
      .catch((err) => {
        console.error("Error fetching provinsi:", err);
      })
      .finally(() => {
        setLoadingProvinsi(false);
      });
  }, []);

  useEffect(() => {
    if (data.provinsi) {
      setLoadingKabupaten(true);
      fetch(`/api/v1/kabupaten/?provinsi_id=${data.provinsi}`)
        .then((res) => res.json())
        .then((resData) => {
          setKabupatenList(Array.isArray(resData) ? resData : []);
        })
        .catch((err) => {
          console.error("Error fetching kabupaten:", err);
        })
        .finally(() => {
          setLoadingKabupaten(false);
        });
    } else {
      setKabupatenList([]);
    }
  }, [data.provinsi]);

  useEffect(() => {
    if (!suratQuery || suratQuery === data.data_dukcapil.no_surat_dukcapil) {
      setSuratResults([]);
      setShowSuratDropdown(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoadingSurat(true);
      
      const username = import.meta.env.VITE_API_USERNAME || '';
      const password = import.meta.env.VITE_API_PASSWORD || '';
      const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

      fetch("/api/v1/permohonan-p1/surat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authHeader
        },
        body: JSON.stringify({
          nomor_surat_dukcapil: suratQuery,
          provinsi: data.provinsi,
          kabupaten: data.kabupaten
        })
      })
        .then((res) => res.json())
        .then((resData) => {
          // Check if response is array or has results array
          const results = Array.isArray(resData) ? resData : (resData.results || []);
          setSuratResults(results);
          setShowSuratDropdown(true);
        })
        .catch((err) => console.error("Error fetching surat:", err))
        .finally(() => setLoadingSurat(false));
    }, 500);

    return () => clearTimeout(timer);
  }, [suratQuery, data.data_dukcapil.no_surat_dukcapil, data.provinsi, data.kabupaten]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/step-2" });
  };

  return (
    <div className="w-full flex flex-col items-center mt-6">
      <div className="w-full max-w-3xl mb-4 text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">
          Pembuatan Dokumen PKS
        </h2>
        <p className="text-sm text-on-surface-variant mb-6">
          Lengkapi informasi di bawah ini.
        </p>
        <Stepper currentStep={1} />
      </div>

      <div className="w-full max-w-3xl bg-surface-container-lowest border border-outline-variant rounded-lg p-6 md:p-8 institutional-shadow">
        <div className="border-b border-surface-container-high pb-4 mb-6">
          <h3 className="text-lg font-semibold text-primary">
            Tahap 1: Data Disdukcapil
          </h3>
          <p className="text-sm text-on-surface-variant mt-1">
            Silakan lengkapi informasi kedinasan di bawah ini.
          </p>
        </div>

        <form onSubmit={handleNext} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="provinsi" className="text-sm font-medium text-on-surface">
                Provinsi
              </label>
              <select
                id="provinsi"
                required
                value={data.provinsi}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const selectedName = provinsiList.find((p: any) => p.id === selectedId)?.nama || "";
                  updateData("provinsi", "", selectedId);
                  updateData("provinsi_nama", "", selectedName);
                  updateData("kabupaten", "", "");
                  updateData("kabupaten_nama", "", "");
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
                required
                value={data.kabupaten}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const selectedName = kabupatenList.find((k: any) => k.id === selectedId)?.nama || "";
                  updateData("kabupaten", "", selectedId);
                  updateData("kabupaten_nama", "", selectedName);
                }}
                disabled={!data.provinsi || loadingKabupaten}
                className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10 appearance-none disabled:opacity-50"
              >
                <option value="" disabled>
                  {!data.provinsi ? "Pilih Provinsi Dulu" : loadingKabupaten ? "Memuat..." : "Pilih Kabupaten/Kota"}
                </option>
                {kabupatenList.map((kab) => (
                  <option key={kab.id} value={kab.id}>
                    {kab.nama}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 relative">
            <label htmlFor="no_surat_dukcapil" className="text-sm font-medium text-on-surface">
              Nomor Surat Dukcapil
            </label>
            <input
              id="no_surat_dukcapil"
              type="text"
              required
              placeholder="Ketik untuk mencari nomor surat..."
              value={suratQuery}
              onChange={(e) => {
                setSuratQuery(e.target.value);
                // Also update form context
                updateData("data_dukcapil", "no_surat_dukcapil", e.target.value);
              }}
              onFocus={() => { if (suratResults.length > 0) setShowSuratDropdown(true); }}
              onBlur={() => setTimeout(() => setShowSuratDropdown(false), 200)}
              className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
            />
            {showSuratDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-surface-container-lowest border border-outline-variant rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
                {loadingSurat ? (
                  <div className="px-3 py-2 text-sm text-on-surface-variant">Mencari...</div>
                ) : suratResults.length > 0 ? (
                  suratResults.map((item, idx) => {
                    const label = item.nomor_surat_dukcapil || item.no_surat_dukcapil || item.nomor_surat || item.no_surat || item.nama || String(item.id || item);
                    return (
                      <div
                        key={idx}
                        className="px-3 py-2 text-sm text-on-surface hover:bg-surface-container cursor-pointer"
                        onMouseDown={() => {
                          setSuratQuery(label);
                          updateData("data_dukcapil", "no_surat_dukcapil", label);
                          setShowSuratDropdown(false);
                        }}
                      >
                        {label}
                      </div>
                    );
                  })
                ) : (
                  <div className="px-3 py-2 text-sm text-on-surface-variant">Tidak ditemukan</div>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="nama_kadis_dukcapil" className="text-sm font-medium text-on-surface">
                Nama Kepala Dinas
              </label>
              <input
                id="nama_kadis_dukcapil"
                type="text"
                required
                placeholder="Nama Lengkap beserta Gelar"
                value={data.data_dukcapil.nama_kadis_dukcapil}
                onChange={(e) => updateData("data_dukcapil", "nama_kadis_dukcapil", e.target.value)}
                className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="nip_kadis_dukcapil" className="text-sm font-medium text-on-surface">
                NIP Kepala Dinas
              </label>
              <input
                id="nip_kadis_dukcapil"
                type="text"
                required
                maxLength={18}
                pattern="\d{18}"
                placeholder="18 Digit NIP"
                value={data.data_dukcapil.nip_kadis_dukcapil}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  updateData("data_dukcapil", "nip_kadis_dukcapil", val);
                }}
                className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="alamat_dukcapil" className="text-sm font-medium text-on-surface">
              Alamat Kantor Dukcapil
            </label>
            <textarea
              id="alamat_dukcapil"
              rows={3}
              required
              placeholder="Alamat lengkap instansi..."
              value={data.data_dukcapil.alamat_dukcapil}
              onChange={(e) => updateData("data_dukcapil", "alamat_dukcapil", e.target.value)}
              className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest resize-y"
            ></textarea>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="diskominfo" className="text-sm font-medium text-on-surface">
              Data Diskominfo Terkait (Opsional)
            </label>
            <input
              id="diskominfo"
              type="text"
              placeholder="Nama instansi Diskominfo jika ada kerjasama"
              value={data.diskominfo}
              onChange={(e) => updateData("diskominfo", "", e.target.value)}
              className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
            />
          </div>

          <div className="pt-6 flex justify-end gap-3 border-t border-surface-container-high mt-2">
            <button
              type="button"
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
    </div>
  );
}
