interface ASTNode {
  tag: string
  attrs?: { [key: string]: any }
  content?: ASTNode[]
}

export function generate(ast: ASTNode[]): string {
  let code = ''

  ast.forEach((node) => {
    code += `${node.tag} {`

    if (node.attrs) {
      Object.entries(node.attrs).forEach(([key, value]) => {
        if (key === 'clicked')
          code += `\n    ${key} => {\n        ${value}();\n    }`

        else if (key === 'text')
          code += `\n    ${key}: "${value}";`

        else
          code += `\n    ${key}: ${value};`
      })
    }

    if (node.content)
      code += `\n${generate(node.content)}`

    code += '\n}\n'
  })

  return code
}
