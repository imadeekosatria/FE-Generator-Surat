import { createContext, useContext, useState } from "react";

export type Wilayah = "dki_jakarta" | "jawa_barat" | "jawa_tengah" | "jawa_timur" | "";

export interface DataOpd {
  no_surat_opd: string;
  nama_opd: string;
  nama_kepala_opd: string;
  nip_kepala_opd: string;
  jabatan_kepala_opd: string;
  alamat_opd: string;
  bidang_opd: string;
  perda: string;
  jaringan_opd: boolean;
}

export interface DataDukcapil {
  no_surat_dukcapil: string;
  nama_kadis_dukcapil: string;
  nip_kadis_dukcapil: string;
  alamat_dukcapil: string;
}

export interface WaktuPks {
  tanggal_mulai: string;
  tanggal_selesai: string;
}

export interface SuratPersetujuanDirjen {
  no_surat_dirjen: string;
  tanggal_surat_dirjen: string;
  hal_surat_dirjen: string;
}

export interface WebServices {
  web_services_bil: string;
  web_services_terbilang: string;
  web_services_daftar_elemen_string: string;
}

export interface WebPortal {
  web_portal_bil: string;
  web_portal_terbilang: string;
  web_portal_daftar_elemen_string: string;
}

export interface Ikd {
  ikd_bil: string;
  ikd_terbilang: string;
  ikd_daftar_elemen_string: string;
}

export interface DataPks {
  waktu_pks: WaktuPks;
  lokasi_pks: string;
  tujuan_pks: string;
  surat_persetujuan_dirjen: SuratPersetujuanDirjen;
  data_balikan: string;
  jenis_layanan: string;
  elemen_data: string[];
  web_services: WebServices;
  web_portal: WebPortal;
  ikd: Ikd;
  kombinasi?: {
    bil: string;
    terbilang: string;
    daftar_elemen_string: string;
  };
}


export interface Pic {
  nama_pic: string;
  tim_pic: string;
  no_pic: string;
}

export interface JuknisFormData {
  provinsi: string;
  provinsi_nama: string;
  kabupaten: string;
  kabupaten_nama: string;
  data_opd: {
    nama_opd: string;
    nama_opd_caps: string;
    email_opd: string;
    nama_kepala_opd: string;
    nik_kepala_opd: string;
    nip_kepala_opd: string;
  };
  data_disdukcapil: {
    nama_kadis_dukcapil: string;
    nik_kadis_dukcapil: string;
    nip_kadis_dukcapil: string;
  };
  ip_address: string;
  bandwidth: string;
  biaya_jaringan: string;
  estimasi_jaringan_tersambung: string;
  jumlah_elemen: string;
  jumlah_elemen_terbilang: string;
  elemen_data: any[];
  tujuan_pks: string;
  data_balikan: any[];
  pic_disdukcapil: Pic[];
  pic_opd: Pic[];
  alamat_disdukcapil: string;
}

export interface PksFormData {
  juknis: JuknisFormData;
  provinsi: string;
  provinsi_nama: string;
  kabupaten: string;
  kabupaten_nama: string;
  data_opd: DataOpd;
  data_dukcapil: DataDukcapil;
  data_pks: DataPks;
  diskominfo: string;
}

export const initialData: PksFormData = {

  juknis: {
    provinsi: "",
    provinsi_nama: "",
    kabupaten: "",
    kabupaten_nama: "",
    data_opd: {
      nama_opd: "",
      nama_opd_caps: "",
      email_opd: "",
      nama_kepala_opd: "",
      nik_kepala_opd: "",
      nip_kepala_opd: "",
    },
    data_disdukcapil: {
      nama_kadis_dukcapil: "",
      nik_kadis_dukcapil: "",
      nip_kadis_dukcapil: "",
    },
    ip_address: "",
    bandwidth: "",
    biaya_jaringan: "",
    estimasi_jaringan_tersambung: "",
    jumlah_elemen: "",
    jumlah_elemen_terbilang: "",
    elemen_data: [],
    tujuan_pks: "",
    data_balikan: [],
    pic_disdukcapil: [{ nama_pic: "", tim_pic: "", no_pic: "" }],
    pic_opd: [{ nama_pic: "", tim_pic: "", no_pic: "" }],
    alamat_disdukcapil: "",
  },

  provinsi: "",
  provinsi_nama: "",
  kabupaten: "",
  kabupaten_nama: "",
  data_opd: {
    no_surat_opd: "",
    nama_opd: "",
    nama_kepala_opd: "",
    nip_kepala_opd: "",
    jabatan_kepala_opd: "",
    alamat_opd: "",
    bidang_opd: "",
    perda: "",
    jaringan_opd: true,
  },
  data_dukcapil: {
    no_surat_dukcapil: "",
    nama_kadis_dukcapil: "",
    nip_kadis_dukcapil: "",
    alamat_dukcapil: "",
  },
  data_pks: {
    waktu_pks: {
      tanggal_mulai: "",
      tanggal_selesai: "",
    },
    lokasi_pks: "",
    tujuan_pks: "",
    surat_persetujuan_dirjen: {
      no_surat_dirjen: "",
      tanggal_surat_dirjen: "",
      hal_surat_dirjen: "",
    },
    data_balikan: "",
    jenis_layanan: "",
    elemen_data: [],
    web_services: {
      web_services_bil: "",
      web_services_terbilang: "",
      web_services_daftar_elemen_string: "",
    },
    web_portal: {
      web_portal_bil: "",
      web_portal_terbilang: "",
      web_portal_daftar_elemen_string: "",
    },
    ikd: {
      ikd_bil: "",
      ikd_terbilang: "",
      ikd_daftar_elemen_string: "",
    },
  },
  diskominfo: "",
};

export interface FormContextType {
  data: PksFormData;
  updateData: (section: keyof PksFormData | string, field: string, value: any) => void;
  updateNestedData: (section: keyof PksFormData | string, subsection: string, field: string, value: any) => void;
}

export const FormContext = createContext<FormContextType | undefined>(undefined);

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}
