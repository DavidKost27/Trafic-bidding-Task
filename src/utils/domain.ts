export function getDomainFromUrl(url: string): string {
  let queryDomain = new URL(String(url));
  return queryDomain.hostname.replace("www.", "");
}
