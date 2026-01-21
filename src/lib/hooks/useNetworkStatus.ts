import { useEffect, useState } from "react";

import { getConnection } from "@/lib/utils/client.utils";

export interface TNetwork {
  online: boolean;
  downlink?: number;
  downlinkMax?: number;
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
  rtt?: number;
  saveData?: boolean;
  type?: "bluetooth" | "cellular" | "ethernet" | "wifi" | "wimax" | "none" | "other" | "unknown";
}

export function useNetwork() {
  const [status, setStatus] = useState<TNetwork>({ online: true });

  useEffect(() => {
    // setStatus({ online: navigator?.onLine, ...getConnection() });

    const handleOnline = () => setStatus({ online: true, ...getConnection() });
    const handleOffline = () => setStatus({ online: false, ...getConnection() });

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return status;
}
