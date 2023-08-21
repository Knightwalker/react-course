import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    root: path.relative(__dirname, ""),
    build: {
        outDir: path.resolve(__dirname, "build")
    },
    server: {
        port: 3000
    }
});