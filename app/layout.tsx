import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Kalam } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";

/* Computer Modern (CMU Serif and Typewriter, SIL OFL; see app/fonts/CMU-OFL.txt), subset to the characters in use. */
const cmSerif = localFont({
  variable: "--font-cm",
  display: "swap",
  src: [
    { path: "./fonts/cmu-serif-500-roman.woff2", weight: "400", style: "normal" },
    { path: "./fonts/cmu-serif-500-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/cmu-serif-700-roman.woff2", weight: "700", style: "normal" },
    { path: "./fonts/cmu-serif-700-italic.woff2", weight: "700", style: "italic" },
  ],
});

const cmTypewriter = localFont({
  variable: "--font-tt",
  display: "swap",
  src: [{ path: "./fonts/cmu-typewriter-text-500-roman.woff2", weight: "400", style: "normal" }],
});

const kalam = Kalam({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

const description =
  "Hasnain Abbas: experimental physicist at Quaid-i-Azam University working on Co-substituted BiFeO₃ thin-film memristors for neuromorphic computing, teaching assistant in the physics laboratory, photographer, and self-taught software engineer.";

export const metadata: Metadata = {
  metadataBase: new URL("https://hasnain7abbas.github.io/hasnain-portfolio/"),
  title: "Hasnain Abbas: light, matter and code",
  description,
  openGraph: {
    title: "Hasnain Abbas: light, matter and code",
    description,
    type: "website",
    url: "https://hasnain7abbas.github.io/hasnain-portfolio/",
  },
};

export const viewport: Viewport = {
  themeColor: "#121514",
  colorScheme: "dark",
};

/* Marks the document as scripted so the title page can wait for its entrance,
   and releases it after a few seconds no matter what. */
const boot = `document.documentElement.classList.add("js");setTimeout(function(){document.documentElement.classList.add("is-ready")},4000);`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-view="page"
      suppressHydrationWarning
      className={`${cmSerif.variable} ${cmTypewriter.variable} ${kalam.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
