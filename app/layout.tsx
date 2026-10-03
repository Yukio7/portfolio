import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Arthur Manhaudier | Cloud, DevOps et coordination de projet",
  description:
    "L'infrastructure comme un monde. Arthur Manhaudier, ingénieur Cloud / DevOps junior à Lyon : automatisation AWS, infrastructure et coordination de projets techniques.",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  openGraph: {
    title: "Arthur Manhaudier | L'infrastructure comme un monde",
    description: "Cloud, DevOps et gestion de projet. Une infrastructure à explorer.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
