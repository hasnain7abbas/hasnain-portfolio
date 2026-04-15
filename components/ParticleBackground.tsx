"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function ParticleBackground() {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const options: ISourceOptions = {
    fullScreen: false,
    fpsLimit: isMobile ? 30 : 60,
    particles: {
      number: {
        value: isMobile ? 25 : 60,
        density: { enable: true },
      },
      color: {
        value: theme === "dark" ? "#d97706" : "#b45309",
      },
      links: {
        enable: true,
        color: theme === "dark" ? "#d97706" : "#b45309",
        opacity: 0.15,
        distance: isMobile ? 120 : 150,
      },
      move: {
        enable: true,
        speed: isMobile ? 0.5 : 0.8,
        direction: "none",
        outModes: { default: "bounce" },
      },
      opacity: {
        value: { min: 0.1, max: 0.3 },
      },
      size: {
        value: { min: 1, max: isMobile ? 2 : 3 },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: !isMobile,
          mode: "repulse",
        },
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    detectRetina: true,
  };

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="absolute inset-0 -z-10"
    />
  );
}
