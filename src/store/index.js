import Vuex from 'vuex'

import RootModule from './root'
import ModalWindowModule from './modules/modal-window'
import FillFieldsModule from './modules/fill-fields'

export default (content, stepNames) => {
  return new Vuex.Store({
    ...RootModule(content, stepNames),
    modules: {
      modalWindow: ModalWindowModule(content.modalWindows),
      fillFields: FillFieldsModule
    }
  })
}
