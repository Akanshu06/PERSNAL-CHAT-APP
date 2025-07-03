import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const backendUrl =
    mode === "production"
      ? "https://persnal-chat-app.onrender.com"
      : "http://localhost:5000";

  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        "/api": {
          target: backendUrl,
          changeOrigin: true,
          secure: false,
        },
        "/socket.io/": {
          target: backendUrl,
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    },
  };
});
