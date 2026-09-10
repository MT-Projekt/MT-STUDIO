import { getDictionary } from '@/lib/dictionaries'
import KarieraPage from '@/components/pages/KarieraPage'
import { staticPageMetadata } from '@/lib/seo'

export const revalidate = 60

export async function generateMetadata() {
  return staticPageMetadata('pl', 'kariera')
}

export default async function Page() {
  const dict = await getDictionary('pl')
  return <KarieraPage lang="pl" dict={dict} />
}
