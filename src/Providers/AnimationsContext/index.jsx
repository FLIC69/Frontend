
"use client";

import { createContext, useContext } from "react";

const AnimationContext = createContext<Context>({});

export function AnimationProvider({
  children,
}) {
  return (
    <AnimationContext.Provider value={{}}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimationContext() {
  return useContext(AnimationContext);
}
