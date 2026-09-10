import { getDictionary } from '@/lib/dictionaries'
import OfertaPage from '@/components/pages/OfertaPage'
import { getAllJobSlugs } from '@/lib/sanity'
import { jobMetadata } from '@/lib/seo'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getAllJobSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return jobMetadata('en', slug)
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const dict = await getDictionary('en')
  return <OfertaPage lang="en" dict={dict} slug={slug} />
}
