import React, { useState } from "react";
import { FormContext, PksFormData, initialData } from "../store";

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PksFormData>(initialData);

  const updateData = (section: keyof PksFormData, field: string, value: any) => {
    if (section === "provinsi" || section === "kabupaten" || section === "diskominfo" || section === "provinsi_nama" || section === "kabupaten_nama") {
      setData((prev) => ({ ...prev, [section]: value }));
    } else {
      setData((prev) => ({
        ...prev,
        [section]: {
          ...((prev[section] as object) || {}),
          [field]: value,
        },
      }));
    }
  };

  const updateNestedData = (section: keyof PksFormData, subsection: string, field: string, value: any) => {
    setData((prev) => {
      const sectionData = prev[section] as any;
      
      if (!subsection) {
        return {
          ...prev,
          [section]: {
            ...sectionData,
            [field]: value,
          },
        };
      }

      return {
        ...prev,
        [section]: {
          ...sectionData,
          [subsection]: {
            ...sectionData[subsection],
            [field]: value,
          },
        },
      };
    });
  };

  return (
    <FormContext.Provider value={{ data, updateData, updateNestedData }}>
      {children}
    </FormContext.Provider>
  );
}
