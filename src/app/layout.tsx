import '@/styles/globals.css'

import type { Metadata } from 'next'

import DesktopMenu from '@/components/layouts/DesktopMenu'
import Header from '@/components/layouts/Header'
import MobileMenu from '@/components/layouts/MobileMenu'
import { ThemeProvider } from '@/components/ui/theme-provider'

export const metadata: Metadata = {
  title:
    'Blog.dev | Where you can sharing, stay up-to-date and grow their careers',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          storageKey="dev-blog-theme"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="relative flex flex-1">
            <DesktopMenu />
            <MobileMenu />
            <div className={`
              flex-1

              lg:ml-60

              md:ml-16
            `}>{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
