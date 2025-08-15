import type { Metadata } from 'next'
import '../styles/globals.css'            
import { Inter } from 'next/font/google'
import { Kanit } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Web Deployment System',
  description: 'Automatic Deployment of Applications to Containers',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-[#090C10] text-white">{children}</body>
    </html>
  )
}
