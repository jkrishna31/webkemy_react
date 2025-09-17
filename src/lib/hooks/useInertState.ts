import { useRef } from "react";

function useInertState<T>(initValue: T) {
  const ref = useRef<T>(initValue);

  const setRef = (val: T) => {
    ref.current = val;
  };

  return [
    ref.current, setRef,
  ];
}

export default useInertState;
