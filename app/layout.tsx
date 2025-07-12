import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CursorParticles from '@/components/CursorParticles'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dr. Waseem Ahmad Khan - Modern Portfolio',
  description: 'Doctor, ML Engineer, Researcher, and Teacher - Modern 3D Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-secondary text-text antialiased`}>
        <CursorParticles />
        {children}
      </body>
    </html>
  )
} 