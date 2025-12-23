import { useCallback, useRef } from "react";

export function useEvent<T extends Function>(fn: T): T {
  const ref = useRef<T>(null);

  ref.current = fn;

  const memoFn = useCallback<T>(((...args: any) => ref.current?.(...args)) as unknown as T, []);

  return memoFn;
}
