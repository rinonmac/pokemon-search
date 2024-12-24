import { defineConfig, loadEnv } from "vite"
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'

// https://vite.dev/config/
export default ({mode}) =>{
  const ENV = loadEnv(mode, process.cwd())
  return defineConfig({
    server: {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
        'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept, Authorization',
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      },
    },
  })
}
