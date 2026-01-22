import { useEffect, useEffectEvent, useRef, useState } from "react";

export function useElementRef<T extends Element>() {
  const ref = useRef<T>(null);
  const [element, setElement] = useState<T | null>(null);

  const updsateElement = useEffectEvent(() => {
    setElement(ref.current);
    return () => setElement(null);
  });

  useEffect(updsateElement);

  return { ref, element };
}
