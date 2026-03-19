import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
// import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const _inter = Inter({ subsets: ['latin'] })
const _jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] })

export const viewport: Viewport = {
  themeColor: '#1a1a2e',
  userScalable: true,
}

export const metadata: Metadata = {
  title: 'Portfolio Fleur| Fullstack Developer',
  description: 'Fullstack developer specializing in web applications and modern technologies. Available for freelance projects.',

  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="dark">
      <body className="font-sans antialiased">
        {children}
        <Toaster position="bottom-right" theme="dark" richColors />
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
