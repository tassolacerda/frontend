/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xl2': '1300px',
        'xl3': '1450px',
        'xl4': '1600px',
        '2xl': '1800px',
      },
      fontFamily: {
        sans: ['SF Pro Display', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      spacing: {
        // Fluid spacing scale usando clamp
        'fluid-xs': 'clamp(0.5rem, 1vw, 1rem)',      // 8px - 16px
        'fluid-sm': 'clamp(0.75rem, 1.5vw, 1.5rem)', // 12px - 24px
        'fluid-md': 'clamp(1rem, 2vw, 2rem)',        // 16px - 32px
        'fluid-lg': 'clamp(1.5rem, 3vw, 3rem)',      // 24px - 48px
        'fluid-xl': 'clamp(2rem, 4vw, 4rem)',        // 32px - 64px
        'fluid-2xl': 'clamp(2.5rem, 5vw, 5rem)',     // 40px - 80px
        'fluid-3xl': 'clamp(3rem, 6vw, 6rem)',       // 48px - 96px
      },
      padding: {
        // Container padding responsivo
        'container-mobile': '1.5rem',   // 24px
        'container-tablet': '3rem',     // 48px
        'container-desktop': '6rem',    // 96px
      },
      height: {
        'bento-sm': '260px',
        'bento-lg': '528px',
      },
      width: {
        'bento-col1': '686px',
        'bento-col2': '400px',
        'bento-col3': '626px',
      },
      maxWidth: {
        'container': '1782px',
        'content-sm': '600px',
        'content-md': '800px',
        'content-lg': '1200px',
      },
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/container-queries"),
  ],
  daisyui: {
    themes: [
      {
        blackwhite: {
          "primary": "#000000",        // Black
          "secondary": "#404040",      // Dark gray
          "accent": "#666666",         // Medium gray
          "neutral": "#1a1a1a",        // Almost black
          "base-100": "#ffffff",       // White
          "base-200": "#f5f5f5",       // Very light gray
          "base-300": "#e5e5e5",       // Light gray
          "info": "#737373",           // Gray
          "success": "#404040",        // Dark gray (no green)
          "warning": "#595959",        // Medium-dark gray (no orange)
          "error": "#1a1a1a",          // Almost black (no red)
        },
      },
    ],
  },
}
