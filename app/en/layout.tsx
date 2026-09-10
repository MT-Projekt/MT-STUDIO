import type { Metadata } from 'next'
import '../globals.css'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import { getDictionary } from '@/lib/dictionaries'

export const metadata: Metadata = {
  title: 'MT Projekt',
  description: 'Architecture studio — architecture and interiors',
}

export default async function EnLayout({ children }: { children: React.ReactNode }) {
  const dict = await getDictionary('en')
  return (
    <html lang="en">
      <body>
        <Navbar lang="en" dict={dict.nav} />
        <main>{children}</main>
        <Footer lang="en" tagline={dict.footer.tagline} />
      </body>
    </html>
  )
}
