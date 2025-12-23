import { useState } from "react";

export function useAccordion(mode: "single" | "multiple", defaultActive?: Array<number | string>) {
  const [activeSections, setActiveSections] = useState<Array<number | string>>(defaultActive ?? []);

  const updateAccordion = (key: string) => {
    setActiveSections(currActiveSec => {
      if (currActiveSec.includes(key)) {
        return mode === "single" ? [] : [...currActiveSec.filter(item => item !== key)];
      } else {
        return mode === "single" ? [key] : [...currActiveSec, key];
      }
    });
  };

  return { activeSections, updateAccordion };
}
