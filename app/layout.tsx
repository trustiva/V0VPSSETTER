import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Private Internet Workspace - Secure & Fast Connection",
  description:
    "Access your private, high-speed internet workspace from anywhere. No setup required, works on all devices.",
  keywords: "private internet, secure connection, high-speed, workspace, digital privacy",
  authors: [{ name: "Private Workspace Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#1e3a8a",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
