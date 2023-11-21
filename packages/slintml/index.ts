import { effect } from '@vue/reactivity'
import { loadFile } from 'slint-ui'

interface Component {
  name: string
  setup: () => Record<string, any>
}

function createApp(component: Component) {
  const { setup, name } = component
  const ui = loadFile(`./${name}.slint`)
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

// class App {
//   private window: any
//   constructor(component: Component) {
//     const { setup, name } = component
//     this.loadSlint(setup, name)
//   }

//   private loadSlint(setupFn: Component['setup'], name: Component['name']) {
//     const ui = loadFile(`ui/${name}.slint`)
//     // eslint-disable-next-line ts/ban-ts-comment
//     // @ts-expect-error
//     this.window = new ui[name]()
//     const res = setupFn()

//     for (const args in this.window) {
//       if (res[args])
//         effect(() => this.window[args] = res[args].value)
//       else
//         this.window[args] = res[args]
//     }
//   }

//   run() {
//     this.window.run()
//   }
// }
