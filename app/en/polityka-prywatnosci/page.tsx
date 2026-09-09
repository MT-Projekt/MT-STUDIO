import { getDictionary } from '@/lib/dictionaries'
import PolitykaPrywatnosciPage from '@/components/pages/PolitykaPrywatnosciPage'

export const revalidate = 60

export default async function Page() {
  const dict = await getDictionary('en')
  return <PolitykaPrywatnosciPage lang="en" dict={dict} />
}
