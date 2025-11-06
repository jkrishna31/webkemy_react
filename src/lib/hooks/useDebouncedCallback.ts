import { useEffect, useMemo, useRef } from "react";

import { debounce } from "@/lib/utils/general.utils";

export interface UseDebouncedCallbackOptions {
  leading: boolean
  trailing: boolean
}

export default function useDebouncedCallback<T extends (...args: any) => any>(cb: T, delay: number, options: UseDebouncedCallbackOptions = { leading: false, trailing: true }) {
  const { leading, trailing } = options;

  const cbRef = useRef(cb);

  useEffect(() => {
    cbRef.current = cb;
  }, [cb]);

  const memoizedCallback = useMemo(() => {
    return debounce((...args: Parameters<T>) => {
      cbRef.current(...args);
    }, delay, { leading, trailing });
  }, [delay, leading, trailing]);

  useEffect(() => {
    return () => {
      memoizedCallback.cancel?.();
    };
  }, [memoizedCallback]);

  return memoizedCallback;
}
