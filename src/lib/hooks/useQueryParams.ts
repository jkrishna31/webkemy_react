import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";

export default function useQueryParams<
  K extends Record<string, string | number | boolean | unknown>
>(replace: boolean = false) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();
  const [internalState, setInternalState] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      initial[key] = value;
    });
    return initial;
  });

  const latestStateRef = useRef(internalState);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathnameRef = useRef(pathname);

  useEffect(() => {
    if (pathnameRef.current !== pathname) {
      pathnameRef.current = pathname;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [pathname]);

  // sync internal state with URL when navigation happens
  useEffect(() => {
    const updated: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      updated[key] = value;
    });
    setInternalState(updated);
    latestStateRef.current = updated;
  }, [searchParams]);

  const syncURL = useCallback(() => {
    const params = new URLSearchParams();
    Object.entries(latestStateRef.current).forEach(([keyMappings, value]) => {
      if (value !== "" || value !== null) {
        params.set(keyMappings, value);
      }
    });
    startTransition(() => {
      const action = replace ? router.replace : router.push;
      action(`?${params.toString()}`, { scroll: false });
    });
  }, [replace, router]);

  const getQueryParam = useCallback(<T extends keyof K>(key: T): K[T] | undefined => {
    const val = internalState[key as string];
    return val !== undefined ? (val as K[T]) : undefined;
  }, [internalState]);

  const setQueryParams = useCallback((
    updates: Partial<{ [T in keyof K]: K[T] | null | undefined }>
  ) => {
    const newStates = { ...latestStateRef.current };
    for (const key in updates) {
      const value = updates[key];
      if (value === null || value === undefined || value === "") {
        delete newStates[key];
      } else {
        newStates[key] = String(value);
      }
    }
    latestStateRef.current = newStates;
    setInternalState(newStates);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      syncURL();
    }, 0);
  }, [syncURL]);

  return {
    queryParams: searchParams,
    setQueryParams,
    getQueryParam,
    isPending,
  };

  // page, limit
  // sort
  // filters
  // query
  // tab
  // drawer
  // modal

  // arrary format - stringified array; comma separated; multiple key/value pairs with same key (optional [] after key)

  // problem with multiple key/value approach - will lose the order of values
}
