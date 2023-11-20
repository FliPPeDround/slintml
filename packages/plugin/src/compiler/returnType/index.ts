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

export interface Iresult {
  name: string
  types: { key: any, valueType: string }[]
}

export function getSetupReturnTypeAndName(code: string) {
  const ast = parse(code, {
    sourceType: 'unambiguous',
    plugins: ['typescript', 'jsx', 'classProperties'],
  })

  const result: Iresult = {
    name: '',
    types: [],
  }
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
              result.types = properties.map((prop: any) => {
                const key = prop.key.name
                const valueType = variableDeclarations[key] || 'unknown'
                return { key, valueType }
              })
            }
          },
        })
      }
    },
    ObjectProperty(path) {
      if (path.node.key.name === 'name')
        result.name = path.node.value.value
    },
  })
  return result
}
