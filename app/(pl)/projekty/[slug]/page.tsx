import { getDictionary } from '@/lib/dictionaries'
import ProjektPage from '@/components/pages/ProjektPage'
import { getAllSlugs } from '@/lib/sanity'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map(slug => ({ slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const dict = await getDictionary('pl')
  return <ProjektPage lang="pl" dict={dict} slug={slug} />
}
