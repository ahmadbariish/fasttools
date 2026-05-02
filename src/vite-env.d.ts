/// <reference types="vite/client" />

declare global {
  interface Window {
    /** Google AdSense queue (present when the AdSense script is loaded). */
    adsbygoogle?: unknown[]
  }
}

export {}
