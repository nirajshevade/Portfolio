import type { Metadata, Viewport } from "next";
import { Syne, DM_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import { Sidebars } from "@/components/ui/Sidebars";

const syne = Syne({ subsets: ["latin"], variable: "--font-display" });
const dmMono = DM_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-body" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-ui" });

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nirajshevade.vercel.app"),
  title: "Niraj Shevade | Full-Stack Developer & AI Engineer",
  description: "Portfolio of Niraj Shevade. Building scalable systems, intelligent applications, and pixel-perfect interfaces from Pune, India. Specializing in MERN stack, DevOps, and Cloud Technologies.",
  keywords: [
    "Niraj Shevade",
    "Full-Stack Developer",
    "Software Engineer",
    "AI Engineer",
    "Machine Learning",
    "DevOps",
    "React",
    "Next.js",
    "Node.js",
    "Pune",
    "India",
    "Portfolio",
    "Web Development",
    "Cloud Computing",
    "Cybersecurity"
  ],
  authors: [{ name: "Niraj Shevade", url: "https://github.com/nirajshevade" }],
  creator: "Niraj Shevade",
  publisher: "Niraj Shevade",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Niraj Shevade | Full-Stack Developer",
    description: "Portfolio of Niraj Shevade. Building scalable systems and intelligent applications.",
    url: "https://nirajshevade.vercel.app",
    siteName: "Niraj Shevade Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Niraj Shevade Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Niraj Shevade | Full-Stack Developer",
    description: "Portfolio of Niraj Shevade. Building scalable systems and intelligent applications.",
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
        <Sidebars />
      </body>
    </html>
  );
}
