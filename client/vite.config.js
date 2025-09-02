import MillionLint from '@million/lint';
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
const millionPlugins = [svgr({
  svgrOptions: {
    ref: true,
  },
}), {
  name: 'singleHMR',
  handleHotUpdate({
    modules,
  }) {
    return modules;
  },
}, react({
  include: '**/*.jsx',
}), eslint()];
millionPlugins.unshift(MillionLint.vite());
export default defineConfig({
  plugins: millionPlugins,
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: './build',
  },
});
