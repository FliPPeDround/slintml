import { describe, expect, it } from 'vitest'
import { parserTemplate } from './../parser'

describe('parser template', () => {
  it('can be OK', () => {
    const templateCode = `<template>
  <Text color="red">
      bar{{foo}}
  </Text>
</template>`
    expect(parserTemplate(templateCode)).toMatchInlineSnapshot(`
      [
        {
          "content": [
            "
        ",
            {
              "attrs": {
                "color": "red",
              },
              "content": [
                "
            bar{{foo}}
        ",
              ],
              "tag": "Text",
            },
            "
      ",
          ],
          "tag": "template",
        },
      ]
    `)
  })
})
