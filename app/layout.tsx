import type { Metadata, Viewport } from "next";
import { Kalam } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";

/*
 * Computer Modern (CMU Serif and Typewriter, SIL OFL; see public/fonts/CMU-OFL.txt)
 * is declared by hand in globals.css, so that only the regular face, which the
 * first screen needs, is preloaded. The others load when text uses them.
 */
const BASE = "/hasnain-portfolio";

const kalam = Kalam({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["300", "400"],
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

/* Marks the page as scripted before first paint, so handwriting waits to be written.
   If the page script has not started within five seconds, everything is simply shown. */
const boot = `(function(d){d.classList.add("js");setTimeout(function(){if(!d.dataset.chalk)d.classList.remove("js")},5000)})(document.documentElement);`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-view="page" suppressHydrationWarning className={kalam.variable}>
      <head>
        <link rel="preload" href={`${BASE}/fonts/cmu-serif-500-roman.woff2`} as="font" type="font/woff2" crossOrigin="" />
        <script data-keep dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        {children}
        <script data-keep src={`${BASE}/site.js`} defer />
      </body>
    </html>
  );
}
