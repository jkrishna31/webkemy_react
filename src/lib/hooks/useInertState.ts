import { useCallback, useRef } from "react";

export function useInertState<T>(initValue?: T) {
  const ref = useRef<T>(initValue);

  const setRef = useCallback((val: T) => {
    ref.current = val;
  }, []);

  return [ref.current, setRef];
}
