import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    VitePWA({
      outDir: "build/client",
      scope: "/ownest/",
      strategies: "generateSW",
      injectRegister: false,
      registerType: "autoUpdate",
      includeAssets: ["ownest.svg", "ownest.svg"],
      // The public manifest is served in both dev and production builds.
      manifest: false,
      workbox: {
        navigateFallback: "index.html",
        globPatterns: ["**/*.{html,js,css,svg,woff2,webmanifest}"],
        additionalManifestEntries: [
          { url: "index.html", revision: Date.now().toString() },
        ],
      },
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  // The trailing slash is required so static asset URLs become /ownest/assets/...
  base: "/ownest/",
});



