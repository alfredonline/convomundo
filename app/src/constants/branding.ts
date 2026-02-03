export const SITE_NAME = "ConvoMundo"

/** Base URL for canonical, OG, and sitemap. Set VITE_SITE_URL in .env for production. */
export const SITE_BASE_URL =
  (import.meta as { env?: { VITE_SITE_URL?: string } }).env?.VITE_SITE_URL ?? "https://convomundo.com"