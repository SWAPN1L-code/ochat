/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // WhatsApp Color Palette
        primary: "#25D366", // WhatsApp green
        primary_hover: "#20BD5A", // Darker green on hover
        secondary: "#128C7E", // Dark green accent
        
        // Light theme - WhatsApp style
        backgroundLight1: "#FFFFFF", // Pure white
        backgroundLight2: "#F0F2F5", // Chat list background
        backgroundLight3: "#E9EDEF", // Borders, dividers
        
        text_light_primary: "#111B21", // Primary text
        text_light_secondary: "#667781", // Secondary text, timestamps
        
        // Dark theme - WhatsApp style
        text_dark_primary: "#E9EDEF", // Primary text in dark
        text_dark_secondary: "#8696A0", // Secondary text in dark
        backgroundDark1: "#2A3942", // Borders in dark
        backgroundDark2: "#202C33", // Panels, chat list
        backgroundDark3: "#0B141A", // Main background
        
        // WhatsApp specific colors
        whatsapp_teal: "#075E54", // Header background light
        whatsapp_green_light: "#DCF8C6", // Sent message bubble light
        whatsapp_green_dark: "#005C4B", // Sent message bubble dark
        whatsapp_bubble_light: "#FFFFFF", // Received message light
        whatsapp_bubble_dark: "#202C33", // Received message dark
        whatsapp_active: "#E7F8EE", // Active chat highlight
        
        // Additional utility colors
        border_light: "#E9EDEF",
        border_dark: "#2A3942",
        hover_light: "#F5F6F6",
        hover_dark: "#2A3942",
      },

      screens: {
        sm: { max: "640px" },
        md: { max: "768px" },
        lg: { max: "1024px" },
        xl: { max: "1280px" },
      },

      fontFamily: {
        poppins: ["var(--font-poppins)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};