import { describe, expect, it } from 'vitest'
import { generateNode } from './index'

describe('generateNode', () => {
  it('generate simple Text', () => {
    const ast = {
      type: 0,
      children: [
        {
          type: 1,
          ns: 0,
          tag: 'template',
          tagType: 0,
          props: [],
          isSelfClosing: false,
          children: [
            {
              type: 1,
              ns: 0,
              tag: 'Text',
              tagType: 1,
              props: [],
              isSelfClosing: false,
              children: [
                {
                  type: 2,
                  content: '11',
                },
              ],
            },
          ],
        },
      ],
      helpers: {},
      components: [],
      directives: [],
      hoists: [],
      imports: [],
      cached: 0,
      temps: 0,
    }
    expect(generateNode(ast).flat().join()).toMatchInlineSnapshot(`
      "Text{
      text: \\"11\\";
      }"
    `)
  })
  it('generate INTERPOLATION Text', () => {
    const ast = {
      type: 0,
      children: [
        {
          type: 1,
          ns: 0,
          tag: 'template',
          tagType: 0,
          props: [],
          isSelfClosing: false,
          children: [
            {
              type: 1,
              ns: 0,
              tag: 'Text',
              tagType: 1,
              props: [],
              isSelfClosing: false,
              children: [
                {
                  type: 5,
                  content: {
                    type: 4,
                    isStatic: false,
                    constType: 0,
                    content: 'foo',
                  },
                },
              ],
            },
          ],
        },
      ],
      helpers: {},
      components: [],
      directives: [],
      hoists: [],
      imports: [],
      cached: 0,
      temps: 0,
    }
    expect(generateNode(ast).flat().join()).toMatchInlineSnapshot(`
      "Text{
      text: foo;
      }"
    `)
  })
  it('generate INTERPOLATION and text Text', () => {
    const ast = {
      type: 0,
      children: [
        {
          type: 1,
          ns: 0,
          tag: 'template',
          tagType: 0,
          props: [],
          isSelfClosing: false,
          children: [
            {
              type: 1,
              ns: 0,
              tag: 'Text',
              tagType: 1,
              props: [],
              isSelfClosing: false,
              children: [
                {
                  type: 2,
                  content: 'bar',
                },
                {
                  type: 5,
                  content: {
                    type: 4,
                    isStatic: false,
                    constType: 0,
                    content: 'foo',
                  },
                },
              ],
            },
          ],
        },
      ],
      helpers: {},
      components: [],
      directives: [],
      hoists: [],
      imports: [],
      cached: 0,
      temps: 0,
    }
    expect(generateNode(ast).flat().join()).toMatchInlineSnapshot(`
      "Text{
      text: \\"bar\\";text: foo;
      }"
    `)
  })
})
