// particlesConfig.ts
import { ISourceOptions } from '@tsparticles/engine';

export const getBlackSkyOptions = (): ISourceOptions => {
  return {
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: 'push',
        },
        onHover: {
          enable: true,
          mode: 'repulse',
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: '#ffffff', // Color of the starts (white)
      },
      links: {
        enable: true, // Deactivate the links between the stars
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: {
          default: 'bounce',
        },
        random: true,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: 100, // Amount of stars
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: 'circle', // form of the stars
      },
      size: {
        value: { min: 1, max: 3 }, // size of the stars
      },
    },
    detectRetina: true,
  };
};
