/* eslint-disable no-return-assign */
const INCREASE_STEP = state => state.step.current++
const DECREASE_STEP = state => state.step.current--
const CHANGE_STEP = (state, newStepIndex) => state.step.current = newStepIndex

export {
  INCREASE_STEP,
  DECREASE_STEP,
  CHANGE_STEP
}
