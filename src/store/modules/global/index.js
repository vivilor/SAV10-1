import StateFactory from './state'
import * as mutations from './mutations'

export default (content) => {
  return {
    namespaced: true,
    state: StateFactory(content),
    mutations: () => mutations
  }
}
