"use client";

import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Returns true when viewport width is below 768px (mobile).
 * SSR-safe — defaults to false on server, syncs on mount.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Pre-mount: assume desktop. After mount, real value.
  return mounted ? isMobile : false;
}
