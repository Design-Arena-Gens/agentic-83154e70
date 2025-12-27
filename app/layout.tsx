import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Email Automation Agent',
  description: 'Automatically apply to scholarships and jobs from your emails',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
