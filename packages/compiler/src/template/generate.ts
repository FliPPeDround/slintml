export function generate(ast: any) {
  return ast.map((node: any) => {
    if (node.tag) {
      return `${node.tag}{
    ${node.content ? generate(node.content).join() : ''}
  }`
    }
    if (node.attrs) {
      return node.attrs.map((attr: any) => {
        return attr
      })
    }
    else { return '' }
  })
}
