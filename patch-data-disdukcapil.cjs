const fs = require('fs');

// Patch store.ts
let store = fs.readFileSync('src/store.ts', 'utf8');
store = store.replace(
  /data_dukcapil: \{\s*nama_kadis_dukcapil: string;\s*nik_kadis_dukcapil: string;\s*nip_kadis_dukcapil: string;\s*\};/g,
  `data_disdukcapil: {
    nama_kadis_dukcapil: string;
    nik_kadis_dukcapil: string;
    nip_kadis_dukcapil: string;
  };`
);
store = store.replace(
  /data_dukcapil: \{\s*nama_kadis_dukcapil: "",\s*nik_kadis_dukcapil: "",\s*nip_kadis_dukcapil: "",\s*\},/g,
  `data_disdukcapil: {
      nama_kadis_dukcapil: "",
      nik_kadis_dukcapil: "",
      nip_kadis_dukcapil: "",
    },`
);
fs.writeFileSync('src/store.ts', store);

// Patch step-1.tsx
let step1 = fs.readFileSync('src/routes/juknis/step-1.tsx', 'utf8');
step1 = step1.replace(/data_dukcapil/g, 'data_disdukcapil');
fs.writeFileSync('src/routes/juknis/step-1.tsx', step1);

// Patch summary.tsx
let summary = fs.readFileSync('src/routes/juknis/summary.tsx', 'utf8');
// Update the payload construction
summary = summary.replace(
  /data_dukcapil: \{\s*\.\.\.data\.juknis\.data_dukcapil\s*\},/g,
  `data_disdukcapil: {
      kepala_disdukcapil: data.juknis.data_disdukcapil?.nama_kadis_dukcapil || "",
      nip_kepala_disdukcapil: data.juknis.data_disdukcapil?.nip_kadis_dukcapil || "",
      nik_kepala_disdukcapil: data.juknis.data_disdukcapil?.nik_kadis_dukcapil || "",
      alamat_disdukcapil: data.juknis.alamat_disdukcapil || ""
    },`
);

// Update summary item for Kadis Dukcapil
summary = summary.replace(
  /<SummaryItem label="Kadis Dukcapil" value=\{payload\.data_dukcapil\?\.nama_kadis_dukcapil\} \/>/g,
  '<SummaryItem label="Kadis Dukcapil" value={payload.data_disdukcapil?.kepala_disdukcapil} />'
);

// Also update data_opd to match the new schema:
// "kepala_opd": "",
// "nip_kepala_opd": "",
// "nik_kepala_opd": ""
summary = summary.replace(
  /data_opd: \{\s*\.\.\.data\.juknis\.data_opd,\s*nama_opd_caps: data\.juknis\.data_opd\.nama_opd \? data\.juknis\.data_opd\.nama_opd\.toUpperCase\(\) : ""\s*\},/g,
  `data_opd: {
      nama_opd: data.juknis.data_opd.nama_opd || "",
      nama_opd_caps: data.juknis.data_opd.nama_opd ? data.juknis.data_opd.nama_opd.toUpperCase() : "",
      email_opd: data.juknis.data_opd.email_opd || "",
      kepala_opd: data.juknis.data_opd.nama_kepala_opd || "",
      nip_kepala_opd: data.juknis.data_opd.nip_kepala_opd || "",
      nik_kepala_opd: data.juknis.data_opd.nik_kepala_opd || ""
    },`
);

summary = summary.replace(
  /<SummaryItem label="Kepala OPD" value=\{payload\.data_opd\.nama_kepala_opd\} \/>/g,
  '<SummaryItem label="Kepala OPD" value={payload.data_opd.kepala_opd} />'
);

fs.writeFileSync('src/routes/juknis/summary.tsx', summary);

