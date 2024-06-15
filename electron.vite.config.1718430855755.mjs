// electron.vite.config.ts
import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
var __electron_vite_injected_dirname = "I:\\\u5F00\u53D1 ~ development dir\\githubLibrary\\KoiLauncher";
var electron_vite_config_default = defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src")
      }
    },
    css: {
      postcss: {
        plugins: [tailwindcss]
      }
    },
    plugins: [react()],
    build: {
      rollupOptions: {
        input: {
          index: resolve(__electron_vite_injected_dirname, "src/renderer/index.html"),
          about: resolve(__electron_vite_injected_dirname, "src/renderer/about.html"),
          license: resolve(__electron_vite_injected_dirname, "src/renderer/license.html")
        }
      }
    },
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
    }
  }
});
export {
  electron_vite_config_default as default
};
