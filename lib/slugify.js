/**
 * Converts any string into a URL-safe slug.
 * e.g. "Fevicol SWR Plus Adhesive" → "fevicol-swr-plus-adhesive"
 */
export function toSlug(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")   // remove special chars
    .replace(/\s+/g, "-")            // spaces → hyphens
    .replace(/-+/g, "-");            // collapse multiple hyphens
}
