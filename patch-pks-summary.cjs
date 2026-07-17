const fs = require('fs');
let code = fs.readFileSync('src/routes/pks/summary.tsx', 'utf8');

// Change wilayah object structure
code = code.replace(
  /wilayah: getWilayahName\(\),/,
  'wilayah: { nama_wilayah: getWilayahName(), nama_wilayah_caps: getWilayahName().toUpperCase() },'
);

// Fix the file download string
code = code.replace(
  /payload\.wilayah \? payload\.wilayah\.replace\(/g,
  'payload.wilayah?.nama_wilayah ? payload.wilayah.nama_wilayah.replace('
);

// Fix the SummaryItem
code = code.replace(
  /<SummaryItem label="Wilayah" value=\{payload\.wilayah\} \/>/g,
  '<SummaryItem label="Wilayah" value={payload.wilayah.nama_wilayah} />'
);

fs.writeFileSync('src/routes/pks/summary.tsx', code);
