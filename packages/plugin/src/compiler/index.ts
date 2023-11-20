import { parse } from '@vue/compiler-sfc'
import { compilerScript, getComponentName } from './script'
import { compilerTemplate } from './template'

export function compiler(code: string, id: string) {
  const { descriptor } = parse(code)
  // console.log(descriptor.script)
  compilerScript(descriptor.script?.content)

  compilerTemplate(descriptor.template?.content, getComponentName(descriptor.script?.content))
}
