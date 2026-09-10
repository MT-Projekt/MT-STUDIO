import type { MetadataRoute } from 'next'
import { SITE_URL, STATIC_PATHS, localePath } from '@/lib/seo'
import { getSitemapDocs } from '@/lib/sanity'

export const revalidate = 3600

// Each page is listed in both languages, with hreflang links to each other
function entries(path: string, lastModified?: string): MetadataRoute.Sitemap {
  const languages = {
    pl: `${SITE_URL}${localePath('pl', path)}`,
    en: `${SITE_URL}${localePath('en', path)}`,
  }
  return [
    { url: languages.pl, lastModified, alternates: { languages } },
    { url: languages.en, lastModified, alternates: { languages } },
  ]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { projects, jobs } = await getSitemapDocs()
  return [
    ...STATIC_PATHS.flatMap(path => entries(path)),
    ...projects.flatMap(p => entries(`/projekty/${p.slug}`, p.updatedAt)),
    ...jobs.flatMap(j => entries(`/kariera/oferty/${j.slug}`, j.updatedAt)),
  ]
}
