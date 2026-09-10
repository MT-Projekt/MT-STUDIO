import { getDictionary } from '@/lib/dictionaries'
import OfertyPage from '@/components/pages/OfertyPage'

export const revalidate = 60

export default async function Page() {
  const dict = await getDictionary('pl')
  return <OfertyPage lang="pl" dict={dict} />
}
