import type { Config } from "@react-router/dev/config";

export default {
  // GitHub Pages serves static files only, so build the app as a client SPA.
  ssr: false,
  basename: "/ownest/",
} satisfies Config;
