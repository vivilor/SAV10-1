export const ModalWindowGetters = {
  content: 'content',
  buttons: 'buttons'
}

export default {
  [ModalWindowGetters.content]: (state, getters, rootState) => rootState.modalWindows[state.currentType] || {},
  [ModalWindowGetters.buttons]: (state, getters, rootState) => {
    let content = getters.content && getters.content.buttons
    if (content) {
      return Array.filter(
        Object.values(rootState.buttons),
        (button, i) => getters.content.buttons.includes(rootState.buttons[i]))
    } else { return [] }
  }
}
