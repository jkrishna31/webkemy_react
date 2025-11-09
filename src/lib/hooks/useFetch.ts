import { AxiosError } from "axios";
import { useCallback, useEffect, useReducer, useRef } from "react";

type State<T> =
  | { response: null; pending: boolean; error: null }
  | { response: null; pending: boolean; error: AxiosError }
  | { response: T; pending: boolean; error: null };

type Action<T> =
  | { type: "pending" }
  | { type: "response"; response: T }
  | { type: "error"; error: AxiosError };

export interface UseFetchOptions extends RequestInit {
  fetchOnMount?: boolean;
  onResponse?: (res: Response) => Promise<any>;
  onError?: (error: any) => Promise<any>;
  onSettled?: any;
}

export default function useFetch<T>(url: string, options: UseFetchOptions) {
  const {
    fetchOnMount = true,
    onResponse, onError, onSettled,
    ...fetchOptions
  } = options;

  const [state, dispatch] = useReducer(reducer, {
    response: null,
    pending: false,
    error: null,
  });
  const controller = useRef<AbortController>(null);

  function reducer(_: State<T>, action: Action<T>) {
    switch (action.type) {
      case "pending":
        return {
          pending: true, response: null, error: null,
        };
      case "response":
        return {
          response: action.response, pending: false, error: null,
        };
      case "error":
        return {
          response: null, pending: false, error: action.error,
        };
      default:
        throw new Error("Unknown action type");
    }
  }

  const request = useCallback(async (body?: any) => {
    try {
      controller.current?.abort();
      controller.current = new AbortController();

      dispatch({ type: "pending" });
      const response = await fetch(url, {
        body,
        signal: controller.current.signal,
        ...fetchOptions,
      });
      onResponse?.(response);
      const data = await (onResponse?.(response) || response.json());
      dispatch({ type: "response", response: data });
    } catch (error: any) {
      dispatch({ type: "error", error });
    }
  }, [fetchOptions, onResponse, url]);

  const abort = useCallback(() => {
    controller.current?.abort("");
  }, []);

  useEffect(() => {
    if (fetchOnMount) request();
    return () => abort();
  }, [abort, fetchOnMount, request]);

  return {
    response: state.response,
    pending: state.pending,
    error: state.error,
    request,
    abort,
  };
}
