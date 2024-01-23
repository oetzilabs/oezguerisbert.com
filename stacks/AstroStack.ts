import { AstroSite, StackContext, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";
import { DNSStack } from "./DNSStack";

export function AstroStack({ stack, app }: StackContext) {
  const dns = use(DNSStack);
  const { bucket } = use(StorageStack);

  const publicAstroApp = new AstroSite(stack, `${app.name}-app`, {
    bind: [bucket],
    path: "packages/app",
    buildCommand: "pnpm build",
    customDomain: {
      domainName: dns.domain,
      domainAlias: `www.${dns.domain}`,
      hostedZone: dns.zone.zoneName,
    },
  });

  stack.addOutputs({
    SiteUrl: publicAstroApp.customDomainUrl || "http://localhost:4321",
  });

  return {
    publicAstroApp,
  };
}
