import { getDictionary } from '@/lib/dictionaries'
import ONasPage from '@/components/pages/ONasPage'
import { staticPageMetadata } from '@/lib/seo'

export const revalidate = 60

export async function generateMetadata() {
  return staticPageMetadata('en', 'o_nas')
}

export default async function Page() {
  const dict = await getDictionary('en')
  return <ONasPage lang="en" dict={dict} />
}
