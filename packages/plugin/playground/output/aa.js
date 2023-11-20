import {createApp} from 'slintml'
export default createApp({
  name: 'app',
  setup() {
    const text = 'hello'
    return {
      text
    }
  }
})