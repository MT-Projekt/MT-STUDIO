import 'server-only'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary, type Locale } from './dictionaries'
import { studioInfo } from './mockData'
import { getJobPostingBySlug, getProjectBySlug } from './sanity'
import type { JobPosting } from './types'

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mt-p.pl').replace(/\/$/, '')
export const SITE_NAME = 'MT-Projekt'

const LOGO_URL = `${SITE_URL}/mtp-logo.png`
const ORGANIZATION_ID = `${SITE_URL}/#organization`

// Structured form of studioInfo.address
const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'ul. Piłsudskiego 42A',
  postalCode: '05-600',
  addressLocality: 'Grójec',
  addressRegion: 'mazowieckie',
  addressCountry: 'PL',
}

type OgImage = { url: string; width?: number; height?: number; alt?: string }

const DEFAULT_OG_IMAGE: OgImage = { url: '/og-default.jpg', width: 1200, height: 630, alt: SITE_NAME }
const OG_LOCALE: Record<Locale, string> = { pl: 'pl_PL', en: 'en_GB' }

const STATIC_PAGES = {
  home: '/',
  o_nas: '/o-nas',
  projekty: '/projekty',
  wspolpraca: '/wspolpraca',
  kariera: '/kariera',
  oferty: '/kariera/oferty',
  polityka: '/polityka-prywatnosci',
} as const

export type StaticPage = keyof typeof STATIC_PAGES
export const STATIC_PATHS: string[] = Object.values(STATIC_PAGES)

// '/o-nas' → '/o-nas' (pl) or '/en/o-nas' (en)
export function localePath(lang: Locale, path: string) {
  if (lang === 'pl') return path
  return path === '/' ? '/en' : `/en${path}`
}

interface PageMetadataInput {
  lang: Locale
  path: string
  title: string
  absoluteTitle?: boolean
  description: string
  image?: OgImage
}

function pageMetadata({ lang, path, title: rawTitle, absoluteTitle, description, image }: PageMetadataInput): Metadata {
  const title = squash(rawTitle)
  const url = localePath(lang, path)
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`
  const images = [image ?? DEFAULT_OG_IMAGE]
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: {
        pl: localePath('pl', path),
        en: localePath('en', path),
        'x-default': localePath('pl', path),
      },
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: OG_LOCALE[lang],
      url,
      title: fullTitle,
      description,
      images,
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images },
  }
}

export async function rootMetadata(lang: Locale): Promise<Metadata> {
  const { meta } = await getDictionary(lang)
  return {
    metadataBase: new URL(SITE_URL),
    title: { template: `%s | ${SITE_NAME}`, default: meta.default_title },
    description: meta.pages.home.description,
    applicationName: SITE_NAME,
    openGraph: { type: 'website', siteName: SITE_NAME, locale: OG_LOCALE[lang], images: [DEFAULT_OG_IMAGE] },
    twitter: { card: 'summary_large_image' },
  }
}

export async function staticPageMetadata(lang: Locale, page: StaticPage): Promise<Metadata> {
  const { meta } = await getDictionary(lang)
  const { title, description } = meta.pages[page]
  return pageMetadata({ lang, path: STATIC_PAGES[page], title, absoluteTitle: page === 'home', description })
}

export async function projectMetadata(lang: Locale, slug: string): Promise<Metadata> {
  const [{ meta }, project] = await Promise.all([getDictionary(lang), getProjectBySlug(slug, lang)])
  if (!project) notFound()

  const facts = [project.location, project.year].filter(Boolean).join(', ')
  const description = truncate(
    project.seoDescription ||
      project.description ||
      `${project.title}${facts ? ` (${facts})` : ''}. ${meta.project_description_suffix}`
  )
  return pageMetadata({
    lang,
    path: `/projekty/${slug}`,
    title: project.seoTitle || project.title,
    description,
    image: sanityOgImage(project.coverImage, project.coverImageAlt || project.title),
  })
}

export async function jobMetadata(lang: Locale, slug: string): Promise<Metadata> {
  const [{ meta }, job] = await Promise.all([getDictionary(lang), getJobPostingBySlug(slug, lang)])
  if (!job) notFound()

  const title = [`${job.title} – ${meta.job_title_suffix}`, job.location].filter(Boolean).join(', ')
  return pageMetadata({ lang, path: `/kariera/oferty/${slug}`, title, description: truncate(job.summary) })
}

// ---- JSON-LD (structured data) ----

export async function siteJsonLd(lang: Locale) {
  const { meta, competences: c } = await getDictionary(lang)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': ORGANIZATION_ID,
        name: SITE_NAME,
        legalName: 'MT-Projekt Sp. z o.o.',
        url: SITE_URL,
        logo: LOGO_URL,
        image: `${SITE_URL}${DEFAULT_OG_IMAGE.url}`,
        description: meta.pages.home.description,
        email: studioInfo.email,
        telephone: studioInfo.phone,
        address: ADDRESS,
        areaServed: { '@type': 'Country', name: 'Poland' },
        knowsAbout: [c.item1_title, c.item2_title, c.item3_title, c.item4_title, 'CAD/BIM'],
        sameAs: ['https://www.linkedin.com/company/mt-projekt-sp-z-o-o/'],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: lang,
        publisher: { '@id': ORGANIZATION_ID },
      },
    ],
  }
}

// Paths already include the language prefix, e.g. '/en/projekty'
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: squash(item.name),
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

// https://developers.google.com/search/docs/appearance/structured-data/job-posting
export function jobPostingJsonLd(job: JobPosting, lang: Locale) {
  const atHeadquarters = job.location?.trim().toLowerCase() === ADDRESS.addressLocality.toLowerCase()
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: squash(job.title),
    description: toHtml(job.description || job.summary),
    datePosted: job.datePosted,
    // GROQ returns null for empty fields; undefined drops the key instead of sending an invalid value
    validThrough: job.validThrough ?? undefined,
    employmentType: job.employmentTypeCode ?? undefined,
    url: `${SITE_URL}${localePath(lang, `/kariera/oferty/${job.slug}`)}`,
    identifier: { '@type': 'PropertyValue', name: SITE_NAME, value: job.id },
    directApply: false,
    hiringOrganization: { '@type': 'Organization', name: SITE_NAME, sameAs: SITE_URL, logo: LOGO_URL },
    jobLocation: {
      '@type': 'Place',
      address: atHeadquarters
        ? ADDRESS
        : { '@type': 'PostalAddress', addressLocality: job.location, addressCountry: 'PL' },
    },
  }
}

// Sanity CDN crops to the 1200×630 size expected by Facebook/LinkedIn/X
function sanityOgImage(src: string | undefined, alt: string): OgImage | undefined {
  if (!src) return undefined
  if (!src.includes('cdn.sanity.io')) return { url: src, alt }
  return { url: `${src.split('?')[0]}?w=1200&h=630&fit=crop&fm=jpg&q=80`, width: 1200, height: 630, alt }
}

// Google expects JobPosting.description as HTML; CMS gives plain text with blank-line paragraphs
function toHtml(text: string) {
  const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return escaped
    .split(/\n\s*\n/)
    .map(p => `<p>${p.trim().replace(/\n/g, '<br>')}</p>`)
    .join('')
}

// CMS content often contains double spaces and stray line breaks
function squash(text: string) {
  return text.replace(/\s+/g, ' ').trim()
}

function truncate(text: string, max = 160) {
  const clean = squash(text)
  if (clean.length <= max) return clean
  return `${clean.slice(0, clean.lastIndexOf(' ', max - 1))}…`
}
