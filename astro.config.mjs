import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: "https://developer.bluedragonmc.com/",
  integrations: [
    starlight({
      title: "BlueDragon Docs",
      logo: {
        src: "./src/assets/logo_wordmark.png",
        replacesTitle: true,
      },
      editLink: {
        baseUrl: "https://github.com/BlueDragonMC/Docs/edit/main/",
      },
      social: {
        github: "https://github.com/BlueDragonMC",
        discord: "https://bluedragonmc.com/discord",
      },
      sidebar: [
        {
          label: "Introduction",
          autogenerate: {
            directory: "intro",
          },
        },
        {
          label: "Guides",
          autogenerate: {
            directory: "guides",
          },
        },
        {
          label: "Reference",
          autogenerate: {
            directory: "reference",
          },
        },
      ],
    }),
    robotsTxt(),
  ],
});
