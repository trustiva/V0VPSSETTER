import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Private Internet Workspace",
    short_name: "PrivateWorkspace",
    description: "Your secure, high-speed internet workspace for unrestricted access",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#1e3a8a",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["productivity", "utilities"],
    lang: "en",
    dir: "ltr",
  }
}
