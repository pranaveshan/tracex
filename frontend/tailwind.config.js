/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070b14',
          900: '#0b1120',
          850: '#0f172a',
          800: '#1e293b',
          700: '#334155',
        },
        cyber: {
          cyan: '#06b6d4',
          blue: '#3b82f6',
          amber: '#f59e0b',
          crimson: '#ef4444',
          emerald: '#10b981',
          purple: '#8b5cf6'
        }
      }
    },
  },
  plugins: [],
}
