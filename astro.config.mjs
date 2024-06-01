import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

import createFaviconsIntegration from "astro-favicons";
import robotsTxt from "astro-robots-txt";
import starlightLinksValidator from "starlight-links-validator";

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
      lastUpdated: true,
      tableOfContents: {
        maxHeadingLevel: 4,
      },
      sidebar: [
        {
          label: "Introduction",
          autogenerate: {
            directory: "intro",
          },
        },
        {
          label: "Development",
          autogenerate: {
            directory: "development",
          },
        },
        {
          label: "Guides",
          autogenerate: {
            directory: "guides",
          },
        },
        {
          label: "Game Modules",
          autogenerate: {
            directory: "modules",
          },
        },
        {
          label: "Reference",
          autogenerate: {
            directory: "reference",
          },
        },
        {
          label: "Deployment",
          autogenerate: {
            directory: "deployment",
          },
        },
      ],
      plugins: [
        starlightLinksValidator({
          errorOnRelativeLinks: false,
        }),
      ],
      customCss: ["./src/styles/custom.css"],
    }),
    robotsTxt(),
    createFaviconsIntegration({
      appName: "BlueDragon Docs",
      appShortName: "BlueDragon",
      masterPicture: "./src/assets/logo.png",
      path: "./favicons/",
    }),
  ],
});
