import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./pwa.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pediatric Drug Calculator",
  description: "Comprehensive pediatric drug calculator with authentic dosages from Nelson's Textbook of Pediatrics",
  keywords: ["pediatric", "drug calculator", "medical", "dosage", "Nelson's Textbook", "healthcare"],
  authors: [{ name: "Medical Development Team" }],
  openGraph: {
    title: "Pediatric Drug Calculator",
    description: "Evidence-based pediatric drug dosage calculator",
    url: "https://github.com/drzee1205/Pediatric-drug-calculator",
    siteName: "Pediatric Drug Calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pediatric Drug Calculator",
    description: "Evidence-based pediatric drug dosage calculator",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PediaCalc",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "PediaCalc",
    "application-name": "PediaCalc",
    "msapplication-TileColor": "#0f172a",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
