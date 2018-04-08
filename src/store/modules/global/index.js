import StateFactory from './state'
import Getters from './getters'
import Mutations from './mutations'

export default (content) => {
  return {
    namespaced: true,
    state: StateFactory(content),
    getters: Getters,
    mutations: Mutations
  }
}
