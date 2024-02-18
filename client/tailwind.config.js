export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "primary-50": "#ACD3F3",
        "primary-100": "#8FC4EE",
        "primary-200": "#88C0ED",
        "primary-300": "#7FBBEC",
        "primary-400": "#74B5EA",
        "primary-500": "#66AEE8",
        "primary-600": "#55A5E5",
        "primary-700": "#3F99E2",
        "primary-800": "#248BDE",
        "primary-900": "#0279D9",
      },
      fontFamily: {
        "vazirmatn-regular": "vazirmatn-regular",
        "vazirmatn-medium": "vazirmatn-medium",
        "vazirmatn-bold": "vazirmatn-bold",
        "vazirmatn-black": "vazirmatn-black",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          lg: "2rem",
        },
      },
    },
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [],
};