import { describe, expect, it } from 'vitest'
import { generate } from './../generate'

describe('parser template', () => {
  it('can be OK', () => {
    const templateCode = [
      {
        content: [
          {
            attrs: {
              text: '\\{counter}',
            },
            tag: 'Text',
          },
          {
            attrs: {
              clicked: 'add',
              text: 'add',
              width: '100px',
            },
            tag: 'Button',
          },
        ],
        tag: 'VerticalBox',
      },
    ]
    expect(generate(templateCode)).toMatchInlineSnapshot(`
      "VerticalBox {
      Text {
          text: \\"\\\\{counter}\\";
      }
      Button {
          clicked => {
              add();
          }
          text: \\"add\\";
          width: 100px;
      }

      }
      "
    `)
  })
})
