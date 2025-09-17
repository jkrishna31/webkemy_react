import { useCallback, useEffect, useRef, useState } from "react";

// const useMounted = () => {
//   const isMounted = useRef(false);

//   useEffect(() => {
//     isMounted.current = true;
//     return () => {
//       isMounted.current = false;
//     };
//   }, []);

//   return useCallback(() => isMounted.current, []);
// };

const useMounted = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  return isMounted;
};

export default useMounted;
