import { getDictionary } from '@/lib/dictionaries'
import OfertyPage from '@/components/pages/OfertyPage'
import { staticPageMetadata } from '@/lib/seo'

export const revalidate = 60

export async function generateMetadata() {
  return staticPageMetadata('pl', 'oferty')
}

export default async function Page() {
  const dict = await getDictionary('pl')
  return <OfertyPage lang="pl" dict={dict} />
}
