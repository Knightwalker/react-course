import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
    console.log(`Vite configuration prepared for mode: ${mode}`);

    return {
        plugins: [react()],
        root: path.relative(__dirname, ""),
        build: {
            outDir: path.resolve(__dirname, "build")
        },
        server: {
            port: 3000
        },
        resolve: {
            alias: {
                $node_modules: path.resolve(__dirname, "node_modules"),
                $components: path.resolve(__dirname, "src/components")
            }
        },
        css: {
            devSourcemap: true
        }
    }
});