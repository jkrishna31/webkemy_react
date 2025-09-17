import { useCallback, useEffect, useRef, useState } from "react";

export interface UseDebouncedValueOptions {
  leading: boolean
}

export default function useDebouncedValue<T>(defaultValue: T, delay: number, options: UseDebouncedValueOptions = { leading: false }) {
  const [value, setValue] = useState<T>(defaultValue);

  const timeoutRef = useRef<number | null>(null);
  const leadingRef = useRef(true);

  const clearTimeout = () => window.clearTimeout(timeoutRef.current!);
  useEffect(() => clearTimeout, []);

  const debouncedSetValue = useCallback(
    (newValue: T) => {
      clearTimeout();
      if (leadingRef.current && options.leading) {
        setValue(newValue);
      } else {
        timeoutRef.current = window.setTimeout(() => {
          leadingRef.current = true;
          setValue(newValue);
        }, delay);
      }
      leadingRef.current = false;
    },
    [delay, options.leading]
  );

  return [value, debouncedSetValue] as const;
}
