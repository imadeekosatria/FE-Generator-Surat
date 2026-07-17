const fs = require('fs');
let code = fs.readFileSync('src/routes/pks/step-3.tsx', 'utf8');

const targetRegex = /\{data\.data_pks\.jenis_layanan && \([\s\S]*?\}\)\]\)\.includes\(elemen\.nama_elemen\)\}[\s\S]*?\}\)\]\}[\s\S]*?<\/div>\n\s*\}\)\}\n\s*<\/div>\n\s*\}\)\n\s*<\/div>\n\s*<\/div>\n\s*\}\)/;

const exactTarget = code.substring(code.indexOf('{data.data_pks.jenis_layanan && ('), code.indexOf('          {/* Action Buttons */}'));

const newContent = `{data.data_pks.jenis_layanan && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-on-surface">Jumlah Elemen</label>
                    <input
                      type="number"
                      readOnly
                      value={
                        data.data_pks.jenis_layanan === "WEB_SERVICE"
                          ? data.data_pks.web_services.web_services_bil
                          : data.data_pks.jenis_layanan === "WEB_PORTAL"
                            ? data.data_pks.web_portal.web_portal_bil
                            : data.data_pks.ikd.ikd_bil
                      }
                      className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface-variant bg-surface-container h-10"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-on-surface">Terbilang</label>
                    <input
                      type="text"
                      readOnly
                      value={
                        data.data_pks.jenis_layanan === "WEB_SERVICE"
                          ? data.data_pks.web_services.web_services_terbilang
                          : data.data_pks.jenis_layanan === "WEB_PORTAL"
                            ? data.data_pks.web_portal.web_portal_terbilang
                            : data.data_pks.ikd.ikd_terbilang
                      }
                      className="border border-outline-variant rounded-md px-3 py-2 text-sm text-on-surface-variant bg-surface-container h-10"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 mt-6">
                  <label className="text-sm font-medium text-on-surface mb-2">Elemen Data yang Diakses</label>
                  {loadingElemen ? (
                    <div className="text-sm text-on-surface-variant">Memuat elemen data...</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto border border-outline-variant rounded-md p-4 bg-surface-container-lowest">
                      {elemenList.map((elemen) => (
                        <label key={elemen.id} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={(data.data_pks.elemen_data || []).includes(elemen.nama_elemen)}
                            onChange={() => handleElemenToggle(elemen.nama_elemen)}
                            className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4"
                          />
                          <span className="text-sm text-on-surface">{elemen.nama_elemen}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
`;

code = code.replace(exactTarget, newContent);
fs.writeFileSync('src/routes/pks/step-3.tsx', code);
