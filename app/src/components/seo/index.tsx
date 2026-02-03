import { Helmet } from "react-helmet-async"
import { SITE_NAME, SITE_BASE_URL } from "../../constants/branding"

export interface SeoProps {
  title: string
  description?: string
  path?: string
  image?: string
  schemaMarkup?: object
}

const DEFAULT_DESCRIPTION =
  "Find ready-to-use conversation topics, questions, vocabulary, and example sentences for language teaching. Browse by language and pick a topic in seconds."

export default function Seo({ title, description, path = "", image, schemaMarkup }: SeoProps) {
  const canonical = path ? `${SITE_BASE_URL.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}` : SITE_BASE_URL
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`
  const desc = description ?? DEFAULT_DESCRIPTION
  const ogImage = image ?? `${SITE_BASE_URL}/favicon.ico`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />

      {schemaMarkup != null && (
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
      )}
    </Helmet>
  )
}
