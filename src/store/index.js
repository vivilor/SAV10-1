import Vue from 'vue'
import Vuex from 'vuex'

import globalModuleFactory from './modules/global/index'
import modalWindowModule from './modules/modal-window'

Vue.use(Vuex)

export default (content) => {
  let objectFromKeys = (srcObj) => {
    let ret = {}

    // eslint-disable-next-line no-return-assign
    Object.keys(srcObj).forEach(key => ret[key] = key)
    return ret
  }

  let modalWindows = content.modalWindows || {}
  let modalWindowTypes = objectFromKeys(modalWindows)

  let steps = content.steps || {}

  let buttons = content.buttons || {}
  let buttonTypes = objectFromKeys(buttons)

  return new Vuex.Store({
    state: {
      steps: steps,
      buttons: buttons,
      buttonTypes: buttonTypes,
      modalWindows: modalWindows,
      modalWindowTypes: modalWindowTypes
    },
    modules: {
      global: globalModuleFactory(content),
      modalWindow: modalWindowModule
    }
  })
}
