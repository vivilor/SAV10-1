/* eslint-disable no-return-assign */
const CHANGE_STEP = (state, newStep) => state.step.current = newStep

const GO_TO_START_STEP = state => state.step = state.step.start

const INCREASE_STEP = state => state.step.current++

export {
  CHANGE_STEP,
  GO_TO_START_STEP,
  INCREASE_STEP
}
