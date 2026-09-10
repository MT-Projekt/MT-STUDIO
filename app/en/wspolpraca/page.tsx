import { getDictionary } from '@/lib/dictionaries'
import WspolpracaPage from '@/components/pages/WspolpracaPage'

export const revalidate = 60

export default async function Page() {
  const dict = await getDictionary('en')
  return <WspolpracaPage lang="en" dict={dict} />
}
