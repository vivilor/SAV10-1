/* eslint-disable no-return-assign */
import Vue from 'vue'

const DEFAULT_START_STEP = 0

const stateFactory = (content, stepNames) => {
  if (!content.steps || !content.steps.data || !content.steps.data.length) return {}

  const startStep = content.steps.start || DEFAULT_START_STEP
  const eventBus = new Vue()

  return {
    eventBus,
    content: content,
    step: {
      components: stepNames || [],
      current: startStep,
      start: startStep,
      count: content.steps.data.length
    }
  }
}

const getters = {
  currentStepHeader: state => state.content.headers.step[state.step.current] || '',
  currentStep: state => state.step.current,
  currentStepButtonTypes: state => state.content.steps.data[state.step.current].buttons || [],
  isLastStep: state => state.step.current === state.step.count - 1,
  button: state => type => state.content.buttons[type] || '',
  currentStepComponentName: state => state.step.components[state.step.current] + 'Task' || ''
}

const mutations = {
  DECREASE_STEP: state => state.step.current--,
  CHANGE_STEP: (state, newStepIndex) => state.step.current = newStepIndex,
  INCREASE_STEP: state => state.step.current++
}

export default (content, stepNames) => ({
  state: stateFactory(content, stepNames),
  getters,
  mutations
})
