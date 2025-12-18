import { useEffect, useMemo, useRef } from "react";

import { throttle } from "@/lib/utils/general.utils";

export default function useThrottledCallback<T extends (...args: any) => any>(cb: T, delay?: number) {
  const cbRef = useRef(cb);

  useEffect(() => {
    cbRef.current = cb;
  }, [cb]);

  const memoizedCallback = useMemo(() => {
    return throttle(
      (...args: Parameters<T>) => {
        cbRef.current(...args);
      },
      delay,
    );
  }, [delay]);

  return memoizedCallback;
}
