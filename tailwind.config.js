const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  safelist: [
    'w-1/4', 'w-1/2', 'w-3/4', 'w-full' // Add any other width classes you might need
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
