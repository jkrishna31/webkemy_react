import { useEffect, useLayoutEffect } from "react";

import { hasDOM } from "@/lib/utils/client.utils";

export const useIsomorphicLayoutEffect = hasDOM() ? useLayoutEffect : useEffect;
