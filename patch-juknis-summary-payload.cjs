const fs = require('fs');
let code = fs.readFileSync('src/routes/juknis/summary.tsx', 'utf8');

code = code.replace(
  /ip_address: data\.juknis\.ip_address,/,
  'data_dukcapil: {\n      ...data.juknis.data_dukcapil\n    },\n    ip_address: data.juknis.ip_address,'
);

code = code.replace(
  /<SummaryItem label="Nama OPD" value=\{payload\.data_opd\.nama_opd\} \/>/g,
  '<SummaryItem label="Nama OPD" value={payload.data_opd.nama_opd} />\n          <SummaryItem label="Kepala OPD" value={payload.data_opd.nama_kepala_opd} />\n          <SummaryItem label="Kadis Dukcapil" value={payload.data_dukcapil?.nama_kadis_dukcapil} />'
);

fs.writeFileSync('src/routes/juknis/summary.tsx', code);
