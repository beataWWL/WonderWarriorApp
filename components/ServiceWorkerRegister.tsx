"use client";

import { useEffect } from "react";

/**
 * Registers /sw.js once the page loads. No UI — mount once near the root.
 * Silent on unsupported browsers and on dev/HTTP origins where SWs are blocked.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    // Defer until after first paint to avoid competing with hydration.
    const register = () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/", updateViaCache: "none" })
        .catch((err) => {
          // Non-fatal: log once for diagnostics.
          console.warn("[sw] registration failed:", err);
        });
    };

    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
  }, []);

  return null;
}
