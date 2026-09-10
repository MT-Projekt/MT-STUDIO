import { getDictionary } from '@/lib/dictionaries'
import WspolpracaPage from '@/components/pages/WspolpracaPage'
import { staticPageMetadata } from '@/lib/seo'

export const revalidate = 60

export async function generateMetadata() {
  return staticPageMetadata('en', 'wspolpraca')
}

export default async function Page() {
  const dict = await getDictionary('en')
  return <WspolpracaPage lang="en" dict={dict} />
}
