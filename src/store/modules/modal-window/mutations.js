export const ModalWindowMutations = {
  hide: 'hide',
  show: 'show',
  setType: 'set-type'
}

export default {
  [ModalWindowMutations.show] (state) { state.visible = true },
  [ModalWindowMutations.hide] (state) { state.visible = false },
  [ModalWindowMutations.setType] (state, newType) { state.currentType = newType }
}
