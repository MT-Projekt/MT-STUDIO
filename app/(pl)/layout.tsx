import type { Metadata } from 'next'
import '../globals.css'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import CookieBanner from '@/components/CookieBanner/CookieBanner'
import { getDictionary } from '@/lib/dictionaries'
import { rootMetadata, siteJsonLd } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'

export async function generateMetadata(): Promise<Metadata> {
  return rootMetadata('pl')
}

export default async function PlLayout({ children }: { children: React.ReactNode }) {
  const dict = await getDictionary('pl')
  return (
    <html lang="pl">
      <body>
        <JsonLd data={await siteJsonLd('pl')} />
        <Navbar lang="pl" dict={dict.nav} />
        <main>{children}</main>
        <Footer lang="pl" tagline={dict.footer.tagline} privacyLabel={dict.footer.privacy} />
        <CookieBanner lang="pl" dict={dict.cookies} />
      </body>
    </html>
  )
}
