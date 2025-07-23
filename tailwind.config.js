// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Custom spacing for sidebar
      spacing: {
        72: "18rem", // 288px for sidebar width
      },
      animation: {
    'fade-up': 'fadeUp 1.2s ease-out',
    'fade-in': 'fadeIn 1.4s ease-in',
  },
  keyframes: {
    fadeUp: {
      '0%': { opacity: 0, transform: 'translateY(30px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' },
    },
    fadeIn: {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
  }
    },
  },
  plugins: [
    // Custom plugin for sidebar-active variants
    function ({ addVariant }) {
      addVariant("sidebar-active", ".sidebar-active &");
    },
  ],
};
