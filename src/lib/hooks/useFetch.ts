import { AxiosError } from "axios";
import { useCallback, useEffect, useReducer, useRef } from "react";

type State<T> =
  | { data: null; isLoading: boolean; error: null }
  | { data: null; isLoading: boolean; error: AxiosError }
  | { data: T; isLoading: boolean; error: null };

type Action<T> =
  | { type: "loading" }
  | { type: "success"; data: T }
  | { type: "error"; error: AxiosError };

export interface UseFetchOptions extends RequestInit {
  fetchOnMount?: boolean
  onResponse?: (res: Response) => void
}

const useFetch = <T>(
  url: string,
  {
    fetchOnMount = true,
    onResponse,
    ...options
  }: UseFetchOptions,
) => {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    isLoading: false,
    error: null,
  });
  const controller = useRef<AbortController | null>(null);

  function reducer(_: State<T>, action: Action<T>) {
    switch (action.type) {
      case "loading":
        return {
          isLoading: true, data: null, error: null,
        };
      case "success":
        return {
          data: action.data, isLoading: false, error: null,
        };
      case "error":
        return {
          data: null, isLoading: false, error: action.error,
        };
      default:
        throw new Error("Unknown action type");
    }
  }

  const refetch = useCallback(async () => {
    if (controller.current) {
      controller.current.abort();
    }
    controller.current = new AbortController();
    try {
      dispatch({ type: "loading" });
      const response = await fetch(url, { signal: controller.current.signal, ...options });
      onResponse?.(response);
      const data = await response.json(); // other parsers - text, blob, arrayBuffer, formData
      dispatch({ type: "success", data });
    } catch (error: any) {
      dispatch({ type: "error", error });
    }
  }, [onResponse, options, url]);

  const abort = useCallback(() => {
    if (controller.current) {
      controller.current.abort("");
    }
  }, []);

  useEffect(() => {
    if (fetchOnMount) {
      refetch();
    }
    return () => {
      abort();
    };
  }, [abort, fetchOnMount, refetch, url]);

  return {
    state, abort, refetch,
  };
};

export default useFetch;
