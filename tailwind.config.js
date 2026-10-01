/** @type {import('tailwindcss').Config} */

// Enables Tailwind's `/opacity` modifier (e.g. `bg-primary/10`,
// `border-cLightGrey/20`) for colors backed by CSS variables. Tailwind
// can only compute an opacity slice from raw R G B numbers, not from a
// `var(--x)` reference to a hex string - so each color here reads its
// `-rgb` variable (see styles/globals.css :root) and wraps it as
// `rgb(var(--x-rgb) / <alpha>)`.
function withOpacity(cssVariable) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgb(var(${cssVariable}) / ${opacityValue})`
    }
    return `rgb(var(${cssVariable}))`
  }
}

module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    // If using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // If using `app` directory:
    "./app/**/*.{ts,tsx}"
  ],
  darkMode: ["class"],
  theme: {
    transitionDuration: {
      DEFAULT: "300ms"
    },
    fontFamily: {
      // Inter comse from globals.css -> google fonts import
      inter: ["Inter", "sans-serif"],
      // JetBrains Mono comes from globals.css -> google fonts import
      // used for terminal/code-styled UI accents (hero, nav, badges)
      mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"]
    },
    extend: {
      // Colors come from globals.css -> :root variables (the -rgb ones,
      // via withOpacity() above - see the comment on that function)
      colors: {
        current: "currentColor",
        transparent: "transparent",
        cLight: withOpacity("--light-color-rgb"), // #f5f5f5
        cDark: withOpacity("--dark-color-rgb"), // #1a1a1a
        cOffWhite: withOpacity("--off-white-rgb"), // #e8e8e8
        cDeepDark: withOpacity("--deep-dark-rgb"), // #0a0a0a
        cLightGrey: withOpacity("--light-grey-rgb"), // #a3a3a3
        primary: withOpacity("--primary-color-rgb"), // #f97316
        primaryLight: withOpacity("--primary-light-color-rgb"), // #fb923c
        primaryDark: withOpacity("--primary-dark-color-rgb"), // #c2410c
        error: withOpacity("--error-color-rgb"), // #c2473e
        success: withOpacity("--success-color-rgb") // #22c55e
      },
      fontSize: {
        // Custom font sizes added to different elements (optional)
        // customTitle: ["12px", "20px"]
      },
      screens: {
        // Custom breakpoint added to extra small devices
        xs: "360px"
      },
      maxWidth: {
        // Custom container width
        "c-1315": "82.188rem",
        "c-1280": "80rem",
        "c-1016": "63.5rem"
      },
      keyframes: {
        line: {
          "0%, 100%": { transform: "translateY(100%)" },
          "50%": { transform: "translateY(0)" }
        }
      },
      animation: {
        line1: "line 3s linear infinite",
        line2: "line 6s linear infinite",
        line3: "line 9s linear infinite"
      }
    },
    container: {
      // Override default container padding
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "12rem"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
}
