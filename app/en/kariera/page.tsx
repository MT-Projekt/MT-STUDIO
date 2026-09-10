import { getDictionary } from '@/lib/dictionaries'
import KarieraPage from '@/components/pages/KarieraPage'
import { staticPageMetadata } from '@/lib/seo'

export const revalidate = 60

export async function generateMetadata() {
  return staticPageMetadata('en', 'kariera')
}

export default async function Page() {
  const dict = await getDictionary('en')
  return <KarieraPage lang="en" dict={dict} />
}
