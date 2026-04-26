import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mel Carl A. Chacon | OOP E-Portfolio',
  description: 'Midterm E-Portfolio for Object-Oriented Programming (Java) — BSIT 2-1, Polytechnic University of the Philippines',
  openGraph: {
    title: 'Mel Carl A. Chacon | OOP E-Portfolio',
    description: 'A comprehensive technical archive of Midterm progress in Object-Oriented Programming.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#0d1117] text-[#e6edf3] antialiased">
        <Navbar />
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  )
}
