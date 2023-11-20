import fs from 'fs-extra'
import { parseModule } from 'magicast'

export function compilerScript(code: string | undefined) {
  const file = 'output/aa.js'

  if (code?.trim())
    fs.outputFileSync(file, code.trim())
}

export function getComponentName(code: string | undefined) {
  if (code?.trim()) {
    const mod = parseModule(code)
    const options = mod.exports.default.$type === 'function-call'
      ? mod.exports.default.$args[0]
      : mod.exports.default

    return options.name
  }
  else {
    throw new Error('name is must')
  }
}
