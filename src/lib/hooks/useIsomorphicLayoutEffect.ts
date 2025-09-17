import { useEffect, useLayoutEffect } from "react";

import { hasDOM } from "@/lib/utils/client.utils";

const useIsomorphicLayoutEffect = hasDOM() ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
