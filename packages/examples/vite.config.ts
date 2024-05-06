import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import * as path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ jsxRuntime: "classic" })],
  root: "src",
  base: "./",
  resolve: {
    alias: {
      "@voiso/react-flow-editor": path.resolve("../react-flow-editor/src"),
      "@": path.resolve("../react-flow-editor/src")
    }
  },
  build: {
    outDir: "../dist"
  }
})
