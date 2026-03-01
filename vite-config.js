
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
	server: { port: 5000, open: true },
    preview: {port: 5080, open: true}
	
})


