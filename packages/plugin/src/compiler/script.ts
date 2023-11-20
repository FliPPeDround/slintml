import fs from 'fs-extra'

export function compilerScript(code: string | undefined) {
  const file = 'output/aa.js'

  if (code?.trim())
    fs.outputFileSync(file, code.trim())
}
