import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Frontend runs on port 3000
    proxy: {
      "/api": {
        target: "https://persnal-chat-app.onrender.com", // ✅ Change to backend port
        changeOrigin: true,
        secure: false,
      },
      "/socket.io/": {
        target: "https://persnal-chat-app.onrender.com",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
