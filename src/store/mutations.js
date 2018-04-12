/* eslint-disable no-return-assign */
const INCREASE_STEP = state => state.currentStep++
const DECREASE_STEP = state => state.currentStep--
const CHANGE_STEP = (state, newStepIndex) => state.currentStep = newStepIndex

export {
  INCREASE_STEP,
  DECREASE_STEP,
  CHANGE_STEP
}
