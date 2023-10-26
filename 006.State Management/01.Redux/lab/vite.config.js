import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
    root: path.resolve(__dirname, ""),
    build: {
        outDir: path.resolve(__dirname, "build")
    },
    server: {
        port: 3000
    }
});