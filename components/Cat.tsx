"use client";

import { useEffect, useRef } from "react";
import { initCat } from "@/lib/cat";

/*
 * Schrödinger's cat and its box. The roaming code in lib/cat.ts is adapted
 * from Paperwren (https://github.com/Razee4315/Paperwren) under the MIT
 * License. See THIRD_PARTY_NOTICES.md.
 */

/** The ψ box. In the nav it is the cat's home; elsewhere it is just the mark. */
export function CatBox({ size = 30, home = false }: { size?: number; home?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      overflow="visible"
      aria-hidden="true"
      data-cat-home={home ? "" : undefined}
    >
      <g data-box>
        <path d="M10 30 L 20 24 L 56 24 L 46 30 Z" fill="#4a3420" />
        <path
          d="M46 30 L 56 24 L 56 51 L 46 58 Z"
          fill="#a47b49"
          stroke="#6b4c2a"
          strokeWidth=".8"
          strokeLinejoin="round"
        />
        <path d="M10 30 L 46 30 L 46 58 L 10 58 Z" fill="#c49a63" stroke="#6b4c2a" strokeWidth=".8" strokeLinejoin="round" />
        <text x="28" y="51" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="20" fill="#132b27">
          ψ
        </text>
        <g data-lid>
          <path
            d="M10 30 L 20 24 L 56 24 L 46 30 Z"
            fill="#d4ad78"
            stroke="#6b4c2a"
            strokeWidth=".8"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}

/** The cat, awake and asleep, in a layer that scrolls with the page. */
export default function QuantumCat() {
  const sky = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const home = document.querySelector<SVGSVGElement>("[data-cat-home]");
    if (!sky.current || !home) return;
    return initCat(sky.current, home);
  }, []);

  return (
    <div className="cat-sky" aria-hidden="true" ref={sky}>
      <div className="flyer" data-flyer hidden>
        <svg viewBox="0 0 64 64" width="40" height="40" overflow="visible">
          <g data-part="awake">
            <g data-part="tail">
              <path className="tail" d="M19 56 C 8 57, 3 49, 6 41 C 8 36, 12 35, 13 38" />
            </g>
            <path
              className="fur"
              d="M14 59 C 10 52, 12 44, 18 40 C 23 36, 28 31, 34 29 L 41 29.5 C 43.5 34, 44 40, 43 45.5 L 43.6 59 Z"
            />
            <path className="light chest" d="M40.5 32 C 43 36, 43.4 41, 42.4 45.5 C 41 42, 39.6 37.5, 38.6 33.5 Z" />
            <path className="line" d="M39.6 59 L 39.2 48.5" />
            <path className="line" d="M33.5 58.6 C 33.5 51, 29 46, 22.5 45.5" />
            <g data-part="head">
              <path className="fur" d="M35.5 17.5 L 36 7 L 42 13.2 Z" />
              <path className="pink" d="M37.2 14.6 L 37.5 9.8 L 40.4 12.8 Z" />
              <g data-part="ear">
                <path className="fur" d="M44 13.2 L 50 7 L 50.5 17.5 Z" />
                <path className="pink" d="M45.6 12.8 L 48.6 9.8 L 48.8 14.6 Z" />
              </g>
              <path
                className="fur"
                d="M34.5 22 C 34.5 16, 38 12.6, 43 12.6 C 48 12.6, 51.5 16, 51.5 22 C 51.5 27, 48 30.2, 43 30.2 C 38 30.2, 34.5 27, 34.5 22 Z"
              />
              <g data-part="eyes">
                <ellipse className="eye" cx="39.4" cy="21" rx="1.75" ry="2.3" />
                <ellipse className="eye" cx="46.6" cy="21" rx="1.75" ry="2.3" />
                <ellipse className="pupil" cx="39.4" cy="21" rx=".55" ry="1.8" />
                <ellipse className="pupil" cx="46.6" cy="21" rx=".55" ry="1.8" />
              </g>
              <path className="pink" d="M41.9 24.6 L 44.1 24.6 L 43 25.9 Z" />
              <path className="whisk" d="M43 25.9 V 26.9 M43 26.9 Q 41.9 27.8 40.9 27.1 M43 26.9 Q 44.1 27.8 45.1 27.1" />
              <path className="whisk" d="M37 25 L 30.5 24 M37 26.5 L 30.5 27.6 M49 25 L 55.5 24 M49 26.5 L 55.5 27.6" />
            </g>
          </g>
          <g data-part="asleep">
            <g data-part="breath">
              <path
                className="fur"
                d="M9 59 C 8 49, 16 41.5, 29 40.5 C 41 39.6, 51 45, 53.5 52.5 C 54.5 56, 54 59, 52 59 Z"
              />
              <path className="line" d="M22 45 C 25 43.5, 29 43, 32 43.3" />
              <path className="tail-curl" d="M11.5 57.2 C 18 61, 33 61, 41 58.4" />
              <path className="fur" d="M38.6 46.2 L 39 38.8 L 43.6 43.4 Z" />
              <path className="pink" d="M39.9 43.8 L 40.1 40.9 L 42.2 43 Z" />
              <g data-part="sleep-ear">
                <path className="fur" d="M45.8 42.8 L 50.8 39.2 L 51.2 45.8 Z" />
              </g>
              <path
                className="fur"
                d="M37.4 50 C 37.4 45.4, 40.8 42.4, 45 42.4 C 49.4 42.4, 52.8 45.4, 52.8 50 C 52.8 54.2, 49.6 57.4, 45 57.4 C 40.6 57.4, 37.4 54.2, 37.4 50 Z"
              />
              <path className="line" d="M37.6 51.6 C 38.4 55, 41.2 57.4, 45 57.4" />
              <path className="shut" d="M40.2 49.6 Q 41.8 51.1 43.4 49.6 M46.6 49.6 Q 48.2 51.1 49.8 49.6" />
              <path className="pink" d="M44.2 52.2 L 45.6 52.2 L 44.9 53.1 Z" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
