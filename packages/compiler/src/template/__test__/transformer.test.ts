import { describe, expect, it } from 'vitest'
import type { Node } from './../transformer'
import { transformer } from './../transformer'

describe('parser template', () => {
  it('can be OK', () => {
    const ast = [
      {
        tag: 'template',
        content: [
          '\n \t',
          {
            tag: 'Text',
            attrs: {
              color: 'red',
            },
            content: [
              '\n      bar{{foo}}\n  ',
            ],
          },
          '\n',
        ],
      },
    ] as Node[]
    expect(transformer(ast)).toMatchInlineSnapshot(`
      [
        {
          "attrs": {
            "color": "red",
            "text": "bar\\\\{foo}",
          },
          "tag": "Text",
        },
      ]
    `)
  })
  it ('more tags', () => {
    const ast = [
      {
        tag: 'template',
        content: [
          '\n  ',
          {
            tag: 'VerticalBox',
            content: [
              '\n    ',
              {
                tag: 'Text',
                content: [
                  '{{counter}}',
                ],
              },
              '\n    ',
              {
                tag: 'Button',
                attrs: {
                  '@click': 'add',
                },
                content: [
                  '\n      add\n    ',
                ],
              },
              '\n  ',
            ],
          },
          '\n',
        ],
      },
    ] as Node[]
    expect(transformer(ast)).toMatchInlineSnapshot(`
      [
        {
          "content": [
            {
              "attrs": {
                "text": "\\\\{counter}",
              },
              "tag": "Text",
            },
            {
              "attrs": {
                "@click": "add",
                "text": "add",
              },
              "tag": "Button",
            },
          ],
          "tag": "VerticalBox",
        },
      ]
    `)
  })
})
