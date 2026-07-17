const fs = require('fs');
let code = fs.readFileSync('src/components/Footer.tsx', 'utf8');

code = code.replace(
  /PKS Generator Kemendagri/,
  'SIPKS Kemendagri'
);

fs.writeFileSync('src/components/Footer.tsx', code);
