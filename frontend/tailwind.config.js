/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "rgb(250,251,252)",
                accent: "rbg(64,112,219)",
                container: "rgb(255,255,255)",
            },
            fontFamily: {
                sans: ["Ubuntu"],
            },
        },
    },
    plugins: [],
}
