import { domain } from "./domain";

new sst.cloudflare.x.Astro("Web", {
  domain: domain,
  path: "packages/app",
  environment: {
    // For astro config
    SST_STAGE: $app.stage,
  },
})
