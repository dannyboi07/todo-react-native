/** @type {import('tailwindcss').Config} */
// tailwind.config.js

module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
        colors: {
            white: "rgb(255, 255, 255)",
            black: "rgb(0, 0, 0)",
            // light theme colours
            "v-light-gray": "hsl(0, 0%, 98%)",
            "v-light-grayish-blue": "hsl(236, 33%, 92%)",
            "light-grayish-blue": "hsl(233, 11%, 84%)",
            "dark-grayish-blue": "hsl(236, 9%, 61%)",
            "v-dark-grayish-blue": "hsl(235, 19%, 35%)",
            // dark theme colours
            "v-dark-blue": "hsl(235, 21%, 11%)",
            "v-dark-desat-blue": "hsl(235, 24%, 19%)",
            "light-grayish-blue-2": "hsl(234, 39%, 85%)",
            "light-grayish-blue-2--hover": "hsl(236, 33%, 92%)",
            "dark-grayish-blue-2": "hsl(234, 11%, 52%)",
            "dark-grayish-blue-3": "hsl(233, 14%, 35%)",
            "v-dark-grayish-blue-2": "hsl(237, 14%, 26%)",
        },
        fontFamily: {
            sans: ["Josefin Sans", "sans-serif"],
        },
    },
    plugins: [],
};
