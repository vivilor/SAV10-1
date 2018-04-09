const content = (state, getters, rootState) => rootState.modalWindows[state.currentType] || {}

const buttons = (state, getters, rootState) => {
  let buttons = []
  let currentWindowButtonTypes = getters.content.buttons
  if (currentWindowButtonTypes) {
    for (let buttonType of getters.content.buttons) {
      buttons.push(rootState.buttons[buttonType])
    }
  }
  return buttons
}

export {
  content,
  buttons
}
