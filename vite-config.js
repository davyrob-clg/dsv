
import { defineConfig } from 'vite'
import { resolve } from 'path'



// https://vite.dev/config/
export default defineConfig({
  server: { port: 5000, open: true },
  preview: { port: 5080, open: true },

  build: {
    outDir: "./dist",
    rollupOptions: {
      input: {
         main: resolve(__dirname, 'index.html'),
        ask: resolve(__dirname, 'src/ask.html'),
        askDemod: resolve(__dirname, 'src/ask_demod.html'),
        // ...
        // List all files you want in your build
      }
    }
  }

})


