import State from './state'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

export default (modalWindows) => {
  return {
    state: State(modalWindows),
    getters,
    actions,
    mutations,
    namespaced: true
  }
}
