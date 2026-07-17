const fs = require('fs');
let code = fs.readFileSync('src/routes/juknis/step-3.tsx', 'utf8');

// Change label "PIC Dukcapil" to "PIC Dinas Dukcapil"
code = code.replace(
  /<label className="text-sm font-medium text-on-surface">PIC Dukcapil<\/label>/g,
  '<label className="text-sm font-medium text-on-surface">PIC Dinas Dukcapil</label>'
);

// Lock "No Telp/HP" to numbers only for pic_disdukcapil
code = code.replace(
  /onChange=\{\(e\) => handlePicChange\("pic_disdukcapil", idx, "no_pic", e\.target\.value\)\}/g,
  'onChange={(e) => handlePicChange("pic_disdukcapil", idx, "no_pic", e.target.value.replace(/\\D/g, ""))}'
);

// Lock "No Telp/HP" to numbers only for pic_opd
code = code.replace(
  /onChange=\{\(e\) => handlePicChange\("pic_opd", idx, "no_pic", e\.target\.value\)\}/g,
  'onChange={(e) => handlePicChange("pic_opd", idx, "no_pic", e.target.value.replace(/\\D/g, ""))}'
);

fs.writeFileSync('src/routes/juknis/step-3.tsx', code);
