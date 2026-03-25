import { useEffect, useMemo, useRef } from "react";

import { throttle } from "@/lib/utils/rateLimit";

export function useThrottledCallback<T extends (...args: any) => any>(cb: T, delay?: number) {
  const cbRef = useRef(cb);

  useEffect(() => {
    cbRef.current = cb;
  }, [cb]);

  const memoizedCallback = useMemo(() => {
    return throttle(
      // eslint-disable-next-line react-hooks/refs
      (...args: Parameters<T>) => {
        cbRef.current(...args);
      },
      delay,
    );
  }, [delay]);

  return memoizedCallback;
}
