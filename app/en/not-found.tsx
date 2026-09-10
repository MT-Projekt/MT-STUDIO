import { getDictionary } from '@/lib/dictionaries'
import NotFoundPage from '@/components/pages/NotFoundPage'

export default async function NotFound() {
  const dict = await getDictionary('en')
  return <NotFoundPage lang="en" dict={dict} />
}
