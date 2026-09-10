import { getDictionary } from '@/lib/dictionaries'
import HomePage from '@/components/pages/HomePage'

export const revalidate = 60

export default async function Page() {
  const dict = await getDictionary('pl')
  return <HomePage lang="pl" dict={dict} />
}
