"use client";

import { useEffect, useRef } from "react";
import { initWren } from "@/lib/wren";

/*
 * The wren is Paperwren's mascot (https://github.com/Razee4315/Paperwren),
 * used under the MIT License. See THIRD_PARTY_NOTICES.md.
 */

const WING =
  "M44 32 C 44 20, 38.5 6.5, 22 -4 C 24 1, 22.5 4, 24.5 6.5 C 22 8.2, 22 11.2, 24.5 13 C 22 15, 22.5 18, 25 19.5 C 23 21.5, 23.5 24.5, 26.5 25.5 C 25 27.5, 26 30, 28.5 31 L 30 34 Z";

/** The perched wren, same geometry as Paperwren's assets/brand/wren.svg. */
export function WrenMark({
  size = 30,
  home = false,
  light = false,
}: {
  size?: number;
  home?: boolean;
  light?: boolean;
}) {
  const body = light ? "#f4efe4" : "#2b6e66";
  const dark = light ? "#cfe3dd" : "#1f5750";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      data-wren-home={home ? "" : undefined}
    >
      <path d="M27 27.5 L12.6 9.6 Q10.8 7.4 8.6 8.8 L6.6 10.4 Q4.6 12 6 14.2 L19.5 33.5 Z" fill={dark} />
      <path d="M29 53 L27.5 59 M35 53 L36 59" stroke={dark} strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M50.5 19 C48 12.5 39 11 35 17 C32.5 21 29 24.5 24 26.5 C15.5 30 13 38 15.5 44.5 C18.5 51.5 25.5 55 33 54.5 C44 54 51.5 45.5 51.5 34 C51.5 29.5 52.5 26 53.5 24 Z"
        fill={body}
      />
      <path
        d="M52.6 25 C51.6 28 51.5 31 51.5 34 C51.5 45.5 44 53.5 33 54.5 C39.5 50.5 43.5 44.5 44.8 37.5 C46 31.5 48.5 27 52.6 25 Z"
        fill="#8fbcb3"
      />
      <path d="M45 34 C41 27.5 29 27 21 33.5 L14.5 38 C23 45.5 38 45.5 45 34 Z" fill={dark} />
      <path d="M51.4 19 Q56 20.2 59.5 22.6 Q55.5 23.6 52.4 24.4 Z" fill="#e07a4f" />
      <circle cx="45" cy="19.5" r="2.1" fill={light ? "#1f1e1b" : "#23221f"} />
    </svg>
  );
}

/** The same wren with wings that open, in a layer that scrolls with the page. */
export default function FlyingWren() {
  const sky = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const home = document.querySelector<SVGSVGElement>("[data-wren-home]");
    if (!sky.current || !home) return;
    return initWren(sky.current, home);
  }, []);

  return (
    <div className="wren-sky" aria-hidden="true" ref={sky}>
      <div className="flyer" data-flyer hidden>
        <svg viewBox="0 0 64 64" width="34" height="34" overflow="visible">
          <g data-part="far">
            <path d={WING} className="far" />
          </g>
          <g data-part="tail">
            <path d="M27 27.5 L12.6 9.6 Q10.8 7.4 8.6 8.8 L6.6 10.4 Q4.6 12 6 14.2 L19.5 33.5 Z" className="dark" />
          </g>
          <g data-part="legs">
            <path d="M29 53 L27.5 59 M35 53 L36 59" className="legs" />
          </g>
          <path
            d="M50.5 19 C48 12.5 39 11 35 17 C32.5 21 29 24.5 24 26.5 C15.5 30 13 38 15.5 44.5 C18.5 51.5 25.5 55 33 54.5 C44 54 51.5 45.5 51.5 34 C51.5 29.5 52.5 26 53.5 24 Z"
            className="body"
          />
          <path
            d="M52.6 25 C51.6 28 51.5 31 51.5 34 C51.5 45.5 44 53.5 33 54.5 C39.5 50.5 43.5 44.5 44.8 37.5 C46 31.5 48.5 27 52.6 25 Z"
            className="belly"
          />
          <g data-part="fold">
            <path d="M45 34 C41 27.5 29 27 21 33.5 L14.5 38 C23 45.5 38 45.5 45 34 Z" className="dark" />
          </g>
          <g data-part="near" style={{ display: "none" }}>
            <path d={WING} className="dark" />
            <path d="M43.5 32.5 C 43 25, 40 17.5, 34 11 C 31.5 17.5, 30.5 25, 31.5 33.5 Z" className="coverts" />
          </g>
          <path d="M51.4 19 Q56 20.2 59.5 22.6 Q55.5 23.6 52.4 24.4 Z" className="beak" />
          <g data-part="eye">
            <circle cx="45" cy="19.5" r="2.1" className="eye" />
          </g>
        </svg>
      </div>
    </div>
  );
}
