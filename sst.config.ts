import { SSTConfig } from "sst";
import { StorageStack } from "./stacks/StorageStack";
import { DNSStack } from "./stacks/DNSStack";
import { AstroStack } from "./stacks/AstroStack";

export default {
  config(_input) {
    return {
      name: "oezguerisbert-com",
      region: "eu-central-1",
    };
  },
  stacks(app) {
    app.setDefaultRemovalPolicy("destroy");
    app
      //
      .stack(DNSStack)
      .stack(StorageStack)
      .stack(AstroStack);
  },
} satisfies SSTConfig;
