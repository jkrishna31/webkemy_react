import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useQueryParams<
  K extends Record<string, string | number | boolean | unknown>
>(
  replace: boolean = false,
) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateQueryParams = useCallback((
    updates: Partial<{ [T in keyof K]: K[T] | null | undefined }>
  ) => {
    const newStates: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      newStates[key] = value;
    });

    for (const key in updates) {
      const value = updates[key];
      if (value === null || value === undefined || value === "") {
        delete newStates[key];
      } else {
        newStates[key] = String(value);
      }
    }

    const params = new URLSearchParams();
    Object.entries(newStates).forEach(([keyMappings, value]) => {
      if (value !== "" || value != null) {
        params.set(keyMappings, value);
      }
    });

    const action = replace ? router.replace : router.push;
    action(`?${params.toString()}`, { scroll: false });
  }, [replace, router.push, router.replace, searchParams]);

  return {
    queryParams: searchParams,
    updateQueryParams,
  };
}

// page, limit
// sort
// filters
// query
// tab
// drawer
// modal

// arrary format - stringified array; comma separated; multiple key/value pairs with same key (optional [] after key)
// problem with multiple key/value approach - will lose the order of values
