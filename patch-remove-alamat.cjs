const fs = require('fs');

let summary = fs.readFileSync('src/routes/juknis/summary.tsx', 'utf8');

summary = summary.replace(
  /\s*alamat_disdukcapil: data\.juknis\.alamat_disdukcapil,/g,
  ''
);
// Make sure summary item references payload.data_disdukcapil.alamat_disdukcapil
summary = summary.replace(
  /<SummaryItem label="Alamat Dukcapil" value=\{payload\.alamat_disdukcapil\} \/>/g,
  '<SummaryItem label="Alamat Dukcapil" value={payload.data_disdukcapil.alamat_disdukcapil} />'
);

fs.writeFileSync('src/routes/juknis/summary.tsx', summary);

