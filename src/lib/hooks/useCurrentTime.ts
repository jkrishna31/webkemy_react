import { useEffect, useState } from "react";

export function useCurrentDateTime() {
  const [datetime, setDatetime] = useState(() => new Date());

  useEffect(() => {
    // let timeout: NodeJS.Timeout;

    // const tick = () => {
    //   setDatetime(new Date());

    //   const now = Date.now();
    //   const delay = 1000 - (now % 1000);

    //   timeout = setTimeout(tick, delay);
    // };

    // tick();

    // return () => clearTimeout(timeout);

    const interval = setInterval(() => {
      setDatetime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return datetime;
}
