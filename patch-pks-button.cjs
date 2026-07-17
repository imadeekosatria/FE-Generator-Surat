const fs = require('fs');
let code = fs.readFileSync('src/routes/pks/step-3.tsx', 'utf8');

const targetRegex = /<FileText size=\{16\} \/>\s*Buat PKS/;
code = code.replace(targetRegex, 'Buat PKS <FileText size={16} />');

fs.writeFileSync('src/routes/pks/step-3.tsx', code);
