import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import solid from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://oezguerisbert.com",
  integrations: [mdx(), sitemap(), solid(), tailwind()],
  output: "hybrid",
});
