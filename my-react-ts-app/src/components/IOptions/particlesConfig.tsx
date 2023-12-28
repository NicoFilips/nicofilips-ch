// particlesConfig.ts
import { ISourceOptions } from '@tsparticles/engine';


export const getBlackSkyOptions = (): ISourceOptions => {
    return {  // Fügen Sie das return-Statement hinzu
        background: {
            color: {
                value: "#000000", // Schwarzer Hintergrund
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
                value: "#ffffff", // Farbe der Sterne (Weiß)
            },
            links: {
                enable: false, // Deaktiviert die Verbindungslinien zwischen den Partikeln
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: true,
                speed: 2,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                },
                value: 50, // Anzahl der Partikel (Sterne)
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: "star", // Form der Partikel als Sterne
            },
            size: {
                value: { min: 1, max: 3 }, // Größe der Sterne
            },
        },
        detectRetina: true,
    };
};
