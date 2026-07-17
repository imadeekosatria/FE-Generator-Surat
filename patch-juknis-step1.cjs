const fs = require('fs');
let code = fs.readFileSync('src/routes/juknis/step-1.tsx', 'utf8');

const newFields = `          <div className="flex flex-col gap-1.5">
            <label htmlFor="email_opd" className="text-sm font-medium text-on-surface">
              Email OPD
            </label>
            <input
              id="email_opd"
              type="email"
              required
              placeholder="Contoh: dinkes@daerah.go.id"
              value={data.juknis.data_opd.email_opd}
              onChange={(e) => updateNestedData("juknis", "data_opd", "email_opd", e.target.value)}
              className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
            />
          </div>
          
          <hr className="border-surface-container-high my-2" />
          <h3 className="font-headline-sm text-headline-sm text-primary">Data Kepala OPD</h3>
          
          <div className="flex flex-col gap-1.5">
            <label htmlFor="nama_kepala_opd" className="text-sm font-medium text-on-surface">
              Nama Kepala OPD
            </label>
            <input
              id="nama_kepala_opd"
              type="text"
              required
              placeholder="Nama Lengkap beserta gelar"
              value={data.juknis.data_opd.nama_kepala_opd || ""}
              onChange={(e) => updateNestedData("juknis", "data_opd", "nama_kepala_opd", e.target.value)}
              className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="nik_kepala_opd" className="text-sm font-medium text-on-surface">
                NIK Kepala OPD
              </label>
              <input
                id="nik_kepala_opd"
                type="text"
                required
                placeholder="16 digit NIK"
                value={data.juknis.data_opd.nik_kepala_opd || ""}
                onChange={(e) => updateNestedData("juknis", "data_opd", "nik_kepala_opd", e.target.value.replace(/\\D/g, ""))}
                className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="nip_kepala_opd" className="text-sm font-medium text-on-surface">
                NIP Kepala OPD
              </label>
              <input
                id="nip_kepala_opd"
                type="text"
                required
                placeholder="18 digit NIP"
                value={data.juknis.data_opd.nip_kepala_opd || ""}
                onChange={(e) => updateNestedData("juknis", "data_opd", "nip_kepala_opd", e.target.value.replace(/\\D/g, ""))}
                className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
              />
            </div>
          </div>

          <hr className="border-surface-container-high my-2" />
          <h3 className="font-headline-sm text-headline-sm text-primary">Data Dinas Dukcapil</h3>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="nama_kadis_dukcapil" className="text-sm font-medium text-on-surface">
              Nama Kepala Dinas Dukcapil
            </label>
            <input
              id="nama_kadis_dukcapil"
              type="text"
              required
              placeholder="Nama Lengkap beserta gelar"
              value={data.juknis.data_dukcapil?.nama_kadis_dukcapil || ""}
              onChange={(e) => updateNestedData("juknis", "data_dukcapil", "nama_kadis_dukcapil", e.target.value)}
              className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="nik_kadis_dukcapil" className="text-sm font-medium text-on-surface">
                NIK Kepala Dinas Dukcapil
              </label>
              <input
                id="nik_kadis_dukcapil"
                type="text"
                required
                placeholder="16 digit NIK"
                value={data.juknis.data_dukcapil?.nik_kadis_dukcapil || ""}
                onChange={(e) => updateNestedData("juknis", "data_dukcapil", "nik_kadis_dukcapil", e.target.value.replace(/\\D/g, ""))}
                className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="nip_kadis_dukcapil" className="text-sm font-medium text-on-surface">
                NIP Kepala Dinas Dukcapil
              </label>
              <input
                id="nip_kadis_dukcapil"
                type="text"
                required
                placeholder="18 digit NIP"
                value={data.juknis.data_dukcapil?.nip_kadis_dukcapil || ""}
                onChange={(e) => updateNestedData("juknis", "data_dukcapil", "nip_kadis_dukcapil", e.target.value.replace(/\\D/g, ""))}
                className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-lowest h-10"
              />
            </div>
          </div>
`;

code = code.replace(
  /<div className="flex flex-col gap-1\.5">\s*<label htmlFor="email_opd"[\s\S]*?<\/div>/,
  newFields
);

fs.writeFileSync('src/routes/juknis/step-1.tsx', code);
