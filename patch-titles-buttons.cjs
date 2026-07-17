const fs = require('fs');

// Patch PKS Step 2
let pks2 = fs.readFileSync('src/routes/pks/step-2.tsx', 'utf8');
pks2 = pks2.replace(/<h2 className="text-2xl font-bold text-on-surface mb-2">\s*Pembuatan Draft PKS\s*<\/h2>/, '<h2 className="text-2xl font-bold text-primary mb-2">\n          Pembuatan Dokumen PKS\n        </h2>');
fs.writeFileSync('src/routes/pks/step-2.tsx', pks2);

// Patch PKS Step 3
let pks3 = fs.readFileSync('src/routes/pks/step-3.tsx', 'utf8');
pks3 = pks3.replace(/<h2 className="text-2xl font-bold text-on-surface mb-2">\s*Data PKS\s*<\/h2>/, '<h2 className="text-2xl font-bold text-primary mb-2">\n          Pembuatan Dokumen PKS\n        </h2>');
pks3 = pks3.replace(/Generate Dokumen\s*<\/button>/, 'Buat PKS\n            </button>');
fs.writeFileSync('src/routes/pks/step-3.tsx', pks3);

// Patch Juknis Step 3
let juknis3 = fs.readFileSync('src/routes/juknis/step-3.tsx', 'utf8');
juknis3 = juknis3.replace(/Lanjut <FileText size=\{16\} \/>\s*<\/button>/, 'Buat Juknis <FileText size={16} />\n            </button>');
fs.writeFileSync('src/routes/juknis/step-3.tsx', juknis3);

console.log("Patched titles and buttons.");
