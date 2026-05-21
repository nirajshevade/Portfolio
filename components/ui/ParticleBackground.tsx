"use client";

import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, Engine } from "@tsparticles/engine";

export function ParticleBackground() {
  const particlesInit = async (engine: Engine) => {
    // loadSlim is lightweight and has everything we need for constellation/glowing effects
    await loadSlim(engine);
  };

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log("Particles loaded", container);
  };

  return (
    <ParticlesProvider init={particlesInit}>
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        className="absolute inset-0 z-0 pointer-events-auto mix-blend-screen"
      style={{
        filter: "drop-shadow(0 0 10px rgba(0, 243, 255, 0.5))", // Adds the soft bloom effect
      }}
      options={{
        background: {
          color: {
            value: "transparent", // Let the footer background show through
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: {
              enable: true,
            },
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
              factor: 3, // ripple wave effect
              speed: 1,
            },
          },
        },
        particles: {
          color: {
            // Neon gradients: Cyberpunk Blue, Purple, Red
            value: ["#00f3ff", "#9d00ff", "#ff003c"],
          },
          links: {
            color: "#8a2be2", // Purple constellation lines
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1.5,
            triangles: {
              enable: false,
            },
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce", // Keeps them bouncing around
            },
            random: true,
            speed: 0.8, // Smooth drift
            straight: false,
          },
          number: {
            density: {
              enable: true,
              width: 800,
              height: 800,
            },
            value: 120, // High enough to look like a lot, low enough to run smooth
          },
          opacity: {
            value: { min: 0.1, max: 0.8 },
            animation: {
              enable: true,
              speed: 1,
              sync: false,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 }, // Depth of field blur variation
            animation: {
              enable: true,
              speed: 2,
              sync: false,
            },
          },
          shadow: {
            enable: true,
            blur: 5,
            color: "#00f3ff",
          },
        },
        detectRetina: true,
      }}
    />
    </ParticlesProvider>
  );
}
