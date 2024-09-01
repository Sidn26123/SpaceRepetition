/** @type {import('tailwindcss').Config} */
module.exports = {
    // darkMode: ["selector", '[data-mode="dark"]'],
    darkMode: 'selector',
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
              sans: ['Roboto', 'Arial', 'sans-serif'], // Đặt phông chữ mặc định cho sans
              serif: ['Georgia', 'serif'],
              mono: ['Courier', 'monospace'],
            },
            colors: {
              background: "rgba(var(--background-color))",
              text: "rgba(var(--text-color))",
            }
          },
    },
    plugins: [],
};
// :root {
//     --background-color: #818181;
//     --text-color: #2D2D2F;
//     --primary-color: #007bff;
//     --secondary-color: #6c757d;
//     --success-color: #28a745;
//     --danger-color: #dc3545;
//     --warning-color: #ffc107;
//     --info-color: #17a2b8;
//     --line-break: #818181;
// }