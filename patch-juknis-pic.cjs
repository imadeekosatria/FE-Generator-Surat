const fs = require('fs');
let code = fs.readFileSync('src/routes/juknis/step-3.tsx', 'utf8');

// For PIC Disdukcapil
code = code.replace(
  /<div key=\{idx\} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 border border-outline-variant rounded-md bg-surface-container-lowest relative">/g,
  '<div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-10 pb-4 px-4 border border-outline-variant rounded-md bg-surface-container-lowest relative mt-2">'
);

code = code.replace(
  /type="text"\n\s*required\n\s*placeholder="Tim"/g,
  'type="text"\n                  placeholder="Tim"'
);

fs.writeFileSync('src/routes/juknis/step-3.tsx', code);
