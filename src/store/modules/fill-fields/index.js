import StateFactory from './state'
import * as getters from './getters'
import * as mutations from './mutations'

export default (stepsData, stepIndex) => {
  return {
    state: StateFactory(stepsData, stepIndex),
    getters,
    mutations
  }
}
