import { parse } from '@vue/compiler-sfc'
import { compilerTemplate } from './template'

import { getSetupReturnTypeAndName } from './returnType/index'

export function compiler(code: string, outDir: string) {
  const { descriptor } = parse(code)
  const scriptsCode = descriptor.script?.content.trim()
  if (!scriptsCode)
    return

  const info = getSetupReturnTypeAndName(scriptsCode)
  compilerTemplate(descriptor.template?.content, info, outDir)

  return scriptsCode
}
