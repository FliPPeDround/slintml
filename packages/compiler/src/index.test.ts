import { describe, expect, it } from 'vitest'
import { compiler } from './'

describe('parser template', () => {
  it('can be OK', () => {
    const templateCode = `<template>
  <Text color="red">
      bar{{foo}}
  </Text>
</template>`
    expect(compiler(templateCode)).toMatchInlineSnapshot(`
      "Text {color: red;text: \\"bar\\\\{foo}\\";}
      "
    `)
  })
})
