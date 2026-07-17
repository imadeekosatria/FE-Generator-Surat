const fs = require('fs');
let code = fs.readFileSync('src/routes/juknis/step-3.tsx', 'utf8');

const handleElemenRegex = /const handleElemenToggle = \(namaElemen: string\) => \{[\s\S]*?updateNestedData\("juknis", "", "elemen_data", newElemen\);\n  \};/;
const newHandleElemen = `const handleElemenToggle = (namaElemen: string) => {
    const currentElemen = data.juknis.elemen_data || [];
    let newElemen;
    if (currentElemen.includes(namaElemen)) {
      newElemen = currentElemen.filter((e: string) => e !== namaElemen);
    } else {
      newElemen = [...currentElemen, namaElemen];
    }
    updateNestedData("juknis", "", "elemen_data", newElemen);
  };`;

code = code.replace(handleElemenRegex, newHandleElemen);

const checkedRegex = /checked=\{\(data\.juknis\.elemen_data \|\| \[\]\)\.some\(\(item: any\) => item\.nama_elemen === elemen\.nama_elemen\)\}/;
code = code.replace(checkedRegex, 'checked={(data.juknis.elemen_data || []).includes(elemen.nama_elemen)}');

fs.writeFileSync('src/routes/juknis/step-3.tsx', code);
