import Vuex from 'vuex'

import State from './state'
import * as getters from './getters'
import * as mutations from './mutations'

import ModalWindow from './modules/modal-window'

export default (content, stepNames) => {
  return new Vuex.Store({
    state: State(content, stepNames),
    getters,
    mutations,
    modules: {
      modalWindow: ModalWindow(content.modalWindows)
    }
  })
}
