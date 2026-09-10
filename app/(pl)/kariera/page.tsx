import { getDictionary } from '@/lib/dictionaries'
import KarieraPage from '@/components/pages/KarieraPage'

export const revalidate = 60

export default async function Page() {
  const dict = await getDictionary('pl')
  return <KarieraPage lang="pl" dict={dict} />
}
