import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0", // Forces IPv4 to fix the loading hang
    port: 8080,
    allowedHosts: true, // Allow all hosts to prevent blocked request errors
  },
  plugins: [
    react(),
    // The tagger is removed to prevent errors
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
