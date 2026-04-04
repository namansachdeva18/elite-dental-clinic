/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cabinet Grotesk"', 'sans-serif'],
        sans: ['"General Sans"', 'sans-serif'],
        mono: ['"Geist Mono"', 'monospace'],
      },
      colors: {
        primary: '#9A7B4F', // Elite Gold/Bronze from Logo
        dark: '#0A0A0A',
        light: '#FFFFFF',
        muted: '#6B7280',
        graybg: '#F3F4F6'
      },
      animation: {
        spin: 'spin 20s linear infinite',
      }
    },
  },
  plugins: [],
}
