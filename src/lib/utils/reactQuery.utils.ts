import { Mutation, Query } from "@tanstack/react-query";
import { AxiosError } from "axios";

let isRefreshing = false;
let isRedirecting = false;
let failedQueue: {
  query?: Query<unknown, unknown, unknown, readonly unknown[]>
  mutation?: Mutation<unknown, unknown, unknown, unknown>
  variables?: unknown
}[] = [];

export const processFailedQueue = () => {
  failedQueue.forEach(({ query, mutation, variables }) => {
    if (mutation) {
      const { options } = mutation;
      mutation.setOptions({ ...options });
      mutation.execute(variables);
    }
    if (query) query.fetch();
  });
  isRefreshing = false;
  failedQueue = [];
};

const refreshTokenAndRetry = async (
  query?: Query<unknown, unknown, unknown, readonly unknown[]>,
  mutation?: Mutation<unknown, unknown, unknown, unknown>,
  variables?: unknown,
) => {
  try {
    if (!isRefreshing) {
      isRefreshing = true;
      failedQueue.push({ query, mutation, variables });
      // const { accessToken, refreshToken: newRefreshToken } = await refreshAccessToken();
      // setAccessToken(accessToken);
      // setRefreshToken(newRefreshToken);
      processFailedQueue();
    } else failedQueue.push({ query, mutation, variables });
  } catch {
    // removeAccessToken();
    // removeRefreshToken();
    if (!isRedirecting) {
      isRedirecting = true;
      window.location.href = "/auth/session-expired";
    }
  }
};

export const errorHandler = (
  error: unknown,
  query?: Query<unknown, unknown, unknown, readonly unknown[]>,
  mutation?: Mutation<unknown, unknown, unknown, unknown>,
  variables?: unknown
) => {
  const { status, data } = (error as AxiosError<any>).response!;

  if (status === 401) {
    if (mutation) refreshTokenAndRetry(undefined, mutation, variables);
    else refreshTokenAndRetry(query);
  } else console.error(data?.message);
};

export const queryErrorHandler = (
  error: Error,
  query: Query<unknown, unknown, unknown, readonly unknown[]>,
) => {
  errorHandler(error, query);
};

export const mutationErrorHandler = (
  error: unknown,
  variables: unknown,
  context: unknown,
  mutation: Mutation<unknown, unknown, unknown, unknown>
) => {
  errorHandler(error, undefined, mutation, variables);
};
