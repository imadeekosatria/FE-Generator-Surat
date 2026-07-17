const fs = require('fs');
let code = fs.readFileSync('src/components/Header.tsx', 'utf8');

code = code.replace(
  /isPksActive \? 'text-primary border-primary' : 'border-transparent'/g,
  "isPksActive ? 'text-primary border-primary font-medium' : 'border-transparent'"
);

code = code.replace(
  /isJuknisActive \? 'text-primary border-primary' : 'border-transparent'/g,
  "isJuknisActive ? 'text-primary border-primary font-medium' : 'border-transparent'"
);

fs.writeFileSync('src/components/Header.tsx', code);
