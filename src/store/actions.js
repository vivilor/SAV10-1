const resetStep = state =>
  state.modules['step' + state.currentStep].dispatch('reset')

const validateStep = state =>
  state.modules['step' + state.currentStep].dispatch('validate')

export {
  resetStep,
  validateStep
}
