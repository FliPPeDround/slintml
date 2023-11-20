import { parse } from '@vue/compiler-sfc'
import { compilerTemplate } from './template'

import { getSetupReturnTypeAndName } from './returnType/index'

export function compiler(code: string, _id: string) {
  const { descriptor } = parse(code)
  if (!descriptor.script?.content)
    return
  // console.log(descriptor.script)
  // compilerScript(descriptor.script?.content)
  const info = getSetupReturnTypeAndName(descriptor.script?.content)

  compilerTemplate(descriptor.template?.content, info)

  return descriptor.script?.content.trim()
}
