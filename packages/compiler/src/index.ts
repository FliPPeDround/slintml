import { generate, parserTemplate, transformer } from './template/index'

export function compiler(templateCode: string) {
  const ast = parserTemplate(templateCode)
  const targetAst = transformer(ast)
  const code = generate(targetAst)
  return code
}
