import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Oak wood inspired color palette
        oak: {
          50: '#fdf8f0',
          100: '#fcefd8',
          200: '#f8dcb0',
          300: '#f2c177',
          400: '#eba044',
          500: '#d4823a',
          600: '#b8692f',
          700: '#985129',
          800: '#7c4327',
          900: '#653723',
        },
        // Natural wood tones
        wood: {
          light: '#f5f0e6',
          medium: '#d4b896',
          dark: '#8b5a2b',
        },
        // Green for sustainability theme
        forest: {
          50: '#f0f9f0',
          100: '#dcf2dc',
          200: '#bce5bc',
          300: '#8fd38f',
          400: '#5bb85b',
          500: '#3a9b3a',
          600: '#2d7d2d',
          700: '#256325',
          800: '#1f4f1f',
          900: '#1a421a',
        }
      },
      fontFamily: {
        // Professional fonts for furniture business
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        // Wood grain patterns for hero sections
        "wood-grain": "url('/images/wood-grain-pattern.jpg')",
      },
    },
  },
  plugins: [],
} satisfies Config;