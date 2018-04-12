import Vuex from 'vuex'

import State from './state'
import * as getters from './getters'
import * as mutations from './mutations'

import * as StepModules from './step-modules'

import ModalWindow from './modules/modal-window'

const stepModulesFabric = (content, stepNames) => {
  if (
    !content.steps ||
    !content.steps.data ||
    typeof content.steps !== 'object' ||
    stepNames.length !== content.steps.data.length
  ) return

  let modules = {}

  content.steps.data.forEach((stepData, stepIndex) => {
    modules['step' + stepIndex] = StepModules[stepNames[stepIndex]](stepData)
  })

  return modules
}

export default (content, stepNames) => {
  return new Vuex.Store({
    state: State(content, stepNames),
    getters,
    mutations,
    modules: {
      modalWindow: ModalWindow(content.modalWindows),
      ...stepModulesFabric(content, stepNames)
    }
  })
}
