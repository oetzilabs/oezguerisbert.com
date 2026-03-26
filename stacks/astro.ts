import { domain } from "./domain";

new sst.cloudflare.StaticSite("Web", {
  domain: domain,
  path: "packages/app",
  environment: {
    // For astro config
    SST_STAGE: $app.stage,
  },
  build: {
    command: "bun run build",
    output: "dist/client",
  },
})

