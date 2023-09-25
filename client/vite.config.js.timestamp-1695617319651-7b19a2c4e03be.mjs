// vite.config.js
import { defineConfig } from "file:///Users/mindgamesnl/workspaces/openaudiomc/OpenAudioMc/client/node_modules/vite/dist/node/index.js";
import react from "file:///Users/mindgamesnl/workspaces/openaudiomc/OpenAudioMc/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import svgr from "file:///Users/mindgamesnl/workspaces/openaudiomc/OpenAudioMc/client/node_modules/vite-plugin-svgr/dist/index.js";
import eslint from "file:///Users/mindgamesnl/workspaces/openaudiomc/OpenAudioMc/client/node_modules/vite-plugin-eslint/dist/index.mjs";
Array.prototype.some = function(fun) {
  const len = this.length;
  for (let i = 0; i < len; i += 1) {
    if (fun(this[i], i, this)) {
      return true;
    }
  }
  return false;
};
var vite_config_default = defineConfig({
  plugins: [svgr({
    svgrOptions: {
      ref: true
    }
  }), {
    name: "singleHMR",
    handleHotUpdate({ modules }) {
      return modules;
    }
  }, react({
    include: "**/*.jsx"
  }), eslint()],
  server: {
    port: 3e3,
    host: true
  },
  build: {
    outDir: "./build"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWluZGdhbWVzbmwvd29ya3NwYWNlcy9vcGVuYXVkaW9tYy9PcGVuQXVkaW9NYy9jbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9taW5kZ2FtZXNubC93b3Jrc3BhY2VzL29wZW5hdWRpb21jL09wZW5BdWRpb01jL2NsaWVudC92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbWluZGdhbWVzbmwvd29ya3NwYWNlcy9vcGVuYXVkaW9tYy9PcGVuQXVkaW9NYy9jbGllbnQvdml0ZS5jb25maWcuanNcIjsvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXMgKi9cblxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHN2Z3IgZnJvbSAndml0ZS1wbHVnaW4tc3Zncic7XG5pbXBvcnQgZXNsaW50IGZyb20gJ3ZpdGUtcGx1Z2luLWVzbGludCc7XG5cbi8vIHNvbWUgcHJvdG90eXBlXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXh0ZW5kLW5hdGl2ZVxuQXJyYXkucHJvdG90eXBlLnNvbWUgPSBmdW5jdGlvbiAoZnVuKSB7XG4gIGNvbnN0IGxlbiA9IHRoaXMubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgaWYgKGZ1bih0aGlzW2ldLCBpLCB0aGlzKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtzdmdyKHtcbiAgICBzdmdyT3B0aW9uczoge1xuICAgICAgcmVmOiB0cnVlLFxuICAgIH0sXG4gIH0pLCB7XG4gICAgbmFtZTogJ3NpbmdsZUhNUicsXG4gICAgaGFuZGxlSG90VXBkYXRlKHsgbW9kdWxlcyB9KSB7XG4gICAgICByZXR1cm4gbW9kdWxlcztcbiAgICB9LFxuICB9LCByZWFjdCh7XG4gICAgaW5jbHVkZTogJyoqLyouanN4JyxcbiAgfSksIGVzbGludCgpXSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwMCwgaG9zdDogdHJ1ZSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6ICcuL2J1aWxkJyxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUVBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsT0FBTyxZQUFZO0FBSW5CLE1BQU0sVUFBVSxPQUFPLFNBQVUsS0FBSztBQUNwQyxRQUFNLE1BQU0sS0FBSztBQUNqQixXQUFTLElBQUksR0FBRyxJQUFJLEtBQUssS0FBSyxHQUFHO0FBQy9CLFFBQUksSUFBSSxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksR0FBRztBQUN6QixhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFDQSxTQUFPO0FBQ1Q7QUFFQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsS0FBSztBQUFBLElBQ2IsYUFBYTtBQUFBLE1BQ1gsS0FBSztBQUFBLElBQ1A7QUFBQSxFQUNGLENBQUMsR0FBRztBQUFBLElBQ0YsTUFBTTtBQUFBLElBQ04sZ0JBQWdCLEVBQUUsUUFBUSxHQUFHO0FBQzNCLGFBQU87QUFBQSxJQUNUO0FBQUEsRUFDRixHQUFHLE1BQU07QUFBQSxJQUNQLFNBQVM7QUFBQSxFQUNYLENBQUMsR0FBRyxPQUFPLENBQUM7QUFBQSxFQUNaLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUFNLE1BQU07QUFBQSxFQUNwQjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLEVBQ1Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
