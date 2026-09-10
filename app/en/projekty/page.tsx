import { getDictionary } from '@/lib/dictionaries'
import ProjektyPage from '@/components/pages/ProjektyPage'
import { staticPageMetadata } from '@/lib/seo'

export const revalidate = 60

export async function generateMetadata() {
  return staticPageMetadata('en', 'projekty')
}

export default async function Page() {
  const dict = await getDictionary('en')
  return <ProjektyPage lang="en" dict={dict} />
}
