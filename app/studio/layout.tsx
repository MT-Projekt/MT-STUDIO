import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Studio | MT-Projekt',
  robots: { index: false, follow: false },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  )
}
