import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteNav from "@/components/layout/SiteNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://xydk-blog.vercel.app";

const siteDescription =
  "Frontend Developer with UI/UX sensitivity. 완성도 높은 경험을 만드는 개발자 유다경의 포트폴리오입니다.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "XYDK",
    template: "%s | XYDK",
  },
  description: siteDescription,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "XYDK",
    description: siteDescription,
    url: siteUrl,
    siteName: "XYDK",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/image/main-dk.jpg",
        width: 520,
        height: 700,
        alt: "XYDK Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "XYDK",
    description: siteDescription,
    images: ["/image/main-dk.jpg"],
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
    >
      <body className="min-h-full bg-[#0c0c0c]" suppressHydrationWarning>
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
