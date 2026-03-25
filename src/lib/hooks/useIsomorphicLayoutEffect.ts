import { useEffect, useLayoutEffect } from "react";

import { hasDOM } from "@/lib/utils/dom";

export const useIsomorphicLayoutEffect = hasDOM() ? useLayoutEffect : useEffect;
