import { useState } from "react";

export default function useAccordion(mode: "single" | "multiple") {
  const [activeSections, setActiveSections] = useState<Array<number | string>>([]);

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
