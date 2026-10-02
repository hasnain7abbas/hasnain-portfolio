import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const description =
  "Hasnain Abbas is an experimental physicist at Quaid-i-Azam University working on memristive and synaptic devices for neuromorphic computing: sol-gel BiFeO₃ thin films, resistive switching and device-aware neural-network simulation.";

export const metadata: Metadata = {
  metadataBase: new URL("https://hasnain7abbas.github.io/hasnain-portfolio/"),
  title: "Hasnain Abbas — Experimental physicist",
  description,
  openGraph: {
    title: "Hasnain Abbas — Experimental physicist",
    description,
    type: "website",
    url: "https://hasnain7abbas.github.io/hasnain-portfolio/",
  },
};

export const viewport: Viewport = {
  themeColor: "#eae5d9",
};

/* Marks the document as scripted so the hero can wait for its load sequence,
   and releases it after a few seconds no matter what. */
const boot = `document.documentElement.classList.add("js");setTimeout(function(){document.documentElement.classList.add("is-ready")},4000);`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${newsreader.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
