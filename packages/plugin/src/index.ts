// import { parse } from '@vue/compiler-sfc'
// import fs from 'fs-extra'
import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import { compiler } from './compiler'
import type { Options } from './types'

export const unpluginFactory: UnpluginFactory<Options | undefined> = options => ({
  name: 'unplugin-starter',
  transformInclude(id) {
    return id.endsWith('.slintml')
  },
  transform(code, id) {
    // const { descriptor } = parse(code)
    // console.log(descriptor)
    // const file = 'output/aa.js'
    // fs.outputFileSync(file, descriptor?.script)
    compiler(code, id)
    return `export default 'aaa'`
  },
})

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
