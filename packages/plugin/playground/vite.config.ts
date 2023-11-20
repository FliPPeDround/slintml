import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Unplugin from '../src/vite'

export const r = (...args: string[]) => resolve(__dirname, '..', ...args)
export default defineConfig({
  plugins: [
    Unplugin(),
  ],
  build: {
    watch: {},
    lib: {
      entry: r('/main.slintml'),
      name: 'MyLib',
      formats: ['es'],
      fileName: 'lib',
    },
    rollupOptions: {
      external: ['slintml'],
    },
  },
})
