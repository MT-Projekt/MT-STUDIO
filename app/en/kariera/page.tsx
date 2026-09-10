import { getDictionary } from '@/lib/dictionaries'
import KarieraPage from '@/components/pages/KarieraPage'

export const revalidate = 60

export default async function Page() {
  const dict = await getDictionary('en')
  return <KarieraPage lang="en" dict={dict} />
}
