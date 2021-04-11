// tailwind.config.js
module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    minHeight: {
      '1/2': '50%',

    },
  },
};
