import { useEffect, useEffectEvent, useState } from "react";

export function useMounted() {
  const [isMounted, setIsMounted] = useState(false);

  const updateMountedStatus = useEffectEvent((value: boolean) => {
    setIsMounted(value);
  });

  useEffect(() => {
    updateMountedStatus(true);
    return () => {
      updateMountedStatus(false);
    };
  }, []);

  return isMounted;
}
