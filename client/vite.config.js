/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';

// some prototype
// eslint-disable-next-line no-extend-native
Array.prototype.some = function someMatchUtil(fun) {
  const len = this.length;
  for (let i = 0; i < len; i += 1) {
    if (fun(this[i], i, this)) {
      return true;
    }
  }
  return false;
};

export default defineConfig(async ({ command }) => {
  const isDev = command === 'serve';

  const plugins = [
    svgr({
      svgrOptions: {
        ref: true,
      },
    }),
    {
      name: 'singleHMR',
      handleHotUpdate({
        modules,
      }) {
        return modules;
      },
    },
    react({
      include: '**/*.jsx',
    }),
  ];

  // Dev-only tooling: the eslint overlay and the Million Lint profiler add
  // build time and ship instrumentation, so keep them out of `vite build`.
  // Million is a dynamic import so a production `vite build` never needs the
  // (dev-only) package installed.
  if (isDev) {
    plugins.push(eslint());
    const { default: MillionLint } = await import('@million/lint');
    plugins.unshift(MillionLint.vite());
  }

  return {
    plugins,
    server: {
      port: 3000,
      host: true,
    },
    build: {
      outDir: './build',
      rollupOptions: {
        output: {
          // Keep third-party code in its own chunk so an app-code change
          // between deploys doesn't bust the (large, rarely-changing) vendor cache.
          manualChunks(id) {
            if (id.includes('node_modules')) return 'vendor';
            return undefined;
          },
        },
      },
    },
  };
});
