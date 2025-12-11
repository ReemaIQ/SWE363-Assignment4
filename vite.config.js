import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
    base: "/SWE363-Assignment4/",
  plugins: [react()],
})
