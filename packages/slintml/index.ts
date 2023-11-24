import { effect, isRef } from '@vue/reactivity'
import { loadFile } from 'slint-ui'

interface Component {
  name: string
  setup: () => Record<string, any>
  template?: string
}

class App {
  private Rootwindow: any

  constructor(component: Component) {
    this.init(component)
  }

  private init(component: Component) {
    const { setup, name } = component
    const ui = loadFile(`./${name}.slint`)
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    const window = new ui[name]()
    const res = setup()

    for (const args in window) {
      if (!res[args])
        continue
      if (isRef(res[args]))
        effect(() => window[args] = res[args].value)
      else
        window[args] = res[args]
    }
    this.Rootwindow = window
  }

  public run() {
    this.Rootwindow.run()
  }

  static createApp(component: Component) {
    return new App(component)
  }
}

export const createApp = App.createApp
