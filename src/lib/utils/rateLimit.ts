export const debounce = <T extends (...args: any) => any>(
  callback: T,
  delay: number = 200,
  options: { leading?: boolean, trailing?: boolean } = { leading: false, trailing: true },
) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let isInvoked = false;

  const invoke = () => {
    if (lastArgs) {
      callback(...lastArgs);
      lastArgs = null;
      isInvoked = true;
    }
  };

  const debounced = (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer);
    }

    if (options.leading && !isInvoked) {
      callback(...args);
      isInvoked = true;
    } else {
      lastArgs = args;
    }

    timer = setTimeout(() => {
      if (options.trailing && lastArgs) {
        invoke();
      }
      isInvoked = false;
    }, delay);
  };

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = null;
    lastArgs = null;
    isInvoked = false;
  };

  debounced.flush = () => {
    if (timer) {
      clearTimeout(timer);
      invoke();
      timer = null;
    }
  };

  return debounced;
};

export const throttle = <T extends (...args: any) => void>(callback: T, delay: number = 200) => {
  let lastCallTime = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastThis: any;

  const throttled = function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    const remaining = delay - (now - lastCallTime);

    lastArgs = args;
    lastThis = this;

    if (remaining <= 0 || remaining > delay) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastCallTime = now;
      callback.apply(lastThis, lastArgs);
      lastArgs = lastThis = null;
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastCallTime = Date.now();
        timeoutId = null;
        if (lastArgs) {
          callback.apply(lastThis, lastArgs);
          lastArgs = lastThis = null;
        }
      }, remaining);
    }
  };

  throttled.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastArgs = lastThis = null;
    lastCallTime = 0;
  };

  return throttled;

  // let inThrottle: boolean,
  //     lastFn: ReturnType<typeof setTimeout>,
  //     lastTime: number;
  // return (...args: any[]) => {
  //     if (!inThrottle) {
  //         callback.apply(this, args);
  //         lastTime = Date.now();
  //         inThrottle = true;
  //     } else {
  //         clearTimeout(lastFn);
  //         lastFn = setTimeout(() => {
  //             if (Date.now() - lastTime >= delay) {
  //                 callback.apply(this, args);
  //                 lastTime = Date.now();
  //             }
  //         }, Math.max(delay - (Date.now() - lastTime), 0));
  //     }
  // };
};
