import { useEffect, useRef } from "react";

export default function usePrevious<T>(value: T): T | undefined {
  const previousValueRef = useRef<{ previous?: T; current: T }>({ current: value });

  useEffect(() => {
    previousValueRef.current = { previous: previousValueRef.current.current, current: value };
  }, [value]);

  return previousValueRef.current.previous;
}
