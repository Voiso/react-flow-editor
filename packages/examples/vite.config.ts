import * as path from "path"

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "src",
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve("../react-flow-editor/src")
    }
  },
  build: {
    outDir: "../../../docs"
  }
})
