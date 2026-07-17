const fs = require('fs');
let code = fs.readFileSync('src/store.ts', 'utf8');

const interfacesToAdd = `
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
`;

code = code.replace('export interface PksFormData {', interfacesToAdd + '\nexport interface PksFormData {\n  juknis: JuknisFormData;');

const initialJuknis = `
  juknis: {
    provinsi: "",
    provinsi_nama: "",
    kabupaten: "",
    kabupaten_nama: "",
    data_opd: {
      nama_opd: "",
      nama_opd_caps: "",
      email_opd: "",
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
`;

code = code.replace('export const initialData: PksFormData = {', 'export const initialData: PksFormData = {\n' + initialJuknis);

code = code.replace(/updateData: \(section: keyof PksFormData, field: string, value: any\) => void;/g, 'updateData: (section: keyof PksFormData | string, field: string, value: any) => void;');
code = code.replace(/updateNestedData: \(section: keyof PksFormData, subsection: string, field: string, value: any\) => void;/g, 'updateNestedData: (section: keyof PksFormData | string, subsection: string, field: string, value: any) => void;');

fs.writeFileSync('src/store.ts', code);
