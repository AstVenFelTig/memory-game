import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig(({ command, mode }) => {
  return {
    base: command === "build" ? "memory-game" : "/",
    root: ".",
    build: {
      outDir: "docs",
      sourcemap: true,
    },
    css: {
      devSourcemap: true,
    },
    plugins: [
      ViteImageOptimizer({ disable: process.env.NODE_ENV !== "production" }),
    ],
  };
});
