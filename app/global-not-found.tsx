import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import NotFoundPage from '@/components/pages/NotFoundPage'
import { getDictionary } from '@/lib/dictionaries'

// Unmatched URLs (e.g. /abc) — outside both root layouts, so this page brings its own <html>
export const metadata: Metadata = {
  title: 'Nie znaleziono strony | MT-Projekt',
}

export default async function GlobalNotFound() {
  const dict = await getDictionary('pl')
  return (
    <html lang="pl">
      <body>
        <Navbar lang="pl" dict={dict.nav} />
        <main>
          <NotFoundPage lang="pl" dict={dict} />
        </main>
        <Footer lang="pl" tagline={dict.footer.tagline} />
      </body>
    </html>
  )
}
