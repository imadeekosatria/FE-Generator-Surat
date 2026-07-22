import React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Stepper } from "../../components/Stepper";
import { useFormContext } from "../../store";
import { FileText } from "lucide-react";

function toTerbilang(angka: number): string {
  if (angka === 0) return "";
  const bilangan = [
    "", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"
  ];
  let res = "";
  if (angka < 12) {
    res = bilangan[angka];
  } else if (angka < 20) {
    res = toTerbilang(angka - 10) + " Belas";
  } else if (angka < 100) {
    res = toTerbilang(Math.floor(angka / 10)) + " Puluh " + toTerbilang(angka % 10);
  } else if (angka < 200) {
    res = "Seratus " + toTerbilang(angka - 100);
  } else if (angka < 1000) {
    res = toTerbilang(Math.floor(angka / 100)) + " Ratus " + toTerbilang(angka % 100);
  } else if (angka < 2000) {
    res = "Seribu " + toTerbilang(angka - 1000);
  } else if (angka < 1000000) {
    res = toTerbilang(Math.floor(angka / 1000)) + " Ribu " + toTerbilang(angka % 1000);
  } else if (angka < 1000000000) {
    res = toTerbilang(Math.floor(angka / 1000000)) + " Juta " + toTerbilang(angka % 1000000);
  }
  return res.trim();
}

export const Route = createFileRoute("/pks/step-3")({
  component: Step3,
});

function Step3() {
  const { data, updateNestedData } = useFormContext();
  const navigate = useNavigate();

  const [elemenList, setElemenList] = React.useState<any[]>([]);
  const [loadingElemen, setLoadingElemen] = React.useState(false);

  React.useEffect(() => {
    setLoadingElemen(true);
    fetch("/api/v1/elemen-data/")
      .then((res) => res.json())
      .then((data) => setElemenList(data))
      .catch((err) => console.error("Error fetching elemen data:", err))
      .finally(() => setLoadingElemen(false));
  }, []);

  const handleElemenToggle = (namaElemen: string) => {
    const currentElemen = data.data_pks.elemen_data || [];
    let newElemen;
    if (currentElemen.includes(namaElemen)) {
      newElemen = currentElemen.filter((e) => e !== namaElemen);
    } else {
      newElemen = [...currentElemen, namaElemen];
    }
    updateNestedData("data_pks", "", "elemen_data", newElemen);
  };

  React.useEffect(() => {
    const elemen = data.data_pks.elemen_data || [];
    const count = elemen.length;
    const countStr = count > 0 ? String(count) : "";
    const terbilangStr = count > 0 ? toTerbilang(count) : "";
    const elemenStr = elemen.join(", ");
    
    if (data.data_pks.jenis_layanan === "WEB_SERVICE") {
      if (data.data_pks.web_services.web_services_bil !== countStr || data.data_pks.web_services.web_services_daftar_elemen_string !== elemenStr) {
        updateNestedData("data_pks", "web_services", "web_services_bil", countStr);
        updateNestedData("data_pks", "web_services", "web_services_terbilang", terbilangStr);
        updateNestedData("data_pks", "web_services", "web_services_daftar_elemen_string", elemenStr);
      }
    } else if (data.data_pks.jenis_layanan === "WEB_PORTAL") {
      if (data.data_pks.web_portal.web_portal_bil !== countStr || data.data_pks.web_portal.web_portal_daftar_elemen_string !== elemenStr) {
        updateNestedData("data_pks", "web_portal", "web_portal_bil", countStr);
        updateNestedData("data_pks", "web_portal", "web_portal_terbilang", terbilangStr);
        updateNestedData("data_pks", "web_portal", "web_portal_daftar_elemen_string", elemenStr);
      }
    } else if (data.data_pks.jenis_layanan === "IKD") {
      if (data.data_pks.ikd.ikd_bil !== countStr || data.data_pks.ikd.ikd_daftar_elemen_string !== elemenStr) {
        updateNestedData("data_pks", "ikd", "ikd_bil", countStr);
        updateNestedData("data_pks", "ikd", "ikd_terbilang", terbilangStr);
        updateNestedData("data_pks", "ikd", "ikd_daftar_elemen_string", elemenStr);
      }
    }
  }, [
    data.data_pks.elemen_data,
    data.data_pks.jenis_layanan,
    data.data_pks.web_services.web_services_bil,
    data.data_pks.web_services.web_services_daftar_elemen_string,
    data.data_pks.web_portal.web_portal_bil,
    data.data_pks.web_portal.web_portal_daftar_elemen_string,
    data.data_pks.ikd.ikd_bil,
    data.data_pks.ikd.ikd_daftar_elemen_string,
    updateNestedData
  ]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/pks/summary" });
  };

  const handleBack = () => {
    navigate({ to: "/pks/step-2" });
  };

  return (
    <div className="w-full flex flex-col items-center mt-6">
      <div className="w-full max-w-3xl mb-4 text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">
          Pembuatan Dokumen PKS
        </h2>
        <p className="text-sm text-on-surface-variant mb-6">
          Lengkapi informasi spesifik Perjanjian Kerja Sama.
        </p>
        <Stepper currentStep={3} />
      </div>

      <div className="w-full max-w-3xl bg-surface-container-lowest border border-outline-variant rounded-lg p-6 md:p-8 institutional-shadow">
        <div className="border-b border-surface-container-high pb-4 mb-6">
          <h3 className="text-lg font-semibold text-on-surface">Detail Perjanjian Kerja Sama</h3>
        </div>

        <form onSubmit={handleNext} className="flex flex-col gap-8">
          {/* Section 1: Waktu & Lokasi */}
          <div className="flex flex-col gap-6">
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Waktu & Lokasi</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-on-surface">Tanggal Mulai PKS</label>
                <input
                  type="date"
                  required
                  value={data.data_pks.waktu_pks.tanggal_mulai}
                  onChange={(e) => updateNestedData("data_pks", "waktu_pks", "tanggal_mulai", e.target.value)}
                  className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-on-surface">Tanggal Selesai PKS</label>
                <input
                  type="date"
                  required
                  value={data.data_pks.waktu_pks.tanggal_selesai}
                  onChange={(e) => updateNestedData("data_pks", "waktu_pks", "tanggal_selesai", e.target.value)}
                  className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-on-surface">Jangka Waktu PKS</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 5 (Lima) Tahun"
                  value={data.data_pks.waktu_pks.jangka_waktu}
                  onChange={(e) => updateNestedData("data_pks", "waktu_pks", "jangka_waktu", e.target.value)}
                  className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-on-surface">Lokasi Penandatanganan PKS</label>
              <input
                type="text"
                required
                placeholder="Contoh: Jakarta"
                value={data.data_pks.lokasi_pks}
                onChange={(e) => updateNestedData("data_pks", "", "lokasi_pks", e.target.value)}
                className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-on-surface">Tujuan PKS</label>
              <textarea
                required
                placeholder="Deskripsikan tujuan perjanjian kerja sama ini..."
                rows={3}
                value={data.data_pks.tujuan_pks}
                onChange={(e) => updateNestedData("data_pks", "", "tujuan_pks", e.target.value)}
                className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest resize-y"
              ></textarea>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-on-surface">Data Balikan</label>
              <textarea
                required
                placeholder="Deskripsikan data balikan..."
                rows={2}
                value={data.data_pks.data_balikan}
                onChange={(e) => updateNestedData("data_pks", "", "data_balikan", e.target.value)}
                className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest resize-y"
              ></textarea>
            </div>
          </div>

          <hr className="border-surface-container-high" />

          {/* Section 2: Surat Persetujuan Dirjen */}
          <div className="flex flex-col gap-6">
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Surat Persetujuan Dirjen</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-on-surface">Nomor Surat</label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan nomor surat"
                  value={data.data_pks.surat_persetujuan_dirjen.no_surat_dirjen}
                  onChange={(e) => updateNestedData("data_pks", "surat_persetujuan_dirjen", "no_surat_dirjen", e.target.value)}
                  className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-on-surface">Tanggal Surat</label>
                <input
                  type="date"
                  required
                  value={data.data_pks.surat_persetujuan_dirjen.tanggal_surat_dirjen}
                  onChange={(e) => updateNestedData("data_pks", "surat_persetujuan_dirjen", "tanggal_surat_dirjen", e.target.value)}
                  className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
                />
              </div>
            </div>
          </div>

          <hr className="border-surface-container-high" />

          {/* Section 3: Detail Teknis Layanan */}
          <div className="flex flex-col gap-6">
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Detail Teknis Layanan</h4>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-on-surface">Jenis Layanan Akses Data</label>
              <select
                required
                value={data.data_pks.jenis_layanan}
                onChange={(e) => updateNestedData("data_pks", "", "jenis_layanan", e.target.value)}
                className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest appearance-none h-10"
              >
                <option value="">Pilih Jenis Layanan</option>
                <option value="WEB_SERVICE">Web Service (API)</option>
                <option value="WEB_PORTAL">Web Portal</option>
                <option value="IKD">Identitas Kependudukan Digital (IKD)</option>
              </select>
            </div>

            {data.data_pks.jenis_layanan && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-on-surface">Jumlah Elemen</label>
                    <input
                      type="number"
                      readOnly
                      value={
                        data.data_pks.jenis_layanan === "WEB_SERVICE"
                          ? data.data_pks.web_services.web_services_bil
                          : data.data_pks.jenis_layanan === "WEB_PORTAL"
                            ? data.data_pks.web_portal.web_portal_bil
                            : data.data_pks.ikd.ikd_bil
                      }
                      className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface-variant bg-surface-container h-10"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-on-surface">Terbilang</label>
                    <input
                      type="text"
                      readOnly
                      value={
                        data.data_pks.jenis_layanan === "WEB_SERVICE"
                          ? data.data_pks.web_services.web_services_terbilang
                          : data.data_pks.jenis_layanan === "WEB_PORTAL"
                            ? data.data_pks.web_portal.web_portal_terbilang
                            : data.data_pks.ikd.ikd_terbilang
                      }
                      className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface-variant bg-surface-container h-10"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 mt-6">
                  <label className="text-sm font-medium text-on-surface mb-2">Elemen Data yang Diakses</label>
                  {loadingElemen ? (
                    <div className="text-sm text-on-surface-variant">Memuat elemen data...</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto border border-outline-variant rounded-md p-4 bg-surface-container-lowest">
                      {elemenList.map((elemen) => (
                        <label key={elemen.id} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={(data.data_pks.elemen_data || []).includes(elemen.nama_elemen)}
                            onChange={() => handleElemenToggle(elemen.nama_elemen)}
                            className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4"
                          />
                          <span className="text-sm text-on-surface">{elemen.nama_elemen}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center border-t border-surface-container-high pt-6 gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="w-full sm:w-auto px-6 py-2 border border-primary text-primary text-sm font-medium rounded-md hover:bg-primary-fixed transition-colors text-center"
            >
              Kembali
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 bg-primary text-on-primary text-sm font-medium rounded-md hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
            >
              Buat PKS <FileText size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
