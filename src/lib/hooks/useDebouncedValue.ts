import { useCallback, useEffect, useRef, useState } from "react";

export interface UseDebouncedValueOptions {
  leading: boolean
}

export default function useDebouncedValue<T>(defaultValue: T, delay: number, options: UseDebouncedValueOptions = { leading: false }) {
  const { leading } = options;

  const [value, setValue] = useState<T>(defaultValue);

  const timeoutRef = useRef<number | null>(null);
  const leadingRef = useRef(true);

  const _clearTimeout = () => window.clearTimeout(timeoutRef.current!);
  useEffect(() => _clearTimeout, []);

  const debouncedSetValue = useCallback(
    (newValue: T) => {
      _clearTimeout();
      if (leadingRef.current && leading) {
        setValue(newValue);
      } else {
        timeoutRef.current = window.setTimeout(() => {
          leadingRef.current = true;
          setValue(newValue);
        }, delay);
      }
      leadingRef.current = false;
    },
    [delay, leading]
  );

  return [value, debouncedSetValue] as const;
}
