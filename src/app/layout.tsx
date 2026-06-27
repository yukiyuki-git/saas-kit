import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SaaS Kit — Production-Ready SaaS Template",
    template: "%s | SaaS Kit",
  },
  description:
    "A production-ready full-stack SaaS template built with Next.js 15, Better Auth, Drizzle ORM, Stripe, and shadcn/ui.",
  keywords: [
    "SaaS",
    "template",
    "Next.js",
    "Stripe",
    "authentication",
    "dashboard",
  ],
  authors: [{ name: "SaaS Kit" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://saas-kit.dev",
    siteName: "SaaS Kit",
    title: "SaaS Kit — Production-Ready SaaS Template",
    description:
      "Build and ship your SaaS in days, not months. Next.js 15 + Stripe + Auth + Teams.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Kit — Production-Ready SaaS Template",
    description:
      "Build and ship your SaaS in days, not months.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
