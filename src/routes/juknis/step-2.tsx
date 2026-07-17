import React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useFormContext } from "../../store";
import { Stepper } from "../../components/Stepper";

export const Route = createFileRoute("/juknis/step-2")({
  component: Step2,
});

function Step2() {
  const { data, updateNestedData } = useFormContext();
  const navigate = useNavigate();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/juknis/step-3" });
  };

  const handleBack = () => {
    navigate({ to: "/juknis/step-1" });
  };

  return (
    <div className="w-full flex flex-col items-center mt-6">
      <div className="w-full max-w-3xl mb-4 text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">
          Detail Teknis Jaringan (Juknis)
        </h2>
        <p className="text-sm text-on-surface-variant mb-6">
          Langkah 2 dari 3: Masukkan spesifikasi teknis jaringan.
        </p>
        <Stepper type="juknis" currentStep={2} />
      </div>

      <div className="w-full max-w-3xl bg-surface-container-lowest border border-outline-variant rounded-md overflow-hidden institutional-shadow p-6">
        <form onSubmit={handleNext} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="tujuan_pks" className="text-sm font-medium text-on-surface">
              Tujuan PKS
            </label>
            <input
              id="tujuan_pks"
              type="text"
              required
              placeholder="Contoh: Pemanfaatan Data Kependudukan..."
              value={data.juknis.tujuan_pks}
              onChange={(e) => updateNestedData("juknis", "", "tujuan_pks", e.target.value)}
              className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="ip_address" className="text-sm font-medium text-on-surface">
                IP Address
              </label>
              <input
                id="ip_address"
                type="text"
                required
                placeholder="Contoh: 192.168.1.1"
                value={data.juknis.ip_address}
                onChange={(e) => updateNestedData("juknis", "", "ip_address", e.target.value)}
                className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="bandwidth" className="text-sm font-medium text-on-surface">
                Bandwidth
              </label>
              <input
                id="bandwidth"
                type="text"
                required
                placeholder="Contoh: 10 Mbps"
                value={data.juknis.bandwidth}
                onChange={(e) => updateNestedData("juknis", "", "bandwidth", e.target.value)}
                className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="biaya_jaringan" className="text-sm font-medium text-on-surface">
              Biaya Jaringan
            </label>
            <input
              id="biaya_jaringan"
              type="text"
              required
              placeholder="Contoh: Dibebankan pada APBD..."
              value={data.juknis.biaya_jaringan}
              onChange={(e) => updateNestedData("juknis", "", "biaya_jaringan", e.target.value)}
              className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="estimasi_jaringan_tersambung" className="text-sm font-medium text-on-surface">
              Estimasi Jaringan Tersambung
            </label>
            <input
              id="estimasi_jaringan_tersambung"
              type="text"
              required
              placeholder="Contoh: Minggu ke-2 bulan Januari 2024"
              value={data.juknis.estimasi_jaringan_tersambung}
              onChange={(e) => updateNestedData("juknis", "", "estimasi_jaringan_tersambung", e.target.value)}
              className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
            />
          </div>

          <div className="pt-6 flex justify-between gap-3 border-t border-surface-container-high mt-2">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-2 border border-primary text-primary text-sm font-medium rounded-md hover:bg-primary-fixed transition-colors"
            >
              Kembali
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-on-primary text-sm font-medium rounded-md hover:bg-primary-container transition-colors flex items-center gap-2"
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
