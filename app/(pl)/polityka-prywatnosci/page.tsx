import { getDictionary } from '@/lib/dictionaries'
import PolitykaPrywatnosciPage from '@/components/pages/PolitykaPrywatnosciPage'
import { staticPageMetadata } from '@/lib/seo'

export const revalidate = 60

export async function generateMetadata() {
  return staticPageMetadata('pl', 'polityka')
}

export default async function Page() {
  const dict = await getDictionary('pl')
  return <PolitykaPrywatnosciPage lang="pl" dict={dict} />
}
