import {createApp} from 'slintml'
export default createApp({
  name: 'app',
  setup() {
    const text = ref('w')
    const foo = 11
    const name = '11111'
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