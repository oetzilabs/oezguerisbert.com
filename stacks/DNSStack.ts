import { HostedZone } from "aws-cdk-lib/aws-route53";
import { StackContext } from "sst/constructs";

const PRODUCTION = "oezguerisbert.com";
const DEV = "dev.oezguerisbert.com";

export function DNSStack(ctx: StackContext) {
  if (ctx.stack.stage === "production") {
    const zone = HostedZone.fromLookup(ctx.stack, "zone", {
      domainName: PRODUCTION,
    });
    return {
      zone,
      domain: PRODUCTION,
    };
  }

  if (ctx.stack.stage === "dev") {
    return {
      zone: HostedZone.fromLookup(ctx.stack, "zone", {
        domainName: DEV,
      }),
      domain: DEV,
    };
  }

  const zone = HostedZone.fromLookup(ctx.stack, "zone", {
    domainName: DEV,
  });
  return {
    zone,
    domain: `${ctx.stack.stage}.${DEV}`,
  };
  // return null;
}
