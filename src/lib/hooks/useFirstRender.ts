import { useEffect, useEffectEvent, useState } from "react";

export default function useFirstRender() {
  const [isFirstRender, setIsFirstRender] = useState(true);

  const updateFirstRender = useEffectEvent(() => {
    if (isFirstRender) setIsFirstRender(false);
  });

  useEffect(() => {
    updateFirstRender();
  }, []);

  return isFirstRender;
}
