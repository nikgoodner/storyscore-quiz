export const PRODUCTION_SITE_URL = "https://storyscore.nikgoodner.com";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? PRODUCTION_SITE_URL;
}

export function getUnsubscribeUrl(email: string) {
  return `${getSiteUrl()}/unsubscribe?email=${encodeURIComponent(email)}`;
}
