import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aman Sharma | Full Stack Developer",
  description:
    "Full Stack Developer specializing in React, Node.js, Python, and cloud technologies. Based in Delhi, India.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Node.js",
    "Python",
    "Aman Sharma",
    "Portfolio",
  ],
  authors: [{ name: "Aman Sharma" }],
  openGraph: {
    title: "Aman Sharma | Full Stack Developer",
    description: "Building scalable systems from frontend to cloud",
    siteName: "Aman Sharma Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aman Sharma | Full Stack Developer",
    description: "Building scalable systems from frontend to cloud",
    creator: "@Trezarex",
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
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable}`}
    >
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
