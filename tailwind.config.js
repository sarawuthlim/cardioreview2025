/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This line tells Tailwind to scan all .js, .jsx, .ts, and .tsx files in your src folder
    "./public/index.html", // You might also include your public HTML file if you use Tailwind classes there
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
