
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "localhost", // Begränsa till endast localhost
    port: 8080,
    hmr: {
      // Lägg till säkerhet för HMR-anslutningar
      protocol: 'ws',
      host: 'localhost',
    },
    // Lägg till CORS-huvuden för utveckling
    cors: {
      origin: ["http://localhost:8080"],
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      credentials: true,
    },
    // Lägg till striktare säkerhetsinställningar
    headers: {
      'Content-Security-Policy': "default-src 'self'; connect-src 'self' ws://localhost:*;",
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
