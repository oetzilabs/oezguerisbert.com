export const domain = (() => {
  if ($app.stage === "main") return "oezguerisbert.com"
  if ($app.stage === "dev") return "dev.oezguerisbert.com"
  return `${$app.stage}.dev.oezguerisbert.com`
})()

export const zoneID = "317bb796e16c10365fc142e7edb43b0e"
