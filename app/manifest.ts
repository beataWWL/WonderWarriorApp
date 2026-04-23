import type { MetadataRoute } from "next";

// Next.js generates /manifest.webmanifest from this file automatically.
// Update icons / colors here — no need to touch <head>.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Being a Wonder Warrior",
    short_name: "Wonder",
    description:
      "An immersive experience — Seven Principles and Practices for a Life of Wonder.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#000d1a",
    theme_color: "#000d1a",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
