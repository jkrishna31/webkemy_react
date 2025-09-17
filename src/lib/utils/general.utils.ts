export const debounce = <T extends (...args: any[]) => any>(
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

export const throttle = <T extends (...args: any[]) => void>(callback: T, delay: number = 200) => {
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

export const isNullish = (val: any): boolean => {
    return val == null;
};

export const isFalsy = (val: any) => {
    return !val;
};

export const isNumber = (value: any) => {
    return typeof value === "number" && !isNaN(value);
};

export const levenshteinDistance = (str1: string, str2: string) => {
    const len1 = str1.length;
    const len2 = str2.length;

    const matrix = Array(len1 + 1);
    for (let i = 0; i <= len1; i++) {
        matrix[i] = Array(len2 + 1);
    }

    for (let i = 0; i <= len1; i++) {
        matrix[i][0] = i;
    }

    for (let i = 0; i <= len2; i++) {
        matrix[0][i] = i;
    }

    for (let i = 0; i <= len1; i++) {
        for (let j = 0; j <= len2; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + 1
                );
            }
        }
    }

    return matrix[len1][len2];
};
