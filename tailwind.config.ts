import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Enhanced warm oak-inspired color palette with better contrast
        oak: {
          50: '#fefbf7',    // Very light cream
          100: '#fdf4e6',   // Light cream
          200: '#fae7c4',   // Soft beige
          300: '#f4d49b',   // Light oak
          400: '#e8b86d',   // Medium oak
          500: '#d4823a',   // Primary oak
          600: '#c17532',   // Rich oak (better contrast)
          700: '#9e5d28',   // Dark oak
          800: '#7c4327',   // Deep oak
          900: '#5a2f1a',   // Darkest oak
        },
        // Enhanced natural wood tones
        wood: {
          light: '#faf6f0',  // Very light wood background
          medium: '#e6d5bd', // Medium wood accent
          dark: '#8b5a2b',   // Dark wood contrast
        },
        // Warm earth tones for better visual hierarchy
        earth: {
          50: '#fbf9f6',     // Light earth
          100: '#f5f0e8',    // Cream earth
          200: '#e8dcc8',    // Beige earth
          300: '#d4c2a1',    // Medium earth
          400: '#b8a082',    // Rich earth
          500: '#9d7f63',    // Primary earth
          600: '#826548',    // Dark earth
          700: '#6b4f3a',    // Deep earth
          800: '#4a3426',    // Darker earth
          900: '#2d1f16',    // Darkest earth
        },
        // Enhanced sustainability green with better contrast
        forest: {
          50: '#f4fbf4',     // Very light green
          100: '#e6f4e6',    // Light green
          200: '#c2e7c2',    // Soft green
          300: '#94d294',    // Medium green
          400: '#66bb6a',    // Bright green
          500: '#4caf50',    // Primary green
          600: '#43a047',    // Rich green
          700: '#388e3c',    // Dark green
          800: '#2e7d32',    // Deep green
          900: '#1b5e20',    // Darkest green
        },
        // Neutral grays for text and backgrounds
        neutral: {
          50: '#fafaf9',     // Off-white
          100: '#f5f5f4',    // Light gray
          200: '#e7e5e4',    // Soft gray
          300: '#d6d3d1',    // Medium light gray
          400: '#a8a29e',    // Medium gray
          500: '#78716c',    // Primary gray
          600: '#57534e',    // Rich gray
          700: '#44403c',    // Dark gray
          800: '#292524',    // Deep gray
          900: '#1c1917',    // Darkest gray
        },
        // High contrast text colors
        text: {
          primary: '#1c1917',     // Primary text (very dark brown)
          secondary: '#44403c',   // Secondary text (dark gray)
          accent: '#8b5a2b',      // Accent text (darker oak for better contrast)
          muted: '#6b5b54',       // Muted text (darker medium gray)
          inverse: '#ffffff',     // Inverse text (pure white)
        }
      },
      fontFamily: {
        // Enhanced typography with better readability
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // Enhanced font sizes for better hierarchy
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        // Enhanced spacing scale
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "warm-gradient": "linear-gradient(135deg, #faf6f0 0%, #e6d5bd 100%)",
        "oak-gradient": "linear-gradient(135deg, #fdf4e6 0%, #f4d49b 50%, #d4823a 100%)",
        "earth-gradient": "linear-gradient(135deg, #fbf9f6 0%, #e8dcc8 100%)",
      },
      boxShadow: {
        'warm': '0 4px 6px -1px rgba(212, 130, 58, 0.1), 0 2px 4px -1px rgba(212, 130, 58, 0.06)',
        'warm-lg': '0 10px 15px -3px rgba(212, 130, 58, 0.1), 0 4px 6px -2px rgba(212, 130, 58, 0.05)',
        'oak': '0 4px 6px -1px rgba(158, 93, 40, 0.1), 0 2px 4px -1px rgba(158, 93, 40, 0.06)',
      },
    },
  },
  plugins: [],
} satisfies Config;