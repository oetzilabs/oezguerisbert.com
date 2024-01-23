import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import solid from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import aws from "astro-sst";

// https://astro.build/config
export default defineConfig({
  site: "https://oezguerisbert.com",
  integrations: [mdx(), sitemap(), solid(), tailwind()],
  output: "server",
  adapter: aws(),
});
