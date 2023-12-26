import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assets: {
    assetsInclude: /\.(png|jpg|jpeg|gif|svg)$/i,
  },
});
