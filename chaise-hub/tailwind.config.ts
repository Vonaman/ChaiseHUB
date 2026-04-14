import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'accent-orange': 'var(--accent-orange)',
        'accent-orange-light': 'var(--accent-orange-light)',
        'accent-orange-dark': 'var(--accent-orange-dark)',
        'accent-orange-100': '#ffe8d4',
      },
    },
  },
  plugins: [],
}
export default config
