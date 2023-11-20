import { describe, expect, it } from 'vitest'
import { getSetupReturnType } from './index'

const code = `
import {createApp} from 'slintml'
export default createApp({
  name: 'app',
  setup() {
    const text = ref('w')
    const foo = 11
    function add() {
      text+'world'
      const setup = () => 1
      return {
        foo,
        setup
      }
    }
    const setup = () => 1

    return {
      text,
      foo,
      add
    }
  }
})
`

describe('get setup return type', () => {
  it('get setup', () => {
    expect(getSetupReturnType(code)).toMatchInlineSnapshot(`
      [
        {
          "key": "text",
          "valueType": "string",
        },
        {
          "key": "foo",
          "valueType": "number",
        },
        {
          "key": "add",
          "valueType": "function",
        },
      ]
    `)
  })
})
