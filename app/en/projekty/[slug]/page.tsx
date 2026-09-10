import { getDictionary } from '@/lib/dictionaries'
import ProjektPage from '@/components/pages/ProjektPage'
import { getAllSlugs } from '@/lib/sanity'
import { projectMetadata } from '@/lib/seo'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return projectMetadata('en', slug)
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const dict = await getDictionary('en')
  return <ProjektPage lang="en" dict={dict} slug={slug} />
}
