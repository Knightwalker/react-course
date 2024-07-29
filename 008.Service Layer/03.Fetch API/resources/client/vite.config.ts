import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    console.log(`Vite configuration prepared for mode: ${mode}`);
    
    return {
        plugins: [react()],
        root: path.resolve(__dirname, ""),
        build: {
            outDir: path.resolve(__dirname, "build")
        },
        server: {
            port: 3000
        },
        css: {
            devSourcemap: true
        }
    }
});