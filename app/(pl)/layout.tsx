import type { Metadata } from 'next'
import '../globals.css'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import { getDictionary } from '@/lib/dictionaries'
import { rootMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return rootMetadata('pl')
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
