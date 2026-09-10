import type { Metadata } from 'next'
import '../globals.css'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import { getDictionary } from '@/lib/dictionaries'

export const metadata: Metadata = {
  title: 'MT Projekt',
  description: 'Pracownia architektoniczna — architektura i wnętrza',
}

export default async function PlLayout({ children }: { children: React.ReactNode }) {
  const dict = await getDictionary('pl')
  return (
    <html lang="pl">
      <body>
        <Navbar lang="pl" dict={dict.nav} />
        <main>{children}</main>
        <Footer lang="pl" tagline={dict.footer.tagline} />
      </body>
    </html>
  )
}
