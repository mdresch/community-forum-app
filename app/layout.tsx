import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/next"
import { ClerkProviderWrapper } from "@/components/providers/clerk-provider"
import { Geist, Geist_Mono } from 'next/font/google'
import { AuthProvider } from '@/hooks/useAuth'

const inter = Inter({ subsets: ["latin"] })

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Community Forum",
  description: "A modern community forum application",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProviderWrapper>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader />
                <main className="flex-1">{children}</main>
                <Analytics />
                <footer className="border-t py-6 md:py-0">
                  <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                      © 2025 Community Forum. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <a href="/terms" className="hover:underline">
                        Terms
                      </a>
                      <a href="/privacy" className="hover:underline">
                        Privacy
                      </a>
                      <a href="/contact" className="hover:underline">
                        Contact
                      </a>
                    </div>
                  </div>
                </footer>
              </div>
              <Toaster /> {/* Toast notifications */}
            </ThemeProvider>
          </AuthProvider>
        </ClerkProviderWrapper>
      </body>
    </html>
  )
}
