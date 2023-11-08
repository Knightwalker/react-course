import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import htmlInjectEnvPlugin from "./configs/vite/plugins/htmlInjectEnvPlugin.js";

export default defineConfig({
    plugins: [react(), htmlInjectEnvPlugin()],
    publicDir: "public",
    server: {
        port: 3000
    },
    css: {
        devSourcemap: true
    },
});