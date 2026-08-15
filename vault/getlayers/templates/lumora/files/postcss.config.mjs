const config = {
  plugins: {
    // Pin Tailwind's resolution base to this project dir. The plugin defaults
    // `base` to `process.cwd()`; when the build is invoked from the parent
    // `getlayers-templates` packaging tooling (cwd above this project), it would
    // otherwise try to resolve `@import "tailwindcss"` from the wrong root and
    // fail with "Can't resolve 'tailwindcss'".
    "@tailwindcss/postcss": { base: import.meta.dirname },
  },
};

export default config;
