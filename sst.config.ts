/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "oezguerisbert-com",
      home: "cloudflare",
    };
  },
  async run() {
    await import("./stacks/astro");
  },
});
