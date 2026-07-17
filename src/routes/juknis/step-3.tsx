import React, { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useFormContext } from "../../store";
import { FileText, Plus, Trash2 } from "lucide-react";
import { Stepper } from "../../components/Stepper";

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

export const Route = createFileRoute("/juknis/step-3")({
  component: Step3,
});

function Step3() {
  const { data, updateNestedData } = useFormContext();
  const navigate = useNavigate();

  const [elemenList, setElemenList] = useState<any[]>([]);
  const [loadingElemen, setLoadingElemen] = useState(true);

  useEffect(() => {
    fetch("/api/v1/elemen-data/")
      .then((res) => res.json())
      .then((d) => {
        setElemenList(Array.isArray(d) ? d : []);
        setLoadingElemen(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingElemen(false);
      });
  }, []);

  const handleElemenToggle = (namaElemen: string) => {
    const currentElemen = data.juknis.elemen_data || [];
    let newElemen;
    if (currentElemen.includes(namaElemen)) {
      newElemen = currentElemen.filter((e: string) => e !== namaElemen);
    } else {
      newElemen = [...currentElemen, namaElemen];
    }
    updateNestedData("juknis", "", "elemen_data", newElemen);
  };

  useEffect(() => {
    const count = (data.juknis.elemen_data || []).length;
    const countStr = count > 0 ? String(count) : "";
    const terbilangStr = count > 0 ? toTerbilang(count) : "";
    
    if (data.juknis.jumlah_elemen !== countStr) {
      updateNestedData("juknis", "", "jumlah_elemen", countStr);
      updateNestedData("juknis", "", "jumlah_elemen_terbilang", terbilangStr);
    }
  }, [data.juknis.elemen_data, data.juknis.jumlah_elemen, updateNestedData]);

  const addDataBalikan = () => {
    const current = data.juknis.data_balikan || [];
    updateNestedData("juknis", "", "data_balikan", [...current, { nama_data: "" }]);
  };

  const updateDataBalikan = (index: number, val: string) => {
    const current = [...data.juknis.data_balikan];
    current[index] = { nama_data: val };
    updateNestedData("juknis", "", "data_balikan", current);
  };

  const removeDataBalikan = (index: number) => {
    const current = [...data.juknis.data_balikan];
    current.splice(index, 1);
    updateNestedData("juknis", "", "data_balikan", current);
  };

  const handlePicChange = (type: "pic_disdukcapil" | "pic_opd", index: number, field: string, val: string) => {
    const current = [...data.juknis[type]];
    current[index] = { ...current[index], [field]: val };
    updateNestedData("juknis", "", type, current);
  };

  const addPic = (type: "pic_disdukcapil" | "pic_opd") => {
    const current = [...data.juknis[type]];
    updateNestedData("juknis", "", type, [...current, { nama_pic: "", tim_pic: "", no_pic: "" }]);
  };

  const removePic = (type: "pic_disdukcapil" | "pic_opd", index: number) => {
    const current = [...data.juknis[type]];
    current.splice(index, 1);
    updateNestedData("juknis", "", type, current);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/juknis/summary" });
  };

  return (
    <div className="w-full flex flex-col items-center mt-6">
      <div className="w-full max-w-3xl mb-4 text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">
          Elemen Data & Person In Charge (Juknis)
        </h2>
        <p className="text-sm text-on-surface-variant mb-6">
          Langkah 3 dari 3: Pilih elemen data dan tentukan PIC masing-masing instansi.
        </p>
        <Stepper type="juknis" currentStep={3} />
      </div>

      <div className="w-full max-w-3xl bg-surface-container-lowest border border-outline-variant rounded-md overflow-hidden institutional-shadow p-6">
        <form onSubmit={handleNext} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-on-surface">Jumlah Elemen</label>
              <input
                type="number"
                readOnly
                value={data.juknis.jumlah_elemen}
                className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface-variant bg-surface-container h-10"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-on-surface">Terbilang</label>
              <input
                type="text"
                readOnly
                value={data.juknis.jumlah_elemen_terbilang}
                className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface-variant bg-surface-container h-10"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-on-surface mb-2">Elemen Data yang Diakses</label>
            {loadingElemen ? (
              <div className="text-sm text-on-surface-variant">Memuat elemen data...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto border border-outline-variant rounded-md p-4 bg-surface-container-lowest">
                {elemenList.map((elemen) => (
                  <label key={elemen.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(data.juknis.elemen_data || []).includes(elemen.nama_elemen)}
                      onChange={() => handleElemenToggle(elemen.nama_elemen)}
                      className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4"
                    />
                    <span className="text-sm text-on-surface">{elemen.nama_elemen}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <hr className="border-surface-container-high" />

          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-on-surface">Data Balikan</label>
            {data.juknis.data_balikan.map((item: any, idx: number) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="Nama Data Balikan"
                  value={item.nama_data}
                  onChange={(e) => updateDataBalikan(idx, e.target.value)}
                  className="flex-1 border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
                />
                <button
                  type="button"
                  onClick={() => removeDataBalikan(idx)}
                  className="p-2 text-error hover:bg-error-container rounded-md transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addDataBalikan}
              className="self-start flex items-center gap-2 text-sm text-primary hover:text-primary-fixed font-medium mt-1"
            >
              <Plus size={16} /> Tambah Data Balikan
            </button>
          </div>

          <hr className="border-surface-container-high" />

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-on-surface">PIC Dinas Dukcapil</label>
              <button
                type="button"
                onClick={() => addPic("pic_disdukcapil")}
                className="flex items-center gap-1 text-xs text-primary hover:text-primary-fixed font-medium"
              >
                <Plus size={14} /> Tambah PIC
              </button>
            </div>
            {data.juknis.pic_disdukcapil.map((pic: any, idx: number) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-10 pb-4 px-4 border border-outline-variant rounded-md bg-surface-container-lowest relative mt-2">
                {data.juknis.pic_disdukcapil.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePic("pic_disdukcapil", idx)}
                    className="absolute top-2 right-2 text-error hover:bg-error-container p-1 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
                <input
                  type="text"
                  required
                  placeholder="Nama PIC"
                  value={pic.nama_pic}
                  onChange={(e) => handlePicChange("pic_disdukcapil", idx, "nama_pic", e.target.value)}
                  className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary h-10"
                />
                <input
                  type="text"
                  placeholder="Tim"
                  value={pic.tim_pic}
                  onChange={(e) => handlePicChange("pic_disdukcapil", idx, "tim_pic", e.target.value)}
                  className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary h-10"
                />
                <input
                  type="text"
                  required
                  placeholder="No Telp/HP"
                  value={pic.no_pic}
                  onChange={(e) => handlePicChange("pic_disdukcapil", idx, "no_pic", e.target.value.replace(/\D/g, ""))}
                  className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary h-10"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-on-surface">PIC OPD</label>
              <button
                type="button"
                onClick={() => addPic("pic_opd")}
                className="flex items-center gap-1 text-xs text-primary hover:text-primary-fixed font-medium"
              >
                <Plus size={14} /> Tambah PIC
              </button>
            </div>
            {data.juknis.pic_opd.map((pic: any, idx: number) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-10 pb-4 px-4 border border-outline-variant rounded-md bg-surface-container-lowest relative mt-2">
                {data.juknis.pic_opd.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePic("pic_opd", idx)}
                    className="absolute top-2 right-2 text-error hover:bg-error-container p-1 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
                <input
                  type="text"
                  required
                  placeholder="Nama PIC"
                  value={pic.nama_pic}
                  onChange={(e) => handlePicChange("pic_opd", idx, "nama_pic", e.target.value)}
                  className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary h-10"
                />
                <input
                  type="text"
                  placeholder="Tim"
                  value={pic.tim_pic}
                  onChange={(e) => handlePicChange("pic_opd", idx, "tim_pic", e.target.value)}
                  className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary h-10"
                />
                <input
                  type="text"
                  required
                  placeholder="No Telp/HP"
                  value={pic.no_pic}
                  onChange={(e) => handlePicChange("pic_opd", idx, "no_pic", e.target.value.replace(/\D/g, ""))}
                  className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary h-10"
                />
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center border-t border-surface-container-high pt-6 gap-4">
            <button
              type="button"
              onClick={() => navigate({ to: "/juknis/step-2" })}
              className="w-full sm:w-auto px-6 py-2 border border-primary text-primary text-sm font-medium rounded-md hover:bg-primary-fixed transition-colors text-center"
            >
              Kembali
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 bg-primary text-on-primary text-sm font-medium rounded-md hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
            >
              Buat Juknis <FileText size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
