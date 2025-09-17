import { useCallback, useEffect, useState } from "react";

export default function useNetworkStatus() {
  const [status, setStatus] = useState<"online" | "offline">();

  const handleOnline = useCallback(() => {
    setStatus("online");
  }, []);

  const handleOffline = useCallback(() => {
    setStatus("online");
  }, []);

  useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [handleOffline, handleOnline]);

  return status;
}
