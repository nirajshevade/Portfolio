import type { Metadata, Viewport } from "next";
import { Syne, DM_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({ subsets: ["latin"], variable: "--font-display" });
const dmMono = DM_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-body" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-ui" });

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "Niraj Shevade — Full-Stack & DevOps Engineer",
  description: "Portfolio of Niraj Shevade. Building scalable systems, intelligent applications, and pixel-perfect interfaces from Pune, India.",
  openGraph: {
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${syne.variable} ${dmMono.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
