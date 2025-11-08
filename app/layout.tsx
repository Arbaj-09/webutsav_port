import './globals.css'
import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'WebUtsav Portfolio 2025 | Empowering Digital Transformation',
  description: 'WebUtsav Pvt. Ltd. — Full-stack IT company in Pune. Software development, digital marketing, cloud services.',
  openGraph: {
    title: 'WebUtsav Portfolio 2025',
    description: 'Empowering Digital Transformation',
    url: 'https://webutsav.com',
    siteName: 'WebUtsav',
    images: [{ url: 'https://webutsav.com/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-XXXXXXX');
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-slate-900">
        {children}
      </body>
    </html>
  )
}
