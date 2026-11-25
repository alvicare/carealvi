/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "#FFFFFF",
        surface: "#EEEFEC",
        primary: "#1E2023",
        muted: "#626B6A",
        subtle: "#626B6A",
        numeral: "#AAB7B5",
        divider: "#DCE5E3",
        darkPill: "#0B4F4A",
        darkPillHover: "#0B4F4A",
        slateAccent: "#0F766E",
        slateLight: "#54C2B4",
        slateMist: "rgba(15, 118, 110, 0.08)",
        frostedBorder: "rgba(220, 229, 227, 0.6)",
        brand: {
          teal: "#0F766E",
          deep: "#0B4F4A",
          mint: "#14B8A6",
          "mint-bright": "#54C2B4",
          orange: "#F59E5B",
          dark: "#083B37",
          shadow: "#072B28",
          pale: "#EEEFEC",
        },
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'var(--font-inter)', 'sans-serif'],
        sans: [
          'var(--font-inter)',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
      },
      borderRadius: {
        pill: "100px",
        card: "32px",
        hud: "20px",
      },
      transitionTimingFunction: {
        'apple-ease': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'apple-spring': 'cubic-bezier(0.34, 1.3, 0.64, 1)',
      },
    },
  },
  plugins: [],
};
