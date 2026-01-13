import { useCallback, useState } from "react";

import { deepClone } from "@/lib/utils/object.utils";

export type TSplitLayout = string | { key: string; children?: TSplitLayout[] };
export type TSplitSection = { size: number; min?: number; max?: number; };

export function useSplitter(layout: TSplitLayout[], initialData?: { [key: string]: TSplitSection }) {
  const [sections, setSections] = useState<{ [key: string]: TSplitSection } | undefined>(initialData);

  const getSectionSize = useCallback((key: string) => {
    return sections?.[key]?.size ?? 100;
  }, [sections]);

  const onResize = useCallback((value: number, path: number[] = [0]) => {
    let splitter = layout;

    const len = path.length;

    if (len > 1) {
      for (let i = 0; i < len; i++) {
        if (i === len - 1) {
          break;
        } else {
          const candidate = splitter[path[i]];
          if (typeof candidate !== "string" && Array.isArray(candidate.children)) splitter = candidate.children;
        }
      }
    }

    const newSections = deepClone(sections);
    const total = splitter.reduce((acc, curr) => {
      return acc + getSectionSize(typeof curr === "string" ? curr : curr.key);
    }, 0);
    const ratio = splitter.map(curr => {
      return (getSectionSize(typeof curr === "string" ? curr : curr.key) / total) * 100;
    });
    const prefixSum: number[] = [];

    ratio.forEach((_, idx) => {
      prefixSum[idx] = !idx ? 0 : prefixSum[idx - 1] + ratio[idx - 1];
    });

    const finalSize = value - prefixSum[path[len - 1]];
    const currSize = ratio[path[len - 1]];
    ratio[path[len - 1]] = finalSize;
    ratio[path[len - 1] + 1] = (currSize - finalSize) + ratio[path[len - 1] + 1];

    for (let i = 0; i < splitter.length; i++) {
      const sec = splitter[i];
      const key = typeof sec === "string" ? sec : sec.key;
      if (!newSections[key]) newSections[key] = {};
      newSections[key].size = ratio[i];
    }

    setSections(newSections);
  }, [getSectionSize, layout, sections]);

  return { sections, setSections, onResize, getSectionSize };
}
