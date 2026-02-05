import { useEffect, useState } from "react";

export function useMediaDevices() {
  const [devices, setDevices] = useState<Omit<MediaDeviceInfo, "toJSON">[]>([]);

  useEffect(() => {
    const handleDeviceChange = (e?: Event) => {
      // console.log("=== device change event ===", e);
      navigator.mediaDevices.enumerateDevices().then(_devices => {
        setDevices(_devices.map(item => ({
          deviceId: item.deviceId,
          groupId: item.groupId,
          kind: item.kind,
          label: item.label,
        })));
      });
    };

    navigator.mediaDevices.addEventListener("devicechange", handleDeviceChange);
    handleDeviceChange();

    return () => {
      navigator.mediaDevices.removeEventListener("devicechange", handleDeviceChange);
    };
  }, []);

  return devices;
}
