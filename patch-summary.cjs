const fs = require('fs');
let code = fs.readFileSync('src/routes/juknis/summary.tsx', 'utf8');

code = code.replace(
  /<div className="w-full">\s*<button\s*onClick=\{\(\) => setShowJson/g,
  '<div className="w-full max-w-3xl">\n        <button\n          onClick={() => setShowJson'
);

fs.writeFileSync('src/routes/juknis/summary.tsx', code);
