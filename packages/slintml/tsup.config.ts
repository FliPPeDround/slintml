import { defineConfig } from 'tsup'

export default defineConfig ((options) => {
  return {
    entry: ['index.ts'],
    format: options.watch ? 'esm' : ['cjs', 'esm', 'iife'],
    target: 'node14',
    tsconfig: './tsconfig.json',
    clean: true,
    external: [
      '@vue/reactivity',
      'slint-ui',
    ],
    minify: !options.watch,
  }
})
