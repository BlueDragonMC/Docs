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
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/BlueDragonMC",
        },
        {
          icon: "discord",
          label: "Discord",
          href: "https://bluedragonmc.com/discord",
        },
      ],
      lastUpdated: true,
      tableOfContents: {
        maxHeadingLevel: 4,
      },
      sidebar: [
        {
          label: "Introduction",
          items: [{ autogenerate: { directory: "intro" } }],
        },
        {
          label: "Development",
          items: [{ autogenerate: { directory: "development" } }],
        },
        {
          label: "Guides",
          items: [{ autogenerate: { directory: "guides" } }],
        },
        {
          label: "Game Modules",
          items: [{ autogenerate: { directory: "modules" } }],
        },
        {
          label: "Reference",
          items: [{ autogenerate: { directory: "reference" } }],
        },
        {
          label: "Deployment",
          items: [{ autogenerate: { directory: "deployment" } }],
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
      name: "BlueDragon Docs",
      short_name: "BlueDragon",
      input: "./src/assets/logo.png",
      output: {
        assetsPrefix: "/favicons/",
      },
    }),
  ],
});
