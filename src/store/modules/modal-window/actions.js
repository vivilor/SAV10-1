const setAndShowModal = (state, payload) => {
  if (typeof payload === 'string') {
    state.commit('SET_TYPE', payload)
    state.commit('SHOW')
  }
}

export {
  setAndShowModal
}
