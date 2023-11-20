import { parse } from '@vue/compiler-dom'
import fs from 'fs-extra'
import type { Iresult } from './returnType/index'

interface Node {
  type: number
  children: Node[]
  tag: string
}

export function compilerTemplate(code: string | undefined, info: Iresult) {
  if (!code)
    return
  const ast = parse(code) as unknown as Node
  const importCode = generateImport((getUseComponentTag(ast)))
  const exportComponent = generateExportComponent(info.name, code)
  // const literalCode = generateLiteral(info.types)
  const outCode = importCode + exportComponent
  const file = 'output/aa.slint'
  fs.outputFileSync(file, outCode)
}

function getUseComponentTag(node: Node): Set<string> {
  const tags = new Set<string>()

  function traverseChildren(currentNode: Node): void {
    if (currentNode.tag && currentNode.tag !== 'Text')
      tags.add(currentNode.tag)

    if (currentNode.children)
      currentNode.children.forEach(child => traverseChildren(child))
  }

  traverseChildren(node)

  return tags
}

function generateImport(tags: Set<string>): string {
  const tagsString = Array.from(tags).join(',')
  return `import {${tagsString}} from "std-widgets.slint";\n`
}

function generateExportComponent(name: string, code: string): string {
  return `export component ${name} inherits Window {
  ${code}
}`
}

// function generateLiteral(types: Iresult['types']) {
//   const res = types.map((item) => {
//     return `in-out property<${item.valueType}> ${item.key}`
//   })
//   console.log(res)
// }
