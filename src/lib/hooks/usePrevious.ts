import { useEffect, useRef, useState } from "react";

export function usePrevious<T>(value: T): T | undefined {
  const [current, setCurrent] = useState<T>(value);
  const [previous, setPrevious] = useState<T>();

  // const previousValueRef = useRef<{ previous?: T; current: T }>({ current: value });

  // useEffect(() => {
  //   previousValueRef.current = { previous: previousValueRef.current.current, current: value };
  // }, [value]);
  if (value !== current) {
    setPrevious(current);
    setCurrent(value);
  }

  // return previousValueRef.current.previous;
  return previous;
}
