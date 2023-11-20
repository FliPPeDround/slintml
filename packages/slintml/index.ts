import { effect } from '@vue/reactivity'
import { loadFile } from 'slint-ui'

interface Component {
  name: string
  setup: () => Record<string, any>
}

function createApp(component: Component) {
  const { setup, name } = component
  const ui = loadFile(`ui/${name}.slint`)
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  const window = new ui[name]()
  const res = setup()

  for (const args in window) {
    if (res[args])
      effect(() => window[args] = res[args].value)
    else
      window[args] = res[args]
  }
  window.run()
}

export { createApp }
