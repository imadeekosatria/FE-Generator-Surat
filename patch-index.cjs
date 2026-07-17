const fs = require('fs');
let code = fs.readFileSync('src/routes/index.tsx', 'utf8');

code = code.replace(
  /<div className="w-full max-w-4xl flex flex-col items-center">/,
  '<div className="w-full max-w-4xl flex flex-col items-center mt-12 md:mt-24">'
);

code = code.replace(
  /<h2 className="font-display-lg text-display-lg text-on-surface mb-stack-sm">\s*Selamat Datang di Generator Dokumen\s*<\/h2>/,
  '<h2 className="text-4xl md:text-5xl font-medium text-on-surface mb-6">\n          Selamat Datang di Generator Dokumen\n        </h2>'
);

fs.writeFileSync('src/routes/index.tsx', code);
