import { parse } from '@babel/parser'
import traverse from '@babel/traverse'

function getType(value: any): string {
  if (value.type === 'StringLiteral')
    return 'string'

  else if (value.type === 'NumericLiteral')
    return 'number'

  else if (value.type === 'BooleanLiteral')
    return 'boolean'

  else if (value.type === 'FunctionDeclaration' || value.type === 'FunctionExpression' || value.type === 'ArrowFunctionExpression')
    return 'function'

  else if (value.type === 'CallExpression')
    return getType(value.arguments[0])

  return 'unknown'
}

export function getSetupReturnType(code: string) {
  const ast = parse(code, {
    sourceType: 'unambiguous',
    plugins: ['typescript', 'jsx', 'classProperties'],
  })
  let result: { key: any, valueType: string }[] = []
  traverse(ast, {
    ObjectMethod(path) {
      if (path.node.key.name === 'setup') {
        const variableDeclarations: Record<string, string> = {}

        path.traverse({
          VariableDeclaration(variablePath) {
            const variableName = variablePath.node.declarations[0].id.name
            const variableType = getType(variablePath.node.declarations[0].init)
            variableDeclarations[variableName] = variableType
          },
          FunctionDeclaration(functionPath) {
            const functionName = functionPath.node.id!.name
            const functionType = getType(functionPath.node)
            variableDeclarations[functionName] = functionType
          },
        })

        path.traverse({
          ReturnStatement(returnPath) {
            if (returnPath.node.argument!.type === 'ObjectExpression') {
              const properties = returnPath.node.argument.properties
              result = properties.map((prop: any) => {
                const key = prop.key.name
                const valueType = variableDeclarations[key] || 'unknown'
                return { key, valueType }
              })
            }
          },
        })
      }
    },
  })
  return result
}
