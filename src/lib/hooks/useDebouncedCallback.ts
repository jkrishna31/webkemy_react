import { useEffect, useMemo, useRef } from "react";

import { debounce } from "@/lib/utils/general.utils";

export interface UseDebouncedCallbackOptions {
  leading: boolean
  trailing: boolean
}

export default function useDebouncedCallback<T extends (...args: any[]) => any>(cb: T, delay: number, options: UseDebouncedCallbackOptions = { leading: false, trailing: true }) {
  const cbRef = useRef(cb);

  useEffect(() => {
    cbRef.current = cb;
  }, [cb]);

  const memoizedCallback = useMemo(() => {
    return debounce((...args: Parameters<T>) => {
      cbRef.current(...args);
    }, delay, { leading: options.leading, trailing: options.trailing });
  }, [delay, options.leading, options.trailing]);

  useEffect(() => {
    return () => {
      memoizedCallback.cancel?.();
    };
  }, [memoizedCallback]);

  return memoizedCallback;
}
