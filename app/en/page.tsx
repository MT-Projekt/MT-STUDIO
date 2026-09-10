import { getDictionary } from '@/lib/dictionaries'
import HomePage from '@/components/pages/HomePage'
import { staticPageMetadata } from '@/lib/seo'

export const revalidate = 60

export async function generateMetadata() {
  return staticPageMetadata('en', 'home')
}

export default async function Page() {
  const dict = await getDictionary('en')
  return <HomePage lang="en" dict={dict} />
}
