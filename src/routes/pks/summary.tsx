import React, { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useFormContext } from "../../store";
import { FileText, ChevronDown, ChevronUp, CheckCircle, AlertCircle, Copy, Check } from "lucide-react";

export const Route = createFileRoute("/pks/summary")({
  component: Summary,
});

function Summary() {
  const { data } = useFormContext();
  const navigate = useNavigate();
  const [showJson, setShowJson] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; message?: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const getWilayahName = () => {
    if (data.kabupaten_nama) {
      return `Kabupaten ${data.kabupaten_nama}`;
    } else if (data.provinsi_nama) {
      return `Provinsi ${data.provinsi_nama}`;
    }
    return "";
  };

  const formatDateIndo = (dateStr: string) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;
    const [year, month, day] = parts;
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}`;
  };

  const payload: any = {
    wilayah: getWilayahName(),
    data_opd: data.data_opd,
    data_dukcapil: data.data_dukcapil,
    data_pks: {
      waktu_pks: data.data_pks.waktu_pks,
      lokasi_pks: data.data_pks.lokasi_pks,
      tujuan_pks: data.data_pks.tujuan_pks,
      surat_persetujuan_dirjen: {
        ...data.data_pks.surat_persetujuan_dirjen,
        tanggal_surat_dirjen: formatDateIndo(data.data_pks.surat_persetujuan_dirjen.tanggal_surat_dirjen)
      },
      data_balikan: data.data_pks.data_balikan,
      jenis_layanan: data.data_pks.jenis_layanan,
    },
    diskominfo: data.diskominfo,
  };

  if (data.data_pks.jenis_layanan === "WEB_SERVICE") {
    payload.data_pks.web_services = data.data_pks.web_services;
  } else if (data.data_pks.jenis_layanan === "WEB_PORTAL") {
    payload.data_pks.web_portal = data.data_pks.web_portal;
  } else if (data.data_pks.jenis_layanan === "IKD") {
    payload.data_pks.ikd = data.data_pks.ikd;
  }

  const handleGenerate = async () => {
    setGenerating(true);
    setResult(null);
    try {
      const res = await fetch("/api/generate-pks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) {
        let errorMsg = `Error code: ${res.status}`;
        try {
          const errText = await res.text();
          try {
            const errJson = JSON.parse(errText);
            errorMsg = errJson.detail || errJson.message || errorMsg;
          } catch (e) {
            errorMsg = errText || errorMsg;
          }
        } catch (e) {
          // Ignore
        }
        throw new Error(errorMsg);
      }
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Draft_PKS_${payload.wilayah ? payload.wilayah.replace(/\s+/g, "_") : "Dokumen"}.docx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
      
      setResult({ success: true, message: "PKS berhasil di-generate dan diunduh!" });
    } catch (error: any) {
      setResult({ success: false, message: error.message || "Terjadi kesalahan saat generate PKS" });
    } finally {
      setGenerating(false);
    }
  };

  const SummaryItem = ({ label, value }: { label: string; value: string | undefined }) => (
    <div className="py-2 border-b border-surface-container-high last:border-0 flex flex-col sm:flex-row sm:justify-between gap-1">
      <span className="text-sm font-medium text-on-surface-variant sm:w-1/3">{label}</span>
      <span className="text-sm text-on-surface sm:w-2/3">{value || "-"}</span>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center mt-6">
      <div className="w-full max-w-3xl mb-4 text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">
          Ringkasan Dokumen
        </h2>
        <p className="text-sm text-on-surface-variant mb-6">
          Periksa kembali data PKS yang telah Anda masukkan.
        </p>
      </div>

      <div className="w-full max-w-3xl bg-surface-container-lowest border border-outline-variant rounded-md overflow-hidden institutional-shadow p-6 mb-6">
        <h3 className="font-headline-sm text-headline-sm text-primary mb-4 border-b border-surface-container-high pb-2">
          Detail OPD & Dukcapil
        </h3>
        <div className="mb-6">
          <SummaryItem label="Wilayah" value={payload.wilayah} />
          <SummaryItem label="Nama OPD" value={data.data_opd.nama_opd} />
          <SummaryItem label="Nama Kepala OPD" value={data.data_opd.nama_kepala_opd} />
          <SummaryItem label="Alamat OPD" value={data.data_opd.alamat_opd} />
          <SummaryItem label="Nama Kadis Dukcapil" value={data.data_dukcapil.nama_kadis_dukcapil} />
        </div>

        <h3 className="font-headline-sm text-headline-sm text-primary mb-4 border-b border-surface-container-high pb-2">
          Detail PKS
        </h3>
        <div className="mb-6">
          <SummaryItem label="Tujuan PKS" value={data.data_pks.tujuan_pks} />
          <SummaryItem label="Tanggal Mulai" value={formatDateIndo(data.data_pks.waktu_pks.tanggal_mulai)} />
          <SummaryItem label="Tanggal Selesai" value={formatDateIndo(data.data_pks.waktu_pks.tanggal_selesai)} />
          <SummaryItem label="Lokasi PKS" value={data.data_pks.lokasi_pks} />
          <SummaryItem label="Nomor Surat Dirjen" value={data.data_pks.surat_persetujuan_dirjen.no_surat_dirjen} />
          <SummaryItem label="Tanggal Surat Dirjen" value={formatDateIndo(data.data_pks.surat_persetujuan_dirjen.tanggal_surat_dirjen)} />
          <SummaryItem label="Data Balikan" value={data.data_pks.data_balikan} />
          <SummaryItem label="Jenis Layanan" value={data.data_pks.jenis_layanan} />
        </div>
        
        {result && (
          <div className={`p-4 rounded-md mb-6 flex items-start gap-3 ${result.success ? "bg-primary-container text-on-primary-container" : "bg-error-container text-on-error-container"}`}>
            {result.success ? <CheckCircle size={20} className="shrink-0 mt-0.5" /> : <AlertCircle size={20} className="shrink-0 mt-0.5" />}
            <span className="text-sm font-medium">{result.message}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-surface-container-high pt-6 gap-4">
          <button
            type="button"
            onClick={() => navigate({ to: "/pks/step-3" })}
            className="w-full sm:w-auto px-6 py-2 border border-primary text-primary text-sm font-medium rounded-md hover:bg-primary-fixed transition-colors text-center"
          >
            Kembali Edit
          </button>
          
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full sm:w-auto px-6 py-2 bg-primary text-on-primary text-sm font-medium rounded-md hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {generating ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              </span>
            ) : (
              <>
                <FileText size={16} />
                Generate PKS
              </>
            )}
          </button>
        </div>
      </div>

      <div className="w-full">
        <button
          onClick={() => setShowJson(!showJson)}
          className="flex items-center justify-between w-full p-4 bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm hover:bg-surface-container-low transition-colors"
        >
          <span className="font-medium text-sm text-on-surface">Lihat JSON Payload</span>
          {showJson ? <ChevronUp size={20} className="text-on-surface-variant" /> : <ChevronDown size={20} className="text-on-surface-variant" />}
        </button>
        
        {showJson && (
          <div className="mt-2 w-full bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm relative">
            <button
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="absolute top-4 right-4 p-2 bg-surface-container-high hover:bg-surface-container-highest rounded-md transition-colors text-on-surface-variant flex items-center justify-center"
              title="Copy JSON"
            >
              {copied ? <Check size={16} className="text-primary" /> : <Copy size={16} />}
            </button>
            <pre className="bg-surface-container p-4 rounded-md overflow-x-auto text-sm font-mono text-on-surface pt-12">
              {JSON.stringify(payload, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
