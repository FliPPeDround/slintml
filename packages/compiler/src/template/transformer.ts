export interface Node {
  tag: string
  attrs?: Record<string, any>
  content: Node[] | string[]
}

export function transformer(ast: Node[]) {
  const TemplateNode = getTemplateNode(ast)
  return transformerTemplateNode(TemplateNode)
}

function getTemplateNode(ast: Node[]) {
  const TemplateNode = ast.find(node => node.tag === 'template' && node?.content?.length)?.content
  if (TemplateNode)
    return removeEmptyStringsFromContent(TemplateNode)
  else
    throw new Error('must has <template />')
}

function transformerTemplateNode(ast: Node[]): Node[] {
  return ast.map((node) => {
    const content = node.content
    const text = content[0]
    if (content.length !== 1 || typeof text !== 'string') {
      return {
        ...node,
        content: transformerTemplateNode(node.content as Node[]),
      } as Node
    }
    else {
      for (const attr in node.attrs!) {
        if (attr === '@click' || attr === 'onClick') {
          node.attrs.clicked = node.attrs[attr]
          delete node.attrs[attr]
        }
      }
      return {
        tag: node.tag,
        attrs: {
          ...node.attrs,
          text: convertBraces(text),
        },
      } as unknown as Node
    }
  })
}

function convertBraces(input: string): string {
  const reg = /{{(.*?)}}/g
  if (reg.test(input))
    return input.replaceAll(reg, '\\{$1}')
  else
    return input
}

function removeEmptyStringsFromContent(content: Node['content']): Node[] {
  const result: Node[] = []

  for (const item of content) {
    if (typeof item === 'string') {
      const trimmed = item.trim()
      if (trimmed !== '')
        result.push(trimmed as unknown as Node)
    }
    else {
      const cleanedContent = removeEmptyStringsFromContent(item.content || [])
      result.push({ ...item, content: cleanedContent })
    }
  }

  return result
}
