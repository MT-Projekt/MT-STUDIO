import { getDictionary } from '@/lib/dictionaries'
import ONasPage from '@/components/pages/ONasPage'

export const revalidate = 60

export default async function Page() {
  const dict = await getDictionary('pl')
  return <ONasPage lang="pl" dict={dict} />
}
