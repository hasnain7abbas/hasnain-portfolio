"use client";

import { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function ParticleBackground() {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const options: ISourceOptions = {
    fullScreen: false,
    fpsLimit: 60,
    particles: {
      number: {
        value: 60,
        density: { enable: true },
      },
      color: {
        value: theme === "dark" ? "#d97706" : "#b45309",
      },
      links: {
        enable: true,
        color: theme === "dark" ? "#d97706" : "#b45309",
        opacity: 0.15,
        distance: 150,
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: "none",
        outModes: { default: "bounce" },
      },
      opacity: {
        value: { min: 0.1, max: 0.3 },
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
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
