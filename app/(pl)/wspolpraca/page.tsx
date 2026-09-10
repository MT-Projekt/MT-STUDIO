import { getDictionary } from '@/lib/dictionaries'
import WspolpracaPage from '@/components/pages/WspolpracaPage'

export const revalidate = 60

export default async function Page() {
  const dict = await getDictionary('pl')
  return <WspolpracaPage lang="pl" dict={dict} />
}
