import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    root: path.relative(__dirname, ""),
    build: {
        outDir: path.resolve(__dirname, "build")
    },
    server: {
        port: 3000
    }
});