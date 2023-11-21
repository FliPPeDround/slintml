import type { Plugin } from 'vite'
import { compiler } from './compiler/index'

const fileRegex = /\.(slintml)$/

interface Options {

}

function VitePluginSlintml(_options: Options = {}): Plugin {
  let outDir = ''
  return {
    name: 'plugin-slintml',
    configResolved(resolvedConfig) {
      // 存储最终解析的配置
      outDir = resolvedConfig.build.outDir || 'dist'
    },
    transform(code, id) {
      if (fileRegex.test(id))
        return compiler(code, outDir)
    },
    config: config => ({

      build: {
        watch: {},
        target: 'node16',
        outDir: config.build?.outDir || 'dist',
        rollupOptions: {
          input: config.build?.rollupOptions?.input || 'src/main.js',
          external: ['slintml'],
          output: {
            manualChunks: undefined,
            // manualChunks: () => null,
            // inlineDynamicImports: true,
            entryFileNames: '[name].mjs',
          },
        },
      },
    }),
  }
}

export default /* #__PURE__ */ VitePluginSlintml
