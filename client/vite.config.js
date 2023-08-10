/* eslint-disable import/no-extraneous-dependencies */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [svgr({
    svgrOptions: {
      ref: true,
    },
  }), {
    name: 'singleHMR',
    handleHotUpdate({ modules }) {
      modules.map((m) => {
        m.importers = new Set();
        return m;
      });

      return modules;
    },
  }, react(), eslint()],
  server: {
    port: 3000, host: true,
  },
  build: {
    outDir: './build',
  },
});
