enum NodeTypes {
  ROOT = 0,
  ELEMENT = 1,
  TEXT = 2,
  COMMENT = 3,
  SIMPLE_EXPRESSION = 4,
  INTERPOLATION = 5,
  ATTRIBUTE = 6,
  DIRECTIVE = 7,
  COMPOUND_EXPRESSION = 8,
  IF = 9,
  IF_BRANCH = 10,
  FOR = 11,
  TEXT_CALL = 12,
  VNODE_CALL = 13,
  JS_CALL_EXPRESSION = 14,
  JS_OBJECT_EXPRESSION = 15,
  JS_PROPERTY = 16,
  JS_ARRAY_EXPRESSION = 17,
  JS_FUNCTION_EXPRESSION = 18,
  JS_CONDITIONAL_EXPRESSION = 19,
  JS_CACHE_EXPRESSION = 20,
  JS_BLOCK_STATEMENT = 21,
  JS_TEMPLATE_LITERAL = 22,
  JS_IF_STATEMENT = 23,
  JS_ASSIGNMENT_EXPRESSION = 24,
  JS_SEQUENCE_EXPRESSION = 25,
  JS_RETURN_STATEMENT = 26,
}

export function generateNode(ast: any) {
  switch (ast.type) {
    case NodeTypes.ROOT:
      return ast.children.map(generateNode)
    case NodeTypes.ELEMENT:
      if (ast.tag === 'template')
        return ast.children.map(generateNode)
      return `${ast.tag}{\n${ast.children.map(generateNode).join('')}\n}`
    case NodeTypes.TEXT:
      return `text: "${ast.content}";`
    case NodeTypes.SIMPLE_EXPRESSION:
      return `text: ${ast.content};`
    case NodeTypes.INTERPOLATION:
      return generateNode(ast.content)
  }
}

// function generateProps(props) {
//   props.map((prop) => {
//     switch(prop.type)

//   })
// }
