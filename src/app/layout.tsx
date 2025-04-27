// ... existing code ... <default Next.js layout import>
import "./globals.css";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import ClientBody from "./ClientBox";

export const metadata: Metadata = {
  title: "Free PDF Page Rotator - Rotate Individual or All Pages | PDF.ai Clone",
  description: "Rotate individual or all pages in your PDF effortlessly. No downloads or sign-ups. Fast, secure, and user-friendly.",
  openGraph: {
    title: "Rotate PDF Pages | PDF.ai Clone",
    description: "Rotate pages in your PDF effortlessly. Process securely in your browser.",
    type: "website",
    url: "https://pdf.ai/tools/rotate-pdf-clone",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rotate PDF Pages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rotate PDF Pages | PDF.ai Clone",
    description:
      "Rotate individual or all pages in your PDF effortlessly. Process securely in your browser.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "PDF rotate online",
    "rotate PDF pages",
    "free PDF tool",
    "PDF AI clone",
    "edit PDF",
    "rotate all pages",
  ],
};

// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="https://ext.same-assets.com/1526427961/3985937173.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <ClientBody>{children}</ClientBody>
      {/* <body className="bg-[#f7f5ee] text-black min-h-screen flex flex-col">
        {children}
      </body> */}
    </html>
  );
}
// ... existing code ... <end of file>
