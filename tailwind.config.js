/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "montserrat-thin": ["Montserrat-Thin", "sans-serif"],
        "montserrat-regular": ["Montserrat-Regular", "sans-serif"],
        "montserrat-medium": ["Montserrat-Medium", "sans-serif"],
        "montserrat-bold": ["Montserrat-Bold", "sans-serif"],
      },
      colors: {
        main: "#093867", // --main
        hover: "#0d4e993a", // --hover
        btnColor: "#01499F", // --btn-color
        white: "#ffffff",
        black: "#000000",
        grey: "#343434",
        medGrey: "#65676f",
        liteGrey: "#dadada",
        headTxt: "#093867", // Example
        textSec: "#74808c",
        txtLight: "#ffffff",
        red: "#ff0000",
      },
      maxWidth: {
        wrapper: "1280px", // Example max-width for #root
      },
      minWidth: {
        wrapper: "320px",
      },
    },
  },
  plugins: [],
};
