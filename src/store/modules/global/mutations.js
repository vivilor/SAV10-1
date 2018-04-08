export const GlobalMutations = {
  step: {
    change: 'step-change',
    toStart: 'step-to-ttart',
    increase: 'step-increase'
  }
}

export default {
  [GlobalMutations.step.change] (state, newStepIndex) { state.step.current = newStepIndex },
  [GlobalMutations.step.toStart] (state) { state.step.current = state.step.start },
  [GlobalMutations.step.increase] (state) { state.step.current++ }
}
