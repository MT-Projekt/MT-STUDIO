import { getDictionary } from '@/lib/dictionaries'
import HomePage from '@/components/pages/HomePage'
import { staticPageMetadata } from '@/lib/seo'

export const revalidate = 60

export async function generateMetadata() {
  return staticPageMetadata('pl', 'home')
}

export default async function Page() {
  const dict = await getDictionary('pl')
  return <HomePage lang="pl" dict={dict} />
}
