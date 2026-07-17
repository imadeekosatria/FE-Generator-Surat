const fs = require('fs');
let code = fs.readFileSync('src/routes/juknis/step-1.tsx', 'utf8');

const targetStr = `      const resItem = Array.isArray(resData) && resData.length > 0 ? resData[0] : resData;
      if (resItem.tujuan_pemanfaatan) {
        updateNestedData("juknis", "", "tujuan_pks", resItem.tujuan_pemanfaatan);
      }`;

const replacementStr = `      const resItem = Array.isArray(resData) && resData.length > 0 ? resData[0] : resData;
      if (resItem.tujuan_pemanfaatan) {
        updateNestedData("juknis", "", "tujuan_pks", resItem.tujuan_pemanfaatan);
      }
      if (resItem.elemen_data && Array.isArray(resItem.elemen_data)) {
        updateNestedData("juknis", "", "elemen_data", resItem.elemen_data);
      }`;

code = code.replace(targetStr, replacementStr);
fs.writeFileSync('src/routes/juknis/step-1.tsx', code);
