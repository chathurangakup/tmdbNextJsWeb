import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
     colors:{
      primary:'#090b0e',
      secondry:'#1b1c21',
      textcolor:'#646464',
     }
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
export default config;
