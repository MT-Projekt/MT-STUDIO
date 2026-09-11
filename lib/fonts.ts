import { Space_Grotesk } from 'next/font/google'

// Czcionka pobierana przy budowaniu i serwowana z naszego serwera —
// przeglądarka odwiedzającego nie łączy się z Google Fonts.
// latin-ext jest wymagany dla polskich znaków (ą, ę, ł, ś, ż, ź, ć, ń).
export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-space-grotesk',
})
