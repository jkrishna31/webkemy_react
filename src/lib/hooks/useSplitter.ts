import { useState } from "react";

export default function useSplitter(initSizes: number[] = []) {
  const [sizes, setSizes] = useState<number[]>(initSizes);

  const onResize = (newSize: number, idx: number = 0) => {
    const total = sizes.reduce((acc: number, curr: number) => acc + curr, 0);
    const ratio = sizes.map(item => (item / total) * 100);
    const prefixSum: number[] = [];

    ratio.forEach((_, idx) => {
      prefixSum[idx] = !idx ? 0 : prefixSum[idx - 1] + ratio[idx - 1];
    });

    const finalSize = newSize - prefixSum[idx];
    const currSize = ratio[idx];
    ratio[idx] = finalSize;
    ratio[idx + 1] = (currSize - finalSize) + ratio[idx + 1];

    setSizes(ratio);
  };

  return { sizes, onResize };
}
