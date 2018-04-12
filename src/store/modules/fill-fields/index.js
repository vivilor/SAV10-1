import StateFactory from './state'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

export default (stepData) => {
  return {
    state: StateFactory(stepData),
    actions,
    getters,
    mutations,
    namespaced: true
  }
}
