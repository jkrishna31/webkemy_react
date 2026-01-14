import { useEffect, useRef } from "react";

export default function usePrevious<T>(value: T): T {
  const previousValueRef = useRef<T>(value);

  useEffect(() => {
    previousValueRef.current = value;
  });

  return previousValueRef.current;
}
