import { defineConfig } from "vite"
import { ViteMinifyPlugin } from "vite-plugin-minify"
import preact from "@preact/preset-vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), ViteMinifyPlugin()],
  publicDir: "./public",
  build: {
    minify: "terser",
  },
})
