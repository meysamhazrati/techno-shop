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
        skeleton: "#e4e4e7",
        shimmer: "rgb(255 255 255 / 0.5)",
      },
      fontFamily: {
        "vazirmatn-regular": "vazirmatn-regular",
        "vazirmatn-medium": "vazirmatn-medium",
        "vazirmatn-bold": "vazirmatn-bold",
        "vazirmatn-black": "vazirmatn-black",
      },
      keyframes: {
        shimmer: {
          "0%": {
            transform: "translateX(-250%) skewX(-20deg)",
          },
          "100%": {
            transform: "translateX(250%) skewX(-20deg)",
          },
        },
        loader: {
          "33%": {
            "background-size":
              "calc(100% / 3) 0%, calc(100% / 3) 100%, calc(100% / 3) 100%",
          },
          "50%": {
            "background-size":
              "calc(100% / 3) 100%, calc(100% / 3) 0%, calc(100% / 3) 100%",
          },
          "66%": {
            "background-size":
              "calc(100% / 3) 100%, calc(100% / 3) 100%, calc(100% / 3) 0%",
          },
        },
      },
      animation: {
        shimmer: "shimmer 2.5s ease infinite",
        loader: "loader 0.7s linear infinite",
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
