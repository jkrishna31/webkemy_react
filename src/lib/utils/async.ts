type Result<T, E = Error> = { data: T, error: null; } | { data: null; error: E };

export async function attempt<T, E = Error>(promiseOfFn: Promise<T>): Promise<Result<T, E>> {
  try {
    const data = await promiseOfFn;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}
