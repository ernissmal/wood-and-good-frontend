const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
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
        // Updated oak color palette to match your specified colors
        oak: {
          50: '#F5F1EA',    // Background
          100: '#F5F1EA',   // Light background
          200: '#e6d5bd',   // Soft beige
          300: '#d4b896',   // Light oak
          400: '#C37B42',   // Accent/contrast color
          500: '#C37B42',   // Primary oak (your accent color)  
          600: '#C37B42',   // Rich oak
          700: '#8A9A5B',   // Accent/contrast (green)
          800: '#4A3621',   // Headings color
          900: '#333333',   // Primary buttons/navigation
        },
        // Enhanced natural wood tones
        wood: {
          light: '#faf6f0',  // Very light wood background
          medium: '#e6d5bd', // Medium wood accent
          dark: '#8b5a2b',   // Dark wood contrast
        },
        // Warm earth tones for better visual hierarchy
        // Updated earth colors to match your specified colors
        earth: {
          50: '#F5F1EA',    // Background
          100: '#f0ece1',   // Light earth
          200: '#e6dcc8',   // Soft earth
          300: '#d8c9af',   // Medium earth
          400: '#C37B42',   // Accent/contrast (orange)
          500: '#C37B42',   // Primary earth
          600: '#b06936',   // Darker earth
          700: '#8A9A5B',   // Accent/contrast (green)
          800: '#4A3621',   // Headings color
          900: '#333333',   // Primary buttons/navigation
        },
        // Enhanced sustainability green with better contrast
        // Updated forest colors to match your specified colors
        forest: {
          50: '#F5F1EA',    // Background
          100: '#f2eee3',   // Light background
          200: '#e6dac7',   // Soft sage
          300: '#d4c5ab',   // Medium sage
          400: '#8A9A5B',   // Accent/contrast (green)
          500: '#8A9A5B',   // Primary forest
          600: '#7a8950',   // Darker forest
          700: '#6a7845',   // Dark forest
          800: '#4A3621',   // Headings color
          900: '#333333',   // Primary buttons/navigation
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
        // Text colors matching your specifications
        textPrimary: '#4A3621',    // Headings color
        textSecondary: '#666666',  // Body text color  
        textMuted: '#666666',      // Body text color
      },
      fontFamily: {
        // Enhanced typography with better readability
        display: ['Inter', ...fontFamily.sans],
        body: ['Inter', ...fontFamily.sans],
        sans: ['Inter', ...fontFamily.sans],
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
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}