const fs = require('fs');
let code = fs.readFileSync('src/routes/pks/summary.tsx', 'utf8');

code = code.replace(
  /wilayah: \{ nama_wilayah: getWilayahName\(\), nama_wilayah_caps: getWilayahName\(\)\.toUpperCase\(\) \},/,
  'wilayah: getWilayahName(),'
);

code = code.replace(
  /payload\.wilayah\?\.nama_wilayah \? payload\.wilayah\.nama_wilayah\.replace\(/g,
  'payload.wilayah ? payload.wilayah.replace('
);

code = code.replace(
  /<SummaryItem label="Wilayah" value=\{payload\.wilayah\.nama_wilayah\} \/>/g,
  '<SummaryItem label="Wilayah" value={payload.wilayah} />'
);

fs.writeFileSync('src/routes/pks/summary.tsx', code);
