import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Settings } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="w-full max-w-4xl flex flex-col items-center mt-4 md:mt-8">
      <div className="w-full mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-medium text-primary mb-2">
          Selamat Datang di SIPKS
        </h2>
        <h3 className="text-xl md:text-2xl font-medium text-primary mb-2">
          Sistem Informasi Perjanjian Kerja Sama
        </h3>
        <h4 className="text-md md:text-lg font-medium text-on-surface-variant mb-3">
          Direktorat Integrasi Data Kependudukan Daerah | Tim Wilayah IV
        </h4>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Pilih jenis dokumen yang ingin Anda generate. Aplikasi ini memfasilitasi pembuatan draf Perjanjian Kerja Sama dan Petunjuk Teknis secara efisien dan terstandarisasi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <Link
          to="/pks/step-1"
          className="flex flex-col items-center p-8 bg-surface-container-lowest border border-outline-variant rounded-xl hover:border-primary hover:shadow-lg transition-all duration-300 group"
        >
          <div className="w-16 h-16 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <FileText size={32} />
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
            Generate PKS
          </h3>
          <p className="text-center font-body-md text-body-md text-on-surface-variant">
            Buat dokumen Perjanjian Kerja Sama (PKS) pemanfaatan data kependudukan.
          </p>
        </Link>

        <Link
          to="/juknis/step-1"
          className="flex flex-col items-center p-8 bg-surface-container-lowest border border-outline-variant rounded-xl hover:border-primary hover:shadow-lg transition-all duration-300 group"
        >
          <div className="w-16 h-16 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Settings size={32} />
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
            Generate Juknis
          </h3>
          <p className="text-center font-body-md text-body-md text-on-surface-variant">
            Buat dokumen Petunjuk Teknis (Juknis) koneksi jaringan dan akses data kependudukan.
          </p>
        </Link>
      </div>
    </div>
  );
}
