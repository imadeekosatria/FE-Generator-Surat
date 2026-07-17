const fs = require('fs');
let code = fs.readFileSync('src/store.ts', 'utf8');

code = code.replace(
  /data_opd: \{\s*nama_opd: string;\s*nama_opd_caps: string;\s*email_opd: string;\s*\};/,
  'data_opd: {\n    nama_opd: string;\n    nama_opd_caps: string;\n    email_opd: string;\n    nama_kepala_opd: string;\n    nik_kepala_opd: string;\n    nip_kepala_opd: string;\n  };\n  data_dukcapil: {\n    nama_kadis_dukcapil: string;\n    nik_kadis_dukcapil: string;\n    nip_kadis_dukcapil: string;\n  };'
);

code = code.replace(
  /data_opd: \{\s*nama_opd: "",\s*nama_opd_caps: "",\s*email_opd: "",\s*\},/,
  'data_opd: {\n      nama_opd: "",\n      nama_opd_caps: "",\n      email_opd: "",\n      nama_kepala_opd: "",\n      nik_kepala_opd: "",\n      nip_kepala_opd: "",\n    },\n    data_dukcapil: {\n      nama_kadis_dukcapil: "",\n      nik_kadis_dukcapil: "",\n      nip_kadis_dukcapil: "",\n    },'
);

fs.writeFileSync('src/store.ts', code);
