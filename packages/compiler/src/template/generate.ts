interface ASTNode {
  tag: string
  attrs?: { [key: string]: string }
  content?: ASTNode[]
}

const attrsMap = {
  clicked: (value: string) => {
    return `clicked => {${value}();}`
  },
  text: (value: string) => {
    return `text: "${value}";`
  },
}

function isAttrMapKey(key: string): key is keyof typeof attrsMap {
  return key in attrsMap
}

export function generate(ast: ASTNode[]): string {
  let code = ''

  ast.forEach((node) => {
    code += `${node.tag} {`
    if (node.attrs) {
      Object.entries(node.attrs).forEach(([key, value]) => {
        if (isAttrMapKey(key))
          code += attrsMap[key](value)

        else
          code += `${key}: ${value};`
      })
    }

    if (node.content)
      code += `\n${generate(node.content)}`

    code += '}\n'
  })

  return code
}
