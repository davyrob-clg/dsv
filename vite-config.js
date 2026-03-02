
import { defineConfig } from 'vite'
import { resolve } from 'path'



// https://vite.dev/config/
export default defineConfig({
  server: { port: 5000, open: true },
  preview: { port: 5080, open: true },

  
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'src/ask.html')
        
      },
    },
  },
});




