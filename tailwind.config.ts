import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "2560px",
        "2xl": "1440px",
        xl: "1200px",
        lg: "900px",
        md: "768px",
        sm: "451px",
        xs: "375px",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        blue: {
          "50": "#ecebfe",
          "100": "#c4c0fb",
          "200": "#a8a2f9",
          "300": "#8078f7",
          "400": "#675df5",
          "500": "#4135f3",
          "600": "#3b30dd",
          "700": "#2e26ad",
          "800": "#241d86",
          "900": "#1b1666",
        },
        purple: {
          "50": "#f9eefe",
          "100": "#ebc9fb",
          "200": "#e1aff9",
          "300": "#d38bf6",
          "400": "#cb75f5",
          "500": "#be52f2",
          "600": "#ad4bdc",
          "700": "#873aac",
          "800": "#692d85",
          "900": "#502266",
        },
        neutral: {
          "1": "#ffffff",
          "2": "#fcfcfd",
          "3": "#f5f5f6",
          "4": "#f0f0f1",
          "5": "#d9d9dc",
          "6": "#c0bfc4",
          "7": "#8e8c95",
          "8": "#5b5966",
          "9": "#474553", // 464553
          "10": "#292637", // 282637
          "11": "#211f30",
          "12": "#171427",
          "13": "#030014",
        },
        semantic: {
          red: "#ff3b30",
          yellow: "#ffcc00",
          green: "#34c759",
          blue: "#32ade6",
        },
        brand: {
          blue: "#4135f3",
          purple: "#be52f2",
          dark: "#030014",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        marquee: {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(calc(-100% - var(--gap)))",
          },
        },
        "marquee-vertical": {
          from: {
            transform: "translateY(0)",
          },
          to: {
            transform: "translateY(calc(-100% - var(--gap)))",
          },
        },
      },
      animation: {
        marquee: "marquee var(--duration) infinite linear",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
