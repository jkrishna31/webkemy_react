import { useState } from "react";

export function useAccordion<T extends string | number>(mode: "single" | "multiple", defaultActive?: Array<T>) {
  const [activeSections, setActiveSections] = useState<Array<number | string>>(defaultActive ?? []);

  const updateAccordion = (key: T) => {
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
