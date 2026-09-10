import { getDictionary } from '@/lib/dictionaries'
import OfertaPage from '@/components/pages/OfertaPage'
import { getAllJobSlugs } from '@/lib/sanity'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getAllJobSlugs()
  return slugs.map(slug => ({ slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const dict = await getDictionary('pl')
  return <OfertaPage lang="pl" dict={dict} slug={slug} />
}
