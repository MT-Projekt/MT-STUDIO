import { getDictionary } from '@/lib/dictionaries'
import NotFoundPage from '@/components/pages/NotFoundPage'

export default async function NotFound() {
  const dict = await getDictionary('pl')
  return <NotFoundPage lang="pl" dict={dict} />
}
