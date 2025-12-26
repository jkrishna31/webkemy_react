import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

import { hasDOM } from "@/lib/utils/client.utils";

function createDebugProxy(contextValue: any, contextName: string) {
  if (process.env.NODE_ENV === "production") {
    return contextValue;
  }

  return new Proxy(contextValue, {
    get(target, prop) {
      const value = target[prop];

      // log access pattern
      console.group(`[${contextName}] Accessing: ${String(prop)}`);
      console.log("Value:", value);
      // console.log('Component:', getCurrentComponent());
      console.trace("Stack trace");
      console.groupEnd();

      // wrap functions to track calls
      if (typeof value === "function") {
        return new Proxy(value, {
          apply(fn, thisArg, args) {
            console.group(`[${contextName}] Accessing: ${String(prop)}`);
            // console.log("Arguments:", args);
            const result = fn.apply(thisArg, args);
            // console.log("Result:", result);
            console.groupEnd();
            return result;
          }
        });
      }

      return value;
    }
  });
}

export function createContextFactory(name: string, options: any = {}) {
  const {
    defaultValue = null,
    middleware = [],
    persist = false,
    persistKey = name.toLowerCase(),
  } = options;

  // create context with display name for DevTools
  const Context = createContext(defaultValue);
  Context.displayName = `${name}Context`;

  function Provider({
    children, initialValue = defaultValue
  }: {
    children: ReactNode, initialValue: any
  }) {
    const [state, setState] = useState(() => {
      if (persist && hasDOM()) {
        const saved = localStorage.getItem(persistKey);
        return saved ? JSON.parse(saved) : initialValue;
      }
      return initialValue;
    });

    const enhancedSetState = useCallback((newState: any) => {
      let finalState = typeof newState === "function" ? newState(state) : newState;

      middleware.forEach((fn: any) => {
        finalState = fn(finalState, state);
      });

      setState(finalState);

      if (persist) {
        localStorage.setItem(persistKey, JSON.stringify(finalState));
      }
    }, [state]);

    const value = useMemo(() => ({
      state,
      actions: {
        setState: enhancedSetState,
        reset: () => enhancedSetState(initialValue),
      },
    }), [enhancedSetState, initialValue, state]);

    // const value = createDebugProxy(value, name);

    return (
      <Context.Provider value={value}>
        {children}
      </Context.Provider>
    );
  }

  function useContextHook() {
    const context = useContext(Context);
    if (context === undefined) {
      throw new Error(
        `use${name} must be used within ${name}Provider`
      );
    }
    return context;
  }

  function useContextSelector(selector: any) {
    const context = useContextHook();
    return useMemo(() => selector(context), [context, selector]);
  }

  return {
    Provider,
    [`use${name}`]: useContextHook,
    [`use${name}Selector`]: useContextSelector,
  };
}
