import { MetadataRoute } from "next";

import { THEME_BG_DARK } from "@/constants/colors.const";

export default function manifest(): MetadataRoute.Manifest {
  return {
    "name": "Webkemy",
    "short_name": "Webkemy",
    "description": "webkemy",
    "start_url": "/",
    "display": "standalone",
    "categories": ["social"],
    "background_color": THEME_BG_DARK,
    "theme_color": THEME_BG_DARK,
    "scope": "/",
    "lang": "en",
    "icons": [
      {
        "sizes": "any",
        "src": "/favicon.svg",
        "type": "image/svg+xml"
      },
      // {
      //   "sizes": "192x192",
      //   "src": "/icon-192.png",
      //   "type": "image/png"
      // },
      // {
      //   "sizes": "512x512",
      //   "src": "/icon-512.png",
      //   "type": "image/png"
      // },
      // {
      //   "purpose": "maskable",
      //   "sizes": "1024x1024",
      //   "src": "/maskable_icon.png",
      //   "type": "image/png"
      // },
      {
        "purpose": "maskable",
        "sizes": "192x192",
        "src": "/maskable_icon_x192.png",
        "type": "image/png"
      },
      {
        "purpose": "maskable",
        "sizes": "512x512",
        "src": "/maskable_icon_x512.png",
        "type": "image/png"
      }
    ],
    "shortcuts": [
      {
        "name": "Components",
        "url": "/components",
        icons: [{
          "sizes": "any",
          "src": "/favicon.svg",
          "type": "image/svg+xml"
        }],
        short_name: "Write"
      },
    ],
    screenshots: [

    ],
  };
}
