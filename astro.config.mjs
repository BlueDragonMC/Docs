import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

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
        github: "https://github.com/BlueDragonMC/",
        discord: "https://bluedragonmc.com/discord",
      },
      sidebar: [
        {
          label: "Start Here",
          autogenerate: { directory: "intro" },
        },
        {
          label: "Guides",
          autogenerate: { directory: "guides" },
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],
});
