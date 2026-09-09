import type { Metadata } from 'next'
import '../globals.css'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import CookieBanner from '@/components/CookieBanner/CookieBanner'
import { getDictionary } from '@/lib/dictionaries'
import { rootMetadata, siteJsonLd } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'

export async function generateMetadata(): Promise<Metadata> {
  return rootMetadata('en')
}

export default async function EnLayout({ children }: { children: React.ReactNode }) {
  const dict = await getDictionary('en')
  return (
    <html lang="en">
      <body>
        <JsonLd data={await siteJsonLd('en')} />
        <Navbar lang="en" dict={dict.nav} />
        <main>{children}</main>
        <Footer lang="en" tagline={dict.footer.tagline} privacyLabel={dict.footer.privacy} />
        <CookieBanner lang="en" dict={dict.cookies} />
      </body>
    </html>
  )
}
